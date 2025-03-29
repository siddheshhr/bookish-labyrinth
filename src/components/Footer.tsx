
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-bookshop-purple" />
              <span className="ml-2 text-lg font-bold text-bookshop-purple">BookShop</span>
            </div>
            <p className="text-gray-600 mb-4">
              Your one-stop destination for all your reading needs.
              Discover new worlds through our carefully curated collection.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-bookshop-purple">Home</Link></li>
              <li><Link to="/search?type=title&query=" className="text-gray-600 hover:text-bookshop-purple">All Books</Link></li>
              <li><Link to="/login" className="text-gray-600 hover:text-bookshop-purple">Login</Link></li>
              <li><Link to="/register" className="text-gray-600 hover:text-bookshop-purple">Register</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-bookshop-purple mr-2" />
                <span className="text-gray-600">123 Book Street, Reading City</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-bookshop-purple mr-2" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-bookshop-purple mr-2" />
                <span className="text-gray-600">info@bookshop.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} BookShop. All rights reserved.</p>
          <p className="mt-1">
            <Link to="/terms" className="hover:underline">Terms of Service</Link>
            {' · '}
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
