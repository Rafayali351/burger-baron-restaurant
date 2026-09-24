export type CategoryType = 
  | 'all'
  | 'smash-burgers'
  | 'crispy-chicken'
  | 'value-combos'
  | 'fries-sides'
  | 'craft-beverages'
  | 'shakes-desserts';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Customer' | 'Admin';
  phone?: string;
  loyaltyPoints?: number;
  tier?: string;
  addresses?: { id: string; label: string; street: string; city: string }[];
}

export interface Product {
  id: string;
  name: string;
  categoryId: CategoryType;
  categoryName: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  isAvailable: boolean;
  calories?: number;
  isSpicy?: boolean;
  isChefsPick?: boolean;
  isNew?: boolean;
  rating: number;
  reviewCount: number;
  defaultCustomization?: CustomizationSelection;
}

export interface CustomizationOption {
  id: string;
  name: string;
  extraPrice: number;
  icon?: string;
  color?: string;
}

export interface CustomizationGroup {
  buns: CustomizationOption[];
  proteins: CustomizationOption[];
  cheeses: CustomizationOption[];
  toppings: CustomizationOption[];
  sauces: CustomizationOption[];
}

export interface CustomizationSelection {
  bun: string;
  protein: string;
  pattyCount: number;
  cheeses: string[];
  toppings: string[];
  sauces: string[];
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  customization?: CustomizationSelection;
  calculatedPrice: number;
}

export type OrderStatus = 
  | 'Placed' 
  | 'Confirmed' 
  | 'Preparing in Kitchen' 
  | 'Out for Delivery' 
  | 'Delivered';

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderType: 'delivery' | 'pickup';
  deliveryAddress?: {
    street: string;
    apt?: string;
    city: string;
    postalCode: string;
    notes?: string;
  };
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discountAmount: number;
  couponCode?: string;
  finalTotal: number;
  paymentMethod: 'card' | 'cod' | 'applepay';
  status: OrderStatus;
  createdAt: string;
  estimatedDeliveryTime: string;
  driver?: {
    name: string;
    phone: string;
    vehicle: string;
    rating: number;
  };
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'Percentage' | 'Fixed';
  discountValue: number;
  minSpend: number;
  expiryDate: string;
  description: string;
  isActive: boolean;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  orderedItem: string;
  comment: string;
  verifiedBuyer: boolean;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}
