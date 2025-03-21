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
import { OrderCart } from '@/types/order';

export interface ItemCart {
  product: Product;
  amount: number;
}

interface ICartContext {
  selectedItemCart: string[];
  cart: ItemCart[];
  totalPrice: number;
  toggleChanges: (pid: string) => void;
  setAmountCart: (pid: string, n: number) => void;
  resetContext: () => void;
}

const CartContext = createContext<ICartContext>({} as ICartContext);

export const useCart = () => useContext(CartContext);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<ItemCart[]>([]);
  const [selectedItemCart, setSelectedCartItem] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const setAmountCart = (pid: string, n: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.productID === pid
          ? { ...item, amount: item.amount + n }
          : item
      )
    );
  };

  const resetContext = useCallback(() => {
    setSelectedCartItem([]);
    localStorage.setItem('selectedProduct', '');
  }, []);

  const toggleChanges = useCallback(
    (pid: string) => {
      setSelectedCartItem((prev) => {
        const updated = prev.includes(pid)
          ? prev.filter((item) => item !== pid)
          : [...prev, pid];

        return updated;
      });
    },
    [user]
  );

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (!user || !('cart' in user)) return;

      const productList = await Promise.all(
        user.cart.map(async (orderCart: OrderCart) => {
          const product = await getProductById(orderCart.productID);
          return product ? { product, amount: orderCart.amount } : undefined;
        })
      );

      setCart(
        productList.filter((item): item is ItemCart => item !== undefined)
      );
    };

    fetchCartProducts();
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        selectedItemCart,
        cart,
        totalPrice,
        resetContext,
        toggleChanges,
        setAmountCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
