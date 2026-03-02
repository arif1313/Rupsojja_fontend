import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Search, User, ShoppingCart, MessageCircle, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";

const Navbar = () => { // Removed props
  const { setSearchTerm } = useSearch();
  const { totalItems, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Added local state

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/orders", label: "My Orders" },
  ];

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="text-xl lg:text-2xl font-bold text-pink-600"
          >
            Flexo Mart
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `transition-colors hover:text-pink-600 ${
                      isActive
                        ? "text-pink-600 font-bold border-b-2 border-pink-600"
                        : "text-gray-700"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">

            {/* 🔥 Animated Search */}
            <div className="flex items-center relative">

              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={`transition-all duration-500 ease-in-out 
                  bg-gray-100 rounded-full text-sm
                  focus:outline-none focus:ring-2 focus:ring-pink-500
                  ${
                    searchOpen
                      ? "w-52 px-4 py-1 opacity-100 mr-2"
                      : "w-0 px-0 py-1 opacity-0"
                  }
                `}
              />

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-gray-700 hover:text-pink-600 transition-colors"
              >
                <Search size={20} />
              </button>
            </div>

            <button className="text-gray-700 hover:text-pink-600">
              <MessageCircle size={20} />
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-700 hover:text-pink-600"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <Link
              to="/admin"
              className="text-gray-700 hover:text-pink-600"
            >
              <User size={20} />
            </Link>
          </div>

          {/* Mobile Section */}
          <div className="flex md:hidden items-center space-x-4">
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-700 hover:text-pink-600"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-pink-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-20 z-40"
              onClick={() => setIsMenuOpen(false)}
            ></div>

            <div className="fixed top-16 left-0 w-full bg-white z-50 shadow-md animate-slideDown">
              <ul className="flex flex-col space-y-4 p-4">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded hover:text-pink-600 ${
                          isActive
                            ? "text-pink-600 font-bold bg-pink-50"
                            : "text-gray-700"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;