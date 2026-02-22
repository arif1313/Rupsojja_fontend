import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Search, User, ShoppingCart, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className=" container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="sm:text-xl md:text-xl lg:text-2xl font-bold text-pink-600">
            Flexo Mart
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `cursor-pointer transition-colors hover:text-pink-600 ${
                      isActive ? 'text-pink-600 font-bold border-b-2 border-pink-600' : 'text-gray-700'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-700 hover:text-pink-600">
              <Search size={20} />
            </button>
            <button className="text-gray-700 hover:text-pink-600">
              <MessageCircle size={20} />
            </button>
            <Link to="/cart" className="relative">
              <ShoppingCart size={20} className="text-gray-700 hover:text-pink-600" />
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-pink-600">
              <User size={20} />
            </Link>
          </div>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center space-x-4">
            <button className="text-gray-700 hover:text-pink-600">
              <Search size={20} />
            </button>
            <button className="text-gray-700 hover:text-pink-600">
              <MessageCircle size={20} />
            </button>
            <Link to="/cart" className="relative">
              <ShoppingCart size={20} className="text-gray-700 hover:text-pink-600" />
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-pink-600">
              <User size={20} />
            </Link>
            {/* Hamburger Menu */}
            <button
              className="text-gray-700 hover:text-pink-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-20 z-40"
              onClick={() => setIsMenuOpen(false)}
            ></div>

            <div className="fixed top-16 left-0 w-full bg-white z-50 shadow-md animate-slideDown">
              <ul className="flex flex-col space-y-4 p-4">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded transition-colors hover:text-pink-600 ${
                          isActive ? 'text-pink-600 font-bold bg-pink-50' : 'text-gray-700'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <NavLink
                    to="/cart"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded transition-colors hover:text-pink-600 ${
                        isActive ? 'text-pink-600 font-bold bg-pink-50' : 'text-gray-700'
                      }`
                    }
                  >
                    Cart
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Animation for Mobile Menu */}
      <style>
        {`
          @keyframes slideDown {
            0% { transform: translateY(-20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-slideDown {
            animation: slideDown 0.2s ease-out forwards;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
