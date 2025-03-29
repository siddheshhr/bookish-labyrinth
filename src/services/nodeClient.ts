
// This file simulates a Node.js program with the required methods
// In a real application, this would be a separate Node.js file

import axios from 'axios';

// Base URL for API calls
const BASE_URL = 'http://localhost:5000/api'; // Example base URL

// Task 10: Get all books using async callback function
export async function getAllBooks() {
  try {
    // In a real app, this would call an actual API
    // const response = await axios.get(`${BASE_URL}/books`);
    // return response.data;
    
    // Using our mock data instead since this is just a simulation
    const mockResponse = await import('./api').then(module => {
      return module.default.getAllBooks();
    });
    
    console.log('Node.js: Successfully fetched all books');
    return mockResponse.data;
  } catch (error) {
    console.error('Node.js Error: Failed to fetch books:', error);
    throw error;
  }
}

// Task 11: Search by ISBN using Promises
export function getBookByISBN(isbn: string) {
  // In a real app:
  // return axios.get(`${BASE_URL}/books/isbn/${isbn}`)
  //  .then(response => response.data)
  //  .catch(error => {
  //    console.error(`Node.js Error: Failed to fetch book with ISBN ${isbn}:`, error);
  //    throw error;
  //  });
  
  // Using our mock data instead
  return import('./api').then(module => {
    return module.default.getBookByISBN(isbn)
      .then(response => {
        console.log(`Node.js: Successfully fetched book with ISBN ${isbn}`);
        return response.data;
      });
  }).catch(error => {
    console.error(`Node.js Error: Failed to fetch book with ISBN ${isbn}:`, error);
    throw error;
  });
}

// Task 12: Search by Author
export async function getBooksByAuthor(author: string) {
  try {
    // In a real app:
    // const response = await axios.get(`${BASE_URL}/books/author/${encodeURIComponent(author)}`);
    // return response.data;
    
    // Using our mock data instead
    const mockResponse = await import('./api').then(module => {
      return module.default.getBooksByAuthor(author);
    });
    
    console.log(`Node.js: Successfully fetched books by author ${author}`);
    return mockResponse.data;
  } catch (error) {
    console.error(`Node.js Error: Failed to fetch books by author ${author}:`, error);
    throw error;
  }
}

// Task 13: Search by Title
export async function getBooksByTitle(title: string) {
  try {
    // In a real app:
    // const response = await axios.get(`${BASE_URL}/books/title/${encodeURIComponent(title)}`);
    // return response.data;
    
    // Using our mock data instead
    const mockResponse = await import('./api').then(module => {
      return module.default.getBooksByTitle(title);
    });
    
    console.log(`Node.js: Successfully fetched books with title ${title}`);
    return mockResponse.data;
  } catch (error) {
    console.error(`Node.js Error: Failed to fetch books with title ${title}:`, error);
    throw error;
  }
}

// Example of how to use these functions
export function executeNodeExample() {
  console.log('Starting Node.js client example...');
  
  // Task 10: Get all books
  getAllBooks()
    .then(books => console.log('All books:', books))
    .catch(err => console.error('Error getting all books:', err));
  
  // Task 11: Get book by ISBN
  getBookByISBN('9781234567897')
    .then(book => console.log('Book by ISBN:', book))
    .catch(err => console.error('Error getting book by ISBN:', err));
  
  // Task 12: Get books by Author
  getBooksByAuthor('John Smith')
    .then(books => console.log('Books by author:', books))
    .catch(err => console.error('Error getting books by author:', err));
  
  // Task 13: Get books by Title
  getBooksByTitle('Code')
    .then(books => console.log('Books by title:', books))
    .catch(err => console.error('Error getting books by title:', err));
}
