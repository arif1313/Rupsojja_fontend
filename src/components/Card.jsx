import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, X } from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Diamond Necklace',
      price: 299.99,
      image:
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300',
      quantity: 1,
      size: 'M',
    },
    {
      id: 2,
      name: 'Summer Dress',
      price: 89.99,
      image:
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300',
      quantity: 2,
      size: 'S',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    alert('🎉 Order placed successfully (Cash on Delivery)');
    setIsModalOpen(false);
    setCartItems([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Shopping Cart ({totalItems} items)
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag size={70} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">
            Your cart is empty
          </h2>
          <Link
            to="/products"
            className="inline-flex items-center bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition"
          >
            <ArrowLeft size={18} className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-5">
              {cartItems.map((item) => (
             <div
  key={item.id}
  className="flex gap-3 bg-gray-100 rounded-2xl p-3 shadow-sm"
>
  {/* Product Image */}
  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl flex items-center justify-center">
    <img
      src={item.image}
      alt={item.name}
      className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
    />
  </div>

  {/* Right Content */}
  <div className="flex-1 flex flex-col justify-between">
    
    {/* Top Row */}
    <div className="flex justify-between items-start">
      <div className="pr-2">
        <h3 className="text-sm sm:text-base font-medium text-gray-800 leading-tight line-clamp-2">
          {item.name}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          ৳ {item.price} × {item.quantity}
        </p>
      </div>

      <button
        onClick={() => removeItem(item.id)}
        className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-400 hover:text-red-500"
      >
        <Trash2 size={14} />
      </button>
    </div>

    {/* Bottom Row */}
    <div className="flex items-center justify-between mt-3">
      
      {/* Quantity */}
      <div className="flex items-center border bg-white rounded-lg overflow-hidden">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="px-2 py-1 text-gray-500 hover:bg-gray-100"
        >
          <Minus size={14} />
        </button>

        <span className="px-3 text-sm font-medium">
          {item.quantity}
        </span>

        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="px-2 py-1 text-gray-500 hover:bg-gray-100"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Total Price */}
      <span className="text-sm sm:text-base font-semibold text-gray-900">
        ৳ {(item.price * item.quantity).toFixed(0)}
      </span>
    </div>
  </div>
</div>


              ))}

             
            </div>

            {/* Order Summary Side */}
            <div>
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0
                        ? 'FREE'
                        : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t mt-5 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
               <button
                onClick={() => setIsModalOpen(true)}
                className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-full font-semibold transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

          {/* ================= MODAL ================= */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative max-h-[90vh] overflow-y-auto">

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-black"
                >
                  <X size={22} />
                </button>

                <h2 className="text-xl font-bold mb-4">
                  Order Summary
                </h2>

                <div className="space-y-2 text-sm mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name} × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Order Form */}
                <h3 className="font-semibold mb-3">
                  Shipping Information (Cash on Delivery)
                </h3>

                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className="w-full border rounded-lg px-4 py-2"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    className="w-full border rounded-lg px-4 py-2"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    required
                    className="w-full border rounded-lg px-4 py-2"
                  />
                  <textarea
                    placeholder="Full Address"
                    required
                    className="w-full border rounded-lg px-4 py-2"
                  />

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold transition"
                  >
                    Place Order (Cash on Delivery)
                  </button>
                </form>

              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
