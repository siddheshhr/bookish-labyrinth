
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  isbn: string;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, author, price, coverImage, isbn }) => {
  const navigate = useNavigate();
  
  const viewBookDetails = () => {
    navigate(`/book/${id}`);
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative pt-[75%] overflow-hidden">
        <img 
          src={coverImage} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold line-clamp-1">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-gray-600">by {author}</p>
        <p className="text-sm text-gray-500 mt-1">ISBN: {isbn}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2">
        <p className="font-bold text-bookshop-purple">${price.toFixed(2)}</p>
        <Button 
          onClick={viewBookDetails} 
          variant="outline"
          className="border-bookshop-purple text-bookshop-purple hover:bg-bookshop-purple hover:text-white"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
