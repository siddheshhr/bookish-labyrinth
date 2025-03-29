
import axios from 'axios';
import { toast } from 'sonner';

// Mock backend data since we don't have an actual API
const mockBooks = [
  {
    id: 1,
    isbn: '9781234567897',
    title: 'The Great Novel',
    author: 'Jane Doe',
    year: 2020,
    price: 14.99,
    coverImage: 'https://picsum.photos/seed/book1/300/400',
    description: 'A fascinating journey through imagination and reality.'
  },
  {
    id: 2,
    isbn: '9789876543210',
    title: 'Code Warriors',
    author: 'John Smith',
    year: 2019,
    price: 12.99,
    coverImage: 'https://picsum.photos/seed/book2/300/400',
    description: 'The epic tale of programmers fighting against bugs and deadlines.'
  },
  {
    id: 3,
    isbn: '9780123456789',
    title: 'Digital Dreams',
    author: 'Sarah Johnson',
    year: 2021,
    price: 18.99,
    coverImage: 'https://picsum.photos/seed/book3/300/400',
    description: 'How technology is shaping our future and our minds.'
  },
  {
    id: 4,
    isbn: '9785432109876',
    title: 'The Last Algorithm',
    author: 'John Smith',
    year: 2022,
    price: 19.99,
    coverImage: 'https://picsum.photos/seed/book4/300/400',
    description: 'When AI evolves beyond human understanding.'
  },
  {
    id: 5,
    isbn: '9787890123456',
    title: 'Lost in Recursion',
    author: 'Alan Turing',
    year: 2018,
    price: 15.99,
    coverImage: 'https://picsum.photos/seed/book5/300/400',
    description: 'A programmer\'s nightmare turned into an adventure.'
  }
];

let mockReviews: Array<{
  id: number;
  bookId: number;
  userId: number;
  username: string;
  rating: number;
  comment: string;
  date: string;
}> = [
  {
    id: 1,
    bookId: 1,
    userId: 1,
    username: 'user1',
    rating: 4,
    comment: 'Great book, highly recommend!',
    date: '2023-01-15'
  },
  {
    id: 2,
    bookId: 2,
    userId: 2,
    username: 'user2',
    rating: 5,
    comment: 'One of the best coding books I\'ve read',
    date: '2023-02-20'
  }
];

let mockUsers: Array<{
  id: number;
  username: string;
  email: string;
  password: string;
}> = [
  {
    id: 1,
    username: 'user1',
    email: 'user1@example.com',
    password: 'password123'
  },
  {
    id: 2,
    username: 'user2',
    email: 'user2@example.com',
    password: 'password456'
  }
];

// Current logged in user
let currentUser: { id: number; username: string } | null = null;

// API service
class ApiService {
  // Task 1: Get the book list available in the shop
  async getAllBooks() {
    try {
      // In a real app, this would be an axios call to the backend
      // return await axios.get('/api/books');
      return Promise.resolve({ data: mockBooks });
    } catch (error) {
      console.error('Failed to fetch books:', error);
      toast.error('Failed to fetch books');
      throw error;
    }
  }

  // Task 2: Get the books based on ISBN
  async getBookByISBN(isbn: string) {
    try {
      // In a real app: return await axios.get(`/api/books/isbn/${isbn}`);
      const book = mockBooks.find(b => b.isbn === isbn);
      if (book) {
        return Promise.resolve({ data: book });
      }
      return Promise.reject({ message: 'Book not found' });
    } catch (error) {
      console.error(`Failed to fetch book with ISBN ${isbn}:`, error);
      toast.error('Book not found');
      throw error;
    }
  }

  // Task 3: Get all books by Author
  async getBooksByAuthor(author: string) {
    try {
      // In a real app: return await axios.get(`/api/books/author/${author}`);
      const books = mockBooks.filter(b => 
        b.author.toLowerCase().includes(author.toLowerCase())
      );
      return Promise.resolve({ data: books });
    } catch (error) {
      console.error(`Failed to fetch books by author ${author}:`, error);
      toast.error('Failed to fetch books by author');
      throw error;
    }
  }

  // Task 4: Get all books based on Title
  async getBooksByTitle(title: string) {
    try {
      // In a real app: return await axios.get(`/api/books/title/${title}`);
      const books = mockBooks.filter(b => 
        b.title.toLowerCase().includes(title.toLowerCase())
      );
      return Promise.resolve({ data: books });
    } catch (error) {
      console.error(`Failed to fetch books with title ${title}:`, error);
      toast.error('Failed to fetch books by title');
      throw error;
    }
  }

  // Task 5: Get book reviews
  async getBookReviews(bookId: number) {
    try {
      // In a real app: return await axios.get(`/api/books/${bookId}/reviews`);
      const reviews = mockReviews.filter(r => r.bookId === bookId);
      return Promise.resolve({ data: reviews });
    } catch (error) {
      console.error(`Failed to fetch reviews for book ${bookId}:`, error);
      toast.error('Failed to fetch book reviews');
      throw error;
    }
  }

  // Task 6: Register new user
  async registerUser(username: string, email: string, password: string) {
    try {
      // In a real app: return await axios.post('/api/users/register', { username, email, password });
      
      // Check if user already exists
      const existingUser = mockUsers.find(
        u => u.username === username || u.email === email
      );
      
      if (existingUser) {
        return Promise.reject({ message: 'User already exists' });
      }
      
      const newUser = {
        id: mockUsers.length + 1,
        username,
        email,
        password,
      };
      
      mockUsers.push(newUser);
      return Promise.resolve({ 
        data: { 
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        } 
      });
    } catch (error) {
      console.error('Failed to register user:', error);
      toast.error('Failed to register user');
      throw error;
    }
  }

  // Task 7: Login as registered user
  async loginUser(email: string, password: string) {
    try {
      // In a real app: return await axios.post('/api/users/login', { email, password });
      
      const user = mockUsers.find(
        u => u.email === email && u.password === password
      );
      
      if (!user) {
        return Promise.reject({ message: 'Invalid credentials' });
      }
      
      // Set current user
      currentUser = {
        id: user.id,
        username: user.username
      };
      
      return Promise.resolve({ 
        data: { 
          id: user.id,
          username: user.username,
          email: user.email
        } 
      });
    } catch (error) {
      console.error('Failed to login:', error);
      toast.error('Failed to login');
      throw error;
    }
  }

  // Get current logged in user
  getCurrentUser() {
    return currentUser;
  }

  // Logout user
  logout() {
    currentUser = null;
    return Promise.resolve();
  }

  // Task 8: Add/Modify a book review
  async addOrUpdateReview(bookId: number, rating: number, comment: string) {
    try {
      // Check if user is logged in
      if (!currentUser) {
        toast.error('You must be logged in to review books');
        return Promise.reject({ message: 'Not authenticated' });
      }
      
      // In a real app: return await axios.post(`/api/books/${bookId}/reviews`, { rating, comment });
      
      // Check if review already exists
      const existingReviewIndex = mockReviews.findIndex(
        r => r.bookId === bookId && r.userId === currentUser!.id
      );
      
      if (existingReviewIndex >= 0) {
        // Update existing review
        mockReviews[existingReviewIndex] = {
          ...mockReviews[existingReviewIndex],
          rating,
          comment,
          date: new Date().toISOString().split('T')[0]
        };
        
        return Promise.resolve({ 
          data: mockReviews[existingReviewIndex]
        });
      } else {
        // Add new review
        const newReview = {
          id: mockReviews.length + 1,
          bookId,
          userId: currentUser.id,
          username: currentUser.username,
          rating,
          comment,
          date: new Date().toISOString().split('T')[0]
        };
        
        mockReviews.push(newReview);
        return Promise.resolve({ data: newReview });
      }
    } catch (error) {
      console.error('Failed to add/update review:', error);
      toast.error('Failed to save review');
      throw error;
    }
  }

  // Task 9: Delete book review added by the user
  async deleteReview(reviewId: number) {
    try {
      // Check if user is logged in
      if (!currentUser) {
        toast.error('You must be logged in to delete reviews');
        return Promise.reject({ message: 'Not authenticated' });
      }
      
      // In a real app: return await axios.delete(`/api/reviews/${reviewId}`);
      
      // Find the review
      const reviewIndex = mockReviews.findIndex(r => r.id === reviewId);
      
      if (reviewIndex < 0) {
        return Promise.reject({ message: 'Review not found' });
      }
      
      // Check if the review belongs to the current user
      if (mockReviews[reviewIndex].userId !== currentUser.id) {
        toast.error('You can only delete your own reviews');
        return Promise.reject({ message: 'Unauthorized' });
      }
      
      // Remove the review
      const deletedReview = mockReviews[reviewIndex];
      mockReviews = mockReviews.filter(r => r.id !== reviewId);
      
      return Promise.resolve({ data: deletedReview });
    } catch (error) {
      console.error('Failed to delete review:', error);
      toast.error('Failed to delete review');
      throw error;
    }
  }
}

// Create a singleton instance
const apiService = new ApiService();
export default apiService;
