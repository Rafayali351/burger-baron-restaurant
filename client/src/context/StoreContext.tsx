import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  Product,
  CartItem,
  Order,
  OrderStatus,
  Coupon,
  Review,
  CategoryType,
  CustomizationSelection,
  ToastMessage,
  User,
} from '../types';
import { PRODUCTS, COUPONS, REVIEWS } from '../data/mockData';

interface StoreContextType {
  currentUser: User | null;
  products: Product[];
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  discountAmount: number;
  deliveryFee: number;
  taxAmount: number;
  cartFinalTotal: number;
  appliedCoupon: Coupon | null;
  coupons: Coupon[];
  reviews: Review[];
  orders: Order[];
  currentOrder: Order | null;
  isAdminOpen: boolean;
  isCartOpen: boolean;
  isCustomizerOpen: boolean;
  customizingProduct: Product | null;
  isCheckoutOpen: boolean;
  isAuthModalOpen: boolean;
  authModalRole: 'customer' | 'admin';
  isProfileModalOpen: boolean;
  searchQuery: string;
  selectedCategory: CategoryType;
  sortBy: string;
  toasts: ToastMessage[];

  // Actions
  loginCustomer: (email: string, pass: string) => boolean;
  loginAdmin: (email: string, pass: string) => boolean;
  registerCustomer: (name: string, email: string, pass: string, phone?: string) => boolean;
  logout: () => void;
  openAuthModal: (role?: 'customer' | 'admin') => void;
  closeAuthModal: () => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  reorder: (orderId: string) => void;

  addToCart: (product: Product, quantity?: number, customization?: CustomizationSelection) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  openCustomizer: (product: Product) => void;
  closeCustomizer: () => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsAdminOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: CategoryType) => void;
  setSortBy: (sort: string) => void;
  placeOrder: (orderPayload: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    orderType: 'delivery' | 'pickup';
    deliveryAddress?: { street: string; apt?: string; city: string; postalCode: string; notes?: string };
    paymentMethod: 'card' | 'cod' | 'applepay';
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  setCurrentOrder: (order: Order | null) => void;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default Customer State (Logged in as demo customer Alex)
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 'usr-101',
    name: 'Alex Sterling',
    email: 'alex.sterling@gmail.com',
    role: 'Customer',
    phone: '(555) 782-9921',
    loyaltyPoints: 340,
    tier: 'Baron Gold VIP',
    addresses: [
      { id: 'addr-1', label: 'Home', street: '454 Grand Avenue, Apt 8B', city: 'Metropolis' },
      { id: 'addr-2', label: 'Office', street: '100 Silicon Boulevard, Floor 14', city: 'Metropolis' },
    ]
  });

  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([
    {
      cartItemId: 'init-1',
      product: PRODUCTS[0],
      quantity: 1,
      calculatedPrice: PRODUCTS[0].basePrice,
    }
  ]);

  const [coupons] = useState<Coupon[]>(COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);

  // Past & Active Orders
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ord-1001',
      orderNumber: '#BB-8492',
      userId: 'usr-101',
      customerName: 'Alex Sterling',
      customerEmail: 'alex.sterling@gmail.com',
      customerPhone: '(555) 782-9921',
      orderType: 'delivery',
      deliveryAddress: {
        street: '454 Grand Avenue',
        apt: 'Apt 8B',
        city: 'Metropolis',
        postalCode: '90210',
        notes: 'Ring bell on arrival',
      },
      items: [
        {
          cartItemId: 'sample-1',
          product: PRODUCTS[0],
          quantity: 2,
          calculatedPrice: PRODUCTS[0].basePrice,
        },
        {
          cartItemId: 'sample-2',
          product: PRODUCTS[12],
          quantity: 1,
          calculatedPrice: PRODUCTS[12].basePrice,
        }
      ],
      subtotal: 38.97,
      tax: 3.31,
      deliveryFee: 0,
      discountAmount: 0,
      finalTotal: 42.28,
      paymentMethod: 'card',
      status: 'Preparing in Kitchen',
      createdAt: '18 mins ago',
      estimatedDeliveryTime: '14 mins',
      driver: {
        name: 'Tyler Vance',
        phone: '(555) 492-1200',
        vehicle: 'Gold Honda Navi Special',
        rating: 4.95,
      }
    },
    {
      id: 'ord-1000',
      orderNumber: '#BB-7721',
      userId: 'usr-101',
      customerName: 'Alex Sterling',
      customerEmail: 'alex.sterling@gmail.com',
      customerPhone: '(555) 782-9921',
      orderType: 'delivery',
      deliveryAddress: {
        street: '454 Grand Avenue',
        apt: 'Apt 8B',
        city: 'Metropolis',
        postalCode: '90210',
      },
      items: [
        {
          cartItemId: 'past-1',
          product: PRODUCTS[1],
          quantity: 1,
          calculatedPrice: PRODUCTS[1].basePrice,
        },
        {
          cartItemId: 'past-2',
          product: PRODUCTS[17],
          quantity: 1,
          calculatedPrice: PRODUCTS[17].basePrice,
        }
      ],
      subtotal: 24.48,
      tax: 2.08,
      deliveryFee: 4.99,
      discountAmount: 0,
      finalTotal: 31.55,
      paymentMethod: 'card',
      status: 'Delivered',
      createdAt: 'Yesterday at 8:40 PM',
      estimatedDeliveryTime: 'Delivered',
    }
  ]);

  const [currentOrder, setCurrentOrder] = useState<Order | null>(orders[0]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);

  // Authentication & Profile modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState<'customer' | 'admin'>('customer');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [sortBy, setSortBy] = useState('featured');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openAuthModal = (role: 'customer' | 'admin' = 'customer') => {
    setAuthModalRole(role);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const loginCustomer = (email: string, pass: string) => {
    const customerUser: User = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0].toUpperCase(),
      email,
      role: 'Customer',
      phone: '(555) 782-9921',
      loyaltyPoints: 120,
      tier: 'Baron Silver Member',
      addresses: [
        { id: 'addr-new', label: 'Primary', street: '123 Gourmet Street', city: 'Metropolis' }
      ]
    };
    setCurrentUser(customerUser);
    setIsAuthModalOpen(false);
    addToast('Welcome Back!', `Signed in as Customer: ${customerUser.name}`, 'success');
    return true;
  };

  const loginAdmin = (email: string, pass: string) => {
    const adminUser: User = {
      id: 'adm-001',
      name: 'Manager Sarah (Head Chef)',
      email,
      role: 'Admin',
      phone: '(555) 100-2000',
    };
    setCurrentUser(adminUser);
    setIsAuthModalOpen(false);
    setIsAdminOpen(true);
    addToast('Admin Access Granted', 'Logged into Restaurant Kitchen & Sales Desk.', 'success');
    return true;
  };

  const registerCustomer = (name: string, email: string, pass: string, phone?: string) => {
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name,
      email,
      role: 'Customer',
      phone: phone || '(555) 000-0000',
      loyaltyPoints: 50,
      tier: 'Baron Welcome Member',
      addresses: []
    };
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    addToast('Account Created!', `Welcome to The Baron family, ${name}! 50 Bonus points added.`, 'success');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsProfileModalOpen(false);
    setIsAdminOpen(false);
    addToast('Signed Out', 'You have been logged out successfully.', 'info');
  };

  const reorder = (orderId: string) => {
    const pastOrder = orders.find((o) => o.id === orderId);
    if (!pastOrder) return;

    pastOrder.items.forEach((item) => {
      addToCart(item.product, item.quantity, item.customization);
    });

    setIsProfileModalOpen(false);
    setIsCartOpen(true);
    addToast('Items Added to Cart', `Added items from Order ${pastOrder.orderNumber} to your cart.`, 'success');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.calculatedPrice * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'Percentage') {
      discountAmount = (cartSubtotal * appliedCoupon.discountValue) / 100;
    } else {
      discountAmount = Math.min(cartSubtotal, appliedCoupon.discountValue);
    }
  }

  const deliveryFee = cartSubtotal > 35 || cartSubtotal === 0 ? 0 : 4.99;
  const taxAmount = Number(((cartSubtotal - discountAmount) * 0.085).toFixed(2));
  const cartFinalTotal = Number(Math.max(0, cartSubtotal - discountAmount + taxAmount + deliveryFee).toFixed(2));

  const addToCart = (product: Product, quantity = 1, customization?: CustomizationSelection) => {
    const unitPrice = customization 
      ? calculateCustomizedPrice(product.basePrice, customization)
      : product.basePrice;

    const cartItemId = 'item-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5);
    
    setCart((prev) => [
      ...prev,
      {
        cartItemId,
        product,
        quantity,
        customization,
        calculatedPrice: unitPrice,
      }
    ]);

    addToast(
      'Added to Order!',
      `${quantity}x ${product.name} is now sizzling in your cart.`,
      'success'
    );
  };

  const calculateCustomizedPrice = (base: number, c: CustomizationSelection) => {
    let extra = 0;
    if (c.pattyCount > 1) {
      extra += (c.pattyCount - 1) * 3.50;
    }
    if (c.bun === 'bun-glutenfree') extra += 1.75;
    if (c.bun === 'bun-potato' || c.bun === 'bun-sesame') extra += 0.50;
    if (c.protein === 'protein-veggie') extra += 2.00;
    if (c.protein === 'protein-zinger') extra += 1.00;
    extra += c.cheeses.length * 1.00;
    extra += c.toppings.length * 1.25;
    extra += Math.max(0, (c.sauces.length - 1)) * 0.75;

    return Number((base + extra).toFixed(2));
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    addToast('Item removed', 'Item removed from your order.', 'info');
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string) => {
    const cleanedCode = code.trim().toUpperCase();
    const coupon = coupons.find((c) => c.code.toUpperCase() === cleanedCode && c.isActive);

    if (!coupon) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }

    if (cartSubtotal < coupon.minSpend) {
      return {
        success: false,
        message: `Requires a minimum spend of $${coupon.minSpend.toFixed(2)}. Your current subtotal is $${cartSubtotal.toFixed(2)}.`,
      };
    }

    setAppliedCoupon(coupon);
    addToast('Coupon Applied!', `${coupon.code} gave you $${(coupon.discountType === 'Percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue}`)} off!`, 'success');
    return { success: true, message: `Coupon applied: ${coupon.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon Removed', 'Coupon was removed from your cart.', 'info');
  };

  const openCustomizer = (product: Product) => {
    setCustomizingProduct(product);
    setIsCustomizerOpen(true);
  };

  const closeCustomizer = () => {
    setCustomizingProduct(null);
    setIsCustomizerOpen(false);
  };

  const placeOrder = (orderPayload: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    orderType: 'delivery' | 'pickup';
    deliveryAddress?: { street: string; apt?: string; city: string; postalCode: string; notes?: string };
    paymentMethod: 'card' | 'cod' | 'applepay';
  }): Order => {
    const orderNum = '#BB-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: orderNum,
      userId: currentUser?.id,
      customerName: orderPayload.customerName,
      customerEmail: orderPayload.customerEmail,
      customerPhone: orderPayload.customerPhone,
      orderType: orderPayload.orderType,
      deliveryAddress: orderPayload.deliveryAddress,
      items: [...cart],
      subtotal: cartSubtotal,
      tax: taxAmount,
      deliveryFee: deliveryFee,
      discountAmount: discountAmount,
      couponCode: appliedCoupon?.code,
      finalTotal: cartFinalTotal,
      paymentMethod: orderPayload.paymentMethod,
      status: 'Placed',
      createdAt: 'Just now',
      estimatedDeliveryTime: '28-35 mins',
      driver: {
        name: 'Tyler Vance',
        phone: '(555) 492-1200',
        vehicle: 'Gold Honda Navi Delivery Special',
        rating: 4.98,
      },
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    setCart([]);
    setAppliedCoupon(null);
    setIsCheckoutOpen(false);

    addToast('Order Placed Successfully!', `Order ${orderNum} received! Tracking is now live.`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    if (currentOrder && currentOrder.id === orderId) {
      setCurrentOrder((prev) => (prev ? { ...prev, status } : null));
    }
    addToast('Order Status Updated', `Order #${orderId} marked as ${status}`, 'info');
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: 'rev-' + Date.now(),
      date: 'Just now',
    };
    setReviews((prev) => [newReview, ...prev]);
    addToast('Review Submitted!', 'Thank you for sharing your Baron dining experience!', 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        currentUser,
        products,
        cart,
        cartCount,
        cartSubtotal,
        discountAmount,
        deliveryFee,
        taxAmount,
        cartFinalTotal,
        appliedCoupon,
        coupons,
        reviews,
        orders,
        currentOrder,
        isAdminOpen,
        isCartOpen,
        isCustomizerOpen,
        customizingProduct,
        isCheckoutOpen,
        isAuthModalOpen,
        authModalRole,
        isProfileModalOpen,
        searchQuery,
        selectedCategory,
        sortBy,
        toasts,
        loginCustomer,
        loginAdmin,
        registerCustomer,
        logout,
        openAuthModal,
        closeAuthModal,
        openProfileModal,
        closeProfileModal,
        reorder,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        openCustomizer,
        closeCustomizer,
        setIsCartOpen,
        setIsCheckoutOpen,
        setIsAdminOpen,
        setSearchQuery,
        setSelectedCategory,
        setSortBy,
        placeOrder,
        updateOrderStatus,
        setCurrentOrder,
        addReview,
        addToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
