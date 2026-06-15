import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import PortalHome from "./pages/PortalHome";
import Demo001 from "./pages/Demo001";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Layout wrapper for jewellery storefront demo
function StoreLayout({ children, cart }) {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <div className="store-layout">
      <Navbar cartCount={cartCount} />
      <div className="store-main">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("shreeganesha_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse cart storage", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("shreeganesha_cart", JSON.stringify(cart));
  }, [cart]);

  // Cart Handlers
  const handleAddToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });

    // Alert toast helper
    showToast(`${product.name} added to cart!`);
  };

  const handleRemoveFromCart = (productId) => {
    const item = cart.find(i => i.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    if (item) {
      showToast(`${item.name} removed from cart.`);
    }
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Micro-toast helper
  const showToast = (message) => {
    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.classList.add("toast-show");
    }, 10);

    // Remove
    setTimeout(() => {
      toast.classList.remove("toast-show");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 2500);
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Portal Home Dashboard */}
        <Route path="/" element={<PortalHome />} />

        {/* Demo 001 - Imitation Jewellery Concept */}
        <Route
          path="/demo-001"
          element={
            <StoreLayout cart={cart}>
              <Demo001 onAddToCart={handleAddToCart} />
            </StoreLayout>
          }
        />
        <Route
          path="/demo-001/product/:id"
          element={
            <StoreLayout cart={cart}>
              <ProductDetails onAddToCart={handleAddToCart} />
            </StoreLayout>
          }
        />
        <Route
          path="/demo-001/cart"
          element={
            <StoreLayout cart={cart}>
              <Cart
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveFromCart}
              />
            </StoreLayout>
          }
        />
        <Route
          path="/demo-001/checkout"
          element={
            <StoreLayout cart={cart}>
              <Checkout cart={cart} onClearCart={handleClearCart} />
            </StoreLayout>
          }
        />
      </Routes>
    </Router>
  );
}
