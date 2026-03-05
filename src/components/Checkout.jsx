import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';

import { useCart } from '../context/CartContext';
import { createOrder } from '../api/ProductApi';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    address: '',
  });

  const cities = [
    { value: 'Dhaka', label: 'Dhaka', shippingCharge: 70 },
    { value: 'Chattogram', label: 'Chattogram', shippingCharge: 120 },
    { value: 'Rajshahi', label: 'Rajshahi', shippingCharge: 120 },
    { value: 'Khulna', label: 'Khulna', shippingCharge: 120 },
    { value: 'Barisal', label: 'Barisal', shippingCharge: 120 },
    { value: 'Sylhet', label: 'Sylhet', shippingCharge: 120 },
    { value: 'Rangpur', label: 'Rangpur', shippingCharge: 120 },
    { value: 'Mymensingh', label: 'Mymensingh', shippingCharge: 120 },
    { value: 'Comilla', label: 'Comilla', shippingCharge: 120 },
    { value: 'Narayanganj', label: 'Narayanganj', shippingCharge: 100 }, // Near Dhaka
    { value: 'Gazipur', label: 'Gazipur', shippingCharge: 100 }, // Near Dhaka
  ];

  const subtotal = totalAmount || 0;
  
  // Calculate shipping based on selected city
  const getShippingCharge = () => {
    if (!formData.city) return 0;
    const selectedCity = cities.find(city => city.value === formData.city);
    return selectedCity ? selectedCity.shippingCharge : 120; // Default to 120 if city not found
  };

  const shipping = getShippingCharge();
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Generate a unique order number
  const generateOrderNumber = () => {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD-${timestamp}-${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get sessionId from localStorage
      const sessionId = localStorage.getItem('sessionId');
      
      if (!sessionId) {
        throw new Error('Session ID not found. Please refresh the page.');
      }

      if (cartItems.length === 0) {
        throw new Error('Your cart is empty');
      }

      // Prepare order data according to your backend schema
      const orderData = {
        sessionId: sessionId,
        orderNumber: generateOrderNumber(),
        items: cartItems.map(item => ({
          productId: item.productId || item.id,
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
          image: item.image || '',
        })),
        totalAmount: Number(total),
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          city: formData.city,
          address: formData.address,
        },
        paymentMethod: 'Cash on Delivery',
        notes: '',
      };

      const response = await createOrder(orderData);
      
      if (response.success) {
        localStorage.setItem('lastOrder', JSON.stringify(response.data));
        await clearCart();
        toast.success('Order placed successfully!');
        navigate('/', { 
          state: { order: response.data } 
        });
      } else {
        throw new Error(response.message || 'Failed to place order');
      }
    } catch (error) {
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to place order. Please try again.';
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingBag size={70} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition"
        >
          <ArrowLeft size={18} className="mr-2" />
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/cart')}
        className="flex items-center text-gray-600 hover:text-pink-600 mb-6"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to Cart
      </button>

      <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label} (Shipping: ৳{city.shippingCharge})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="House No., Road No., Area, etc."
                />
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-700 font-medium">Payment Method: Cash on Delivery</p>
                <p className="text-sm text-green-600 mt-1">
                  Pay with cash when you receive your order
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.city}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Placing Order...
                  </span>
                ) : (
                  'Place Order (Cash on Delivery)'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-5">Order Summary</h2>

            {/* Order Items */}
            <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
              {cartItems.map((item) => (
                <div key={item.productId || item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    ৳ {(item.price * item.quantity).toFixed(0)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm border-t pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>৳ {subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium">
                  {formData.city ? (
                    `৳ ${shipping}`
                  ) : (
                    <span className="text-red-500">Select city</span>
                  )}
                </span>
              </div>
              {formData.city && (
                <div className="text-xs text-gray-500">
                  {formData.city === 'Dhaka' || formData.city === 'Narayanganj' || formData.city === 'Gazipur' 
                    ? '✓ Inside Dhaka (70 TK)' 
                    : '✓ Outside Dhaka (120 TK)'}
                </div>
              )}
            </div>

            <div className="border-t mt-3 pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-green-600">
                  ৳ {formData.city ? total.toFixed(0) : subtotal.toFixed(0)}
                </span>
              </div>
              {!formData.city && (
                <p className="text-xs text-red-500 mt-1">
                  Please select a city to calculate shipping
                </p>
              )}
            </div>

            {/* Shipping Info Note */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
              <p className="font-medium mb-1">🚚 Shipping Information:</p>
              <p>• Dhaka, Narayanganj & Gazipur: ৳100</p>
              <p>• All other cities: ৳120</p>
              <p className="mt-1">Free shipping on orders above ৳1000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;