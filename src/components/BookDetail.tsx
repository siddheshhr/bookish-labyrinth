
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import apiService from '@/services/api';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

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

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        if (!id) return;
        
        // Get all books and find the one with matching id
        const response = await apiService.getAllBooks();
        const foundBook = response.data.find((b: Book) => b.id === parseInt(id));
        
        if (foundBook) {
          setBook(foundBook);
        } else {
          toast.error('Book not found');
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
        toast.error('Failed to load book details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBook();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="container my-8">
        <div className="flex justify-center items-center h-64">
          <p>Loading book details...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container my-8">
        <div className="flex justify-center items-center h-64">
          <p>Book not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-4">
              <img 
                src={book.coverImage} 
                alt={book.title} 
                className="w-full rounded-md shadow-md"
              />
              <div className="mt-4 text-center">
                <p className="font-bold text-2xl text-bookshop-purple">${book.price.toFixed(2)}</p>
                <Button className="mt-2 w-full bg-bookshop-purple hover:bg-bookshop-darkPurple">
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-2">by {book.author}</p>
          <p className="text-sm text-gray-500 mb-4">ISBN: {book.isbn} • Published: {book.year}</p>
          
          <Separator className="my-4" />
          
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 mb-6">{book.description}</p>
          
          <Separator className="my-6" />
          
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          <ReviewList bookId={book.id} />
          
          <ReviewForm bookId={book.id} />
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
