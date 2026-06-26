import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      // Cart State
      cart: [],
      addToCart: (product, quantity = 1, color, size) => 
        set((state) => {
          const existingItem = state.cart.find(
            item => item.id === product.id && item.color === color && item.size === size
          );
          
          if (existingItem) {
            return {
              cart: state.cart.map(item => 
                item === existingItem 
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          }
          
          return { cart: [...state.cart, { ...product, quantity, color, size }] };
        }),
      removeFromCart: (productId, color, size) => 
        set((state) => ({
          cart: state.cart.filter(item => !(item.id === productId && item.color === color && item.size === size))
        })),
      updateQuantity: (productId, color, size, quantity) => 
        set((state) => ({
          cart: state.cart.map(item => 
            item.id === productId && item.color === color && item.size === size
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          )
        })),
      clearCart: () => set({ cart: [] }),
      
      // Wishlist State
      wishlist: [],
      toggleWishlist: (product) => 
        set((state) => {
          const isWishlisted = state.wishlist.some(item => item.id === product.id);
          if (isWishlisted) {
            return { wishlist: state.wishlist.filter(item => item.id !== product.id) };
          }
          return { wishlist: [...state.wishlist, product] };
        }),
      
      // Orders State
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),

      // User Auth State
      user: null,
      token: null,
      checkoutEmail: null,
      setAuth: (user, token) => set({ user, token }),
      setCheckoutEmail: (email) => set({ checkoutEmail: email }),
      logout: () => set({ user: null, token: null, checkoutEmail: null }),

      // App Settings
      darkMode: false,
      setDarkMode: (val) => set({ darkMode: val }),
      biometricsEnabled: false,
      setBiometricsEnabled: (val) => set({ biometricsEnabled: val }),
      notificationsEnabled: true,
      setNotificationsEnabled: (val) => set({ notificationsEnabled: val }),
      promoEmails: false,
      setPromoEmails: (val) => set({ promoEmails: val }),
    }),
    {
      name: 'luxe-storage',
    }
  )
);

export default useStore;
