
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import apiService from '@/services/api';

interface Review {
  id: number;
  bookId: number;
  userId: number;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewListProps {
  bookId: number;
}

const ReviewList: React.FC<ReviewListProps> = ({ bookId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const currentUser = apiService.getCurrentUser();
  
  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getBookReviews(bookId);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchReviews();
  }, [bookId]);
  
  const handleDeleteReview = async (reviewId: number) => {
    try {
      await apiService.deleteReview(reviewId);
      toast.success('Review deleted successfully');
      fetchReviews(); // Refresh reviews after deletion
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    }
  };
  
  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (isLoading) {
    return <p>Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return (
      <Card className="mb-6">
        <CardContent className="py-6">
          <p className="text-center text-gray-600">No reviews yet. Be the first to review!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      {reviews.map((review) => (
        <Card key={review.id} className="hover:shadow-md transition-shadow">
          <CardContent className="py-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center mb-1">
                  <span className="font-semibold">{review.username}</span>
                  <span className="text-xs text-gray-500 ml-2">({review.date})</span>
                </div>
                <div className="text-yellow-500 mb-2">{renderStars(review.rating)}</div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
              
              {currentUser && currentUser.id === review.userId && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReviewList;
