'use client';
import { Product } from '@/types/product';
import { useAuth } from './AuthContext';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getProductById } from '@/utils/product';

interface ICartContext {
  selectedItemCart: string[];
  cart: Product[];
  selectedProduct: Product[];
  totalPrice: number;
  setPrice: (tot: number) => void;
  toggleChanges: (pid: string) => void;
  resetContext: () => void;
}

const CartContext = createContext<ICartContext>({} as ICartContext);

export const useCart = () => useContext(CartContext);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product[]>([]);
  const [selectedItemCart, setSelectedCartItem] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const resetContext = useCallback(() => {
    setSelectedCartItem([]);
  }, []);

  const toggleChanges = useCallback(
    (pid: string) => {
      setSelectedCartItem((prev) =>
        prev.includes(pid)
          ? prev.filter((item) => item !== pid)
          : [...prev, pid]
      );
    },
    [user]
  );

  const setPrice = (tot: number) => {
    setTotalPrice(tot);
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (!user || !('cart' in user)) return;

      const productList = await Promise.all(
        user.cart.map(async (productId: string) => {
          const product = await getProductById(productId);
          return product;
        })
      );

      setCart(productList.filter((p): p is Product => p !== null));
    };

    const fetchSelectedProducts = async () => {
      if (!user || !('cart' in user)) return;

      const productList = await Promise.all(
        selectedItemCart.map(async (productId: string) => {
          const product = await getProductById(productId);
          return product;
        })
      );

      setSelectedProduct(productList.filter((p): p is Product => p !== null));
    };

    fetchCartProducts();
    fetchSelectedProducts();
  }, []);

  return (
    <CartContext.Provider
      value={{
        selectedItemCart,
        cart,
        selectedProduct,
        totalPrice,
        setPrice,
        resetContext,
        toggleChanges,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
