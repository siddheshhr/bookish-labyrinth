
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAllBooks, getBookByISBN, getBooksByAuthor, getBooksByTitle } from '@/services/nodeClient';

const NodeDemo: React.FC = () => {
  const [methodType, setMethodType] = useState('getAllBooks');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleExecute = async () => {
    setIsLoading(true);
    setResults('');
    
    try {
      let result;
      
      switch (methodType) {
        case 'getAllBooks':
          result = await getAllBooks();
          break;
        case 'getBookByISBN':
          if (!searchTerm.trim()) {
            toast.error('Please enter an ISBN');
            setIsLoading(false);
            return;
          }
          result = await getBookByISBN(searchTerm);
          break;
        case 'getBooksByAuthor':
          if (!searchTerm.trim()) {
            toast.error('Please enter an author name');
            setIsLoading(false);
            return;
          }
          result = await getBooksByAuthor(searchTerm);
          break;
        case 'getBooksByTitle':
          if (!searchTerm.trim()) {
            toast.error('Please enter a title');
            setIsLoading(false);
            return;
          }
          result = await getBooksByTitle(searchTerm);
          break;
        default:
          toast.error('Invalid method type');
          return;
      }
      
      setResults(JSON.stringify(result, null, 2));
      toast.success(`Successfully executed ${methodType}`);
    } catch (error) {
      console.error('Error executing Node.js method:', error);
      toast.error('Failed to execute method');
      setResults(JSON.stringify({ error: 'Failed to execute method' }, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const needsSearchTerm = methodType !== 'getAllBooks';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Node.js Demo</h1>
      <p className="mb-6 text-gray-600">
        This page demonstrates the Node.js methods used to interact with the books API.
        Select a method and click "Execute" to see the results.
      </p>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Execute Node.js Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Method Type</label>
              <Select
                value={methodType}
                onValueChange={(value) => {
                  setMethodType(value);
                  setSearchTerm('');
                  setResults('');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="getAllBooks">Task 10: Get All Books (Async/Await)</SelectItem>
                  <SelectItem value="getBookByISBN">Task 11: Get Book by ISBN (Promises)</SelectItem>
                  <SelectItem value="getBooksByAuthor">Task 12: Get Books by Author</SelectItem>
                  <SelectItem value="getBooksByTitle">Task 13: Get Books by Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {needsSearchTerm && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  {methodType === 'getBookByISBN' ? 'ISBN' : 
                   methodType === 'getBooksByAuthor' ? 'Author' : 'Title'}
                </label>
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={`Enter ${
                    methodType === 'getBookByISBN' ? 'ISBN' : 
                    methodType === 'getBooksByAuthor' ? 'author name' : 'book title'
                  }`}
                />
              </div>
            )}
            
            <Button 
              onClick={handleExecute}
              disabled={isLoading || (needsSearchTerm && !searchTerm.trim())}
              className="bg-bookshop-purple hover:bg-bookshop-darkPurple"
            >
              {isLoading ? 'Executing...' : 'Execute Method'}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-50 p-4 rounded-md overflow-auto max-h-96 text-sm">
              {results}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NodeDemo;
