
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookCard from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import apiService from '@/services/api';
import { BookOpen } from 'lucide-react';

interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  year: number;
  price: number;
  coverImage: string;
  description: string;
}

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchType = searchParams.get('type') || 'title';
  const query = searchParams.get('query') || '';
  
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        
        // Handle different search types
        let response;
        if (searchType === 'isbn' && query) {
          const book = await apiService.getBookByISBN(query);
          response = { data: book.data ? [book.data] : [] };
        } else if (searchType === 'author') {
          response = await apiService.getBooksByAuthor(query);
        } else if (searchType === 'title') {
          response = await apiService.getBooksByTitle(query);
        } else {
          // Default: fetch all books
          response = await apiService.getAllBooks();
        }
        
        setBooks(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching books:', error);
        toast.error('Failed to load books');
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBooks();
  }, [searchType, query]);

  const getSearchDescription = () => {
    if (!query) return 'All Books';
    if (searchType === 'isbn') return `Books with ISBN: ${query}`;
    if (searchType === 'author') return `Books by Author: ${query}`;
    return `Books with Title: ${query}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{getSearchDescription()}</h1>
      <p className="text-gray-600 mb-6">
        {isLoading ? 'Searching...' : `Found ${books.length} book${books.length !== 1 ? 's' : ''}`}
      </p>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading books...</p>
        </div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              price={book.price}
              coverImage={book.coverImage}
              isbn={book.isbn}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No books found</h2>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or browse all our books.
          </p>
          <Button 
            className="bg-bookshop-purple hover:bg-bookshop-darkPurple"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
