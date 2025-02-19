// src/components/common/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">Museum Manager</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/artworks" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                Artworks
              </Link>
              <Link to="/staff" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                Staff
              </Link>
              <Link to="/shifts" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                Shifts
              </Link>
            </div>
          </div>
          <div className="sm:hidden">
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/artworks" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700">
              Artworks
            </Link>
            <Link to="/staff" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700">
              Staff
            </Link>
            <Link to="/shifts" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700">
              Shifts
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}