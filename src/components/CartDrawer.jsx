import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';


const CartDrawer = () => {
  const navigate = useNavigate();
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    totalItems, 
    totalAmount,
    updateQuantity, 
    removeItem,
    loading 
  } = useCart();

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const result = await updateQuantity(productId, newQuantity);
    
    if (!result.success) {
      toast.error(result.error || 'Failed to update quantity');
    }
  };

  const handleRemoveItem = async (productId) => {
    const result = await removeItem(productId);
    
    if (result.success) {
      toast.success('Item removed from cart');
    } else {
      toast.error(result.error || 'Failed to remove item');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const subtotal = totalAmount || 0;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <ShoppingBag size={20} />
                Shopping Cart ({totalItems})
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-10">
                  <ShoppingBag size={50} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 text-pink-600 hover:text-pink-700 font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="flex gap-3 bg-gray-50 p-3 rounded-lg">
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                        <img
                          src={item.image || '/placeholder-image.jpg'}
                          alt={item.name}
                          className="w-12 h-12 object-contain"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="text-sm font-medium line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          ৳ {item.price}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border rounded-lg overflow-hidden">
                            <button
                              onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                              disabled={loading}
                              className="px-2 py-1 hover:bg-gray-200 disabled:opacity-50"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-3 text-sm">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                              disabled={loading}
                              className="px-2 py-1 hover:bg-gray-200 disabled:opacity-50"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.productId)}
                            disabled={loading}
                            className="text-red-500 hover:text-red-700 disabled:opacity-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t p-4">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold">৳ {subtotal.toFixed(0)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-medium transition"
                >
                  Checkout
                </button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-3"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;