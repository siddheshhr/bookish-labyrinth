
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, User, BookOpen, Menu } from 'lucide-react';
import { toast } from 'sonner';
import apiService from '@/services/api';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'title' | 'author' | 'isbn'>('title');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Get current user
  const currentUser = apiService.getCurrentUser();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      toast.error('Please enter a search term');
      return;
    }
    
    navigate(`/search?type=${searchType}&query=${encodeURIComponent(searchTerm)}`);
  };
  
  const handleLogout = async () => {
    try {
      await apiService.logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center w-full md:w-auto justify-between">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-bookshop-purple" />
              <span className="ml-2 text-xl font-bold text-bookshop-purple">BookShop</span>
            </Link>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          
          <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 w-full md:w-auto mt-4 md:mt-0`}>
            <form onSubmit={handleSearch} className="flex w-full md:w-auto md:mx-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-r-none border-r-0">
                    {searchType === 'title' ? 'Title' : searchType === 'author' ? 'Author' : 'ISBN'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSearchType('title')}>Title</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchType('author')}>Author</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSearchType('isbn')}>ISBN</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Input
                type="text"
                placeholder={`Search by ${searchType}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-l-none min-w-[200px]"
              />
              
              <Button type="submit" variant="ghost" size="icon" className="ml-2">
                <Search className="h-5 w-5" />
              </Button>
            </form>
            
            <div className="flex items-center space-x-2">
              {currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {currentUser.username}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => navigate('/login')}>
                    Login
                  </Button>
                  <Button 
                    className="bg-bookshop-purple hover:bg-bookshop-darkPurple" 
                    onClick={() => navigate('/register')}
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
