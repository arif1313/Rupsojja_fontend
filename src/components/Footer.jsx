import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Shop: ['All Products', 'Women', 'Jewelry', 'New Arrivals', 'Sale'],
    Help: ['Contact Us', 'Shipping', 'Returns', 'Size Guide', 'FAQs'],
    Company: ['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'],
  };

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold text-pink-400 mb-4">GlamourShop</h3>
            <p className="text-gray-300 mb-4">
              Premium women's fashion and jewelry for the modern woman.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-pink-400"><Facebook size={20} /></a>
              <a href="#" className="hover:text-pink-400"><Instagram size={20} /></a>
              <a href="#" className="hover:text-pink-400"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-gray-300 hover:text-pink-400 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-pink-400" />
                <span className="text-gray-300">123 Fashion Street, NY</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-pink-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-pink-400" />
                <span className="text-gray-300">hello@glamourshop.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} GlamourShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;