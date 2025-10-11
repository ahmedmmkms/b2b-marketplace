// libs/store/useCartStore.ts
import { create } from 'zustand';

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  thumbnail?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => 
    set((state) => {
      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + item.quantity
        };
        return { items: updatedItems };
      } else {
        // Add new item
        return { items: [...state.items, item] };
      }
    }),
  removeItem: (id) => 
    set((state) => ({
      items: state.items.filter(item => item.id !== id)
    })),
  updateQuantity: (id, quantity) => 
    set((state) => ({
      items: state.items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    })),
  clearCart: () => set({ items: [] }),
  getTotalItems: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },
  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
}));