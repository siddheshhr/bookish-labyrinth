
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from 'sonner';
import apiService from '@/services/api';

interface ReviewFormProps {
  bookId: number;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ bookId }) => {
  const [rating, setRating] = useState('5');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const currentUser = apiService.getCurrentUser();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error('Please log in to leave a review');
      return;
    }
    
    if (!comment.trim()) {
      toast.error('Please enter a comment for your review');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      await apiService.addOrUpdateReview(
        bookId,
        parseInt(rating),
        comment
      );
      
      toast.success('Review submitted successfully');
      setComment('');
      
      // Wait a moment then reload the page to see the new review
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser) {
    return (
      <Card className="my-6">
        <CardContent className="pt-6">
          <p className="text-center text-gray-600">
            Please <a href="/login" className="text-bookshop-purple hover:underline">log in</a> to leave a review.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="my-6">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          
          <div className="mb-4">
            <label htmlFor="rating" className="block text-sm font-medium mb-1">
              Rating
            </label>
            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">★★★★★ (5 stars)</SelectItem>
                <SelectItem value="4">★★★★☆ (4 stars)</SelectItem>
                <SelectItem value="3">★★★☆☆ (3 stars)</SelectItem>
                <SelectItem value="2">★★☆☆☆ (2 stars)</SelectItem>
                <SelectItem value="1">★☆☆☆☆ (1 star)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium mb-1">
              Comment
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review here..."
              rows={4}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full md:w-auto bg-bookshop-purple hover:bg-bookshop-darkPurple"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
