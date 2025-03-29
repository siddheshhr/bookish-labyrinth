
import React from 'react';
import { useParams } from 'react-router-dom';
import BookDetail from '@/components/BookDetail';

const BookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1>Book not found</h1>
      </div>
    );
  }

  return (
    <BookDetail />
  );
};

export default BookPage;
