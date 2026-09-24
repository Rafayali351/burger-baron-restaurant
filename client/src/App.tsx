import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DealTicker } from './components/DealTicker';
import { MenuGrid } from './components/MenuGrid';
import { CustomizerPromo } from './components/CustomizerPromo';
import { BurgerCustomizer } from './components/BurgerCustomizer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTracker } from './components/OrderTracker';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { CustomerProfileModal } from './components/CustomerProfileModal';
import { ToastContainer } from './components/ToastContainer';

const MainApp: React.FC = () => {
  const { openCustomizer, products } = useStore();

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-charcoal flex flex-col selection:bg-brand-red selection:text-white">
      {/* 1. Header / Navbar */}
      <Navbar onNavigate={handleNavigate} />

      <main className="flex-1 w-full">
        {/* 2. Promotional Hero Carousel */}
        <Hero
          onExploreMenu={() => handleNavigate('menu')}
          onOpenCustomizer={() => openCustomizer(products[0])}
        />

        {/* 3. Deal of the Day & Discount Ticker */}
        <DealTicker />

        {/* 4. Multi-Category Filterable Menu */}
        <MenuGrid />

        {/* 5. Customizer Visual Feature Section */}
        <CustomizerPromo />

        {/* 7. Real-Time Order Tracking View */}
        <OrderTracker />

        {/* 8. Customer Reviews & Ratings Section */}
        <ReviewsSection />

        {/* 9. Interactive FAQ Accordion */}
        <FaqSection />
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* Modals & Overlays */}
      {/* Customer & Admin Authentication Modal */}
      <AuthModal />

      {/* Customer Account & Order History Modal */}
      <CustomerProfileModal />

      {/* 5. Interactive Burger Customizer Modal */}
      <BurgerCustomizer />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* 6. Multi-Step Checkout Drawer / Modal */}
      <CheckoutModal onOrderSuccess={handleNavigate} />

      {/* Enterprise Admin Control Panel & Kanban Board */}
      <AdminDashboard />

      {/* Toast Notification Layer */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
