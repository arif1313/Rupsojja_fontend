import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { 
  Search, 
  User, 
  ShoppingCart, 
  Menu, 
  X, 
  Heart, 
  Package, 
  Home,
  ChevronRight
} from "lucide-react";


import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";


const Navbar = () => {
    const { totalItems, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const { cart } = useCart();
  const { setSearchTerm } = useSearch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); 
  }, []);

  // Focus search input when expanded
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  // Handle click outside to collapse search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target )) {
        setIsSearchExpanded(false);
        setSearchQuery("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate cart item count
  const cartItemCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchTerm(searchQuery);
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchExpanded(false);
      setSearchQuery("");
    }
  };

  const handleSearchIconClick = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/products", label: "Products", icon: Package },
    { to: "/orders", label: "My Orders", icon: Package },
    { to: "/favourites", label: "Favourites", icon: Heart },
  ];

  return (
    <>
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white shadow-md'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo with animation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/"
                className="relative group"
              >
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Flexo Mart
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `relative px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 group ${
                          isActive
                            ? "text-pink-600 bg-pink-50"
                            : "text-gray-700 hover:text-pink-600 hover:bg-pink-50/50"
                        }`
                      }
                    >
                      <Icon size={18} className="transition-transform group-hover:scale-110" />
                      <span className="font-medium">{link.label}</span>
                    </NavLink>
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop Right Icons */}
            <div className="hidden md:flex items-center space-x-2">
              {/* Search Bar - Icon that expands */}
              <div ref={searchContainerRef} className="relative">
                <AnimatePresence mode="wait">
                  {isSearchExpanded ? (
                    <motion.div
                      key="expanded-search"
                      initial={{ width: 40, opacity: 0 }}
                      animate={{ width: 300, opacity: 1 }}
                      exit={{ width: 40, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      <form onSubmit={handleSearch}>
                        <input
                          ref={searchInputRef}
                          type="text"
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={handleSearchChange}
                          className="w-full pl-10 pr-12 py-2.5 bg-gray-100 rounded-xl text-sm
                            focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white
                            border border-transparent focus:border-pink-200
                            transition-all duration-300"
                        />
                        <Search 
                          size={18} 
                          className="absolute left-3 top-3 text-gray-400" 
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="absolute right-10 top-2.5 text-gray-400 hover:text-gray-600"
                          >
                            <X size={16} />
                          </button>
                        )}
                        <button
                          type="submit"
                          className="absolute right-3 top-2.5 text-pink-600 hover:text-pink-700"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="collapsed-search"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSearchIconClick}
                      className="p-2.5 text-gray-700 hover:text-pink-600 rounded-xl hover:bg-pink-50 transition-all duration-300"
                      aria-label="Search"
                    >
                      <Search size={20} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart Button with Animation */}
              <motion.button
     whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => setIsCartOpen(true)}
  className="relative p-2.5 text-gray-700 hover:text-pink-600 rounded-xl hover:bg-pink-50 transition-all duration-300 group"
  aria-label="Shopping cart"
  >
    <ShoppingCart size={20} className="transition-transform group-hover:rotate-12" />
    {totalItems > 0 && (
      <motion.span
        initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center shadow-lg"
      >
        {totalItems}
      </motion.span>
    )}
  </motion.button>

              {/* Admin Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  aria-label="Admin panel"
                >
                  <User size={18} />
                  <span className="text-sm font-medium">Admin</span>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Header */}
            <div className="flex md:hidden items-center space-x-2">
              {/* Mobile Search Icon */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="p-2 text-gray-700 hover:text-pink-600"
                aria-label="Search"
              >
                <Search size={22} />
              </motion.button>

              {/* Mobile Cart */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-pink-600"
                aria-label="Cart"
              >
                <ShoppingCart size={22} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                    {cartItemCount}
                  </span>
                )}
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700 hover:text-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Search Bar - Shows when search icon is clicked */}
          <AnimatePresence>
            {isSearchExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-3 border-t border-gray-100">
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full px-4 py-3 pl-12 pr-10 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                      autoFocus
                    />
                    <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-12 top-3.5 text-gray-400 hover:text-gray-600"
                      >
                        <X size={18} />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="absolute right-3 top-3 text-pink-600 hover:text-pink-700"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                onClick={() => setIsMenuOpen(false)}
              />

              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl overflow-y-auto"
              >
                <div className="p-6">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      Menu
                    </h2>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="space-y-2">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <NavLink
                          key={link.to}
                          to={link.to}
                          onClick={() => setIsMenuOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                              isActive
                                ? 'bg-gradient-to-r from-pink-50 to-purple-50 text-pink-600 border-l-4 border-pink-600'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`
                          }
                        >
                          <Icon size={20} />
                          <span className="font-medium">{link.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>

                  {/* Mobile Admin Button */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <User size={20} />
                        <span className="font-medium">Admin Panel</span>
                      </div>
                      <ChevronRight size={20} />
                    </Link>
                  </div>

                  {/* Mobile Footer */}
                  <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Flexo Mart © 2024</p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Add smooth scroll behavior */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
};

export default Navbar;