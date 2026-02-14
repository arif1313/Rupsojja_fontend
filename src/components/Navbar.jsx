import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Search, User, ShoppingCart, MessageCircle } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        // { name: 'Categories', path: '/products?category=women' },
        // { name: 'Jewelry', path: '/products?category=jewelry' },
        // { name: 'Sale', path: '/products?category=sale' },
    ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo - Left side */}
                    <Link to="/" className="text-2xl font-bold text-pink-600">
                        Flexo Mart
                    </Link>

                    {/* Desktop Navigation - Center */}
                    <ul className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
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

                    {/* Desktop Icons - Right side */}
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
                        <Link to="/account" className="text-gray-700 hover:text-pink-600">
                            <User size={20} />
                        </Link>
                    </div>

                    {/* Mobile Icons - All icons visible on mobile */}
                    <div className="flex md:hidden items-center space-x-4">
                        {/* Search Icon */}
                        <button className="text-gray-700 hover:text-pink-600">
                            <Search size={20} />
                        </button>
                        
                        {/* Message Icon */}
                        <button className="text-gray-700 hover:text-pink-600">
                            <MessageCircle size={20} />
                        </button>
                        
                        {/* Cart Icon with badge */}
                        <Link to="/cart" className="relative">
                            <ShoppingCart size={20} className="text-gray-700 hover:text-pink-600" />
                            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                3
                            </span>
                        </Link>
                        
                        {/* Login/User Icon */}
                        <Link to="/account" className="text-gray-700 hover:text-pink-600">
                            <User size={20} />
                        </Link>
                        
                        {/* Menu Icon - for navigation links */}
                        <button 
                            className="text-gray-700 hover:text-pink-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu - Navigation Links */}
                {isMenuOpen && (
                    <div className="md:hidden border-t py-4">
                        <ul className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <NavLink 
                                        to={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={({ isActive }) => 
                                            `block px-4 py-2 transition-colors hover:text-pink-600 ${
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
                                        `block px-4 py-2 transition-colors hover:text-pink-600 ${
                                            isActive ? 'text-pink-600 font-bold bg-pink-50' : 'text-gray-700'
                                        }`
                                    }
                                >
                                    Cart
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;