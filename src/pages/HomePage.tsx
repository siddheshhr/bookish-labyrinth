
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '@/components/BookCard';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import apiService from '@/services/api';
import { BookOpen, Search, User, ShoppingCart } from 'lucide-react';

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

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.getAllBooks();
        
        // Simulate featured books (in a real app, these would come from the API)
        setFeaturedBooks(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching books:', error);
        toast.error('Failed to load books');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBooks();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-bookshop-purple to-bookshop-darkPurple text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Next Favorite Book</h1>
              <p className="text-lg mb-6 opacity-90">
                Browse our collection of books across various genres and authors.
                Find perfect reads for every mood and interest.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-white text-bookshop-purple hover:bg-gray-100"
                  onClick={() => navigate('/search?type=title&query=')}
                >
                  <Search className="mr-2 h-4 w-4" /> Browse All Books
                </Button>
                
                {!apiService.getCurrentUser() && (
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-bookshop-purple"
                    onClick={() => navigate('/register')}
                  >
                    <User className="mr-2 h-4 w-4" /> Create Account
                  </Button>
                )}
              </div>
            </div>
            
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-64 h-80 bg-bookshop-blue opacity-20 rounded-lg transform rotate-6"></div>
                <div className="absolute -top-2 -left-2 w-64 h-80 bg-bookshop-blue opacity-20 rounded-lg transform rotate-3"></div>
                <div className="relative w-64 h-80 bg-white rounded-lg shadow-xl overflow-hidden">
                  <img 
                    src="https://picsum.photos/seed/bookcover/300/450" 
                    alt="Featured Book" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Books */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Books</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading books...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredBooks.map((book) => (
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
              
              <div className="flex justify-center mt-8">
                <Button 
                  className="bg-bookshop-purple hover:bg-bookshop-darkPurple"
                  onClick={() => navigate('/search?type=title&query=')}
                >
                  View All Books
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose BookShop</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 hover:shadow-md rounded-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <BookOpen className="h-12 w-12 text-bookshop-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Vast Collection</h3>
              <p className="text-gray-600">
                Thousands of books across all genres, from bestsellers to rare finds.
              </p>
            </div>
            
            <div className="text-center p-6 hover:shadow-md rounded-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <User className="h-12 w-12 text-bookshop-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Reviews</h3>
              <p className="text-gray-600">
                Read and write reviews to help others discover great books.
              </p>
            </div>
            
            <div className="text-center p-6 hover:shadow-md rounded-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <ShoppingCart className="h-12 w-12 text-bookshop-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Shopping</h3>
              <p className="text-gray-600">
                Simple, secure checkout process with fast delivery options.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
