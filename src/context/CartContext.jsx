// context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { 
  getCart, 
  addToCart as apiAddToCart, 
  updateCartItem as apiUpdateCartItem, 
  removeFromCart as apiRemoveFromCart,
  clearCart as apiClearCart
} from '../Api/ProductApi';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const cartData = await getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      const updatedCart = await apiAddToCart(productId, quantity);
      setCart(updatedCart);
      return { success: true };
    } catch (error) {
      console.error('Failed to add to cart:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      setLoading(true);
      const updatedCart = await apiUpdateCartItem(productId, quantity);
      setCart(updatedCart);
      return { success: true };
    } catch (error) {
      console.error('Failed to update cart:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      setLoading(true);
      const updatedCart = await apiRemoveFromCart(productId);
      setCart(updatedCart);
      return { success: true };
    } catch (error) {
      console.error('Failed to remove item:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      const updatedCart = await apiClearCart();
      setCart(updatedCart);
      return { success: true };
    } catch (error) {
      console.error('Failed to clear cart:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Calculate derived values
  const cartItems = cart?.items || [];
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart?.totalAmount || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        totalItems,
        totalAmount,
        loading,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};