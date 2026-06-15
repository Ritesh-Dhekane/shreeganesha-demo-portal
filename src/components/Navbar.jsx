import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, LayoutDashboard, Menu, X, Sparkles } from "lucide-react";
import { CONFIG } from "../config/constants";

export default function Navbar({ cartCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Helper to scroll to section if on home, otherwise navigate home then scroll
  const handleScrollTo = (elementId) => {
    setIsOpen(false);
    if (location.pathname === "/demo-001" || location.pathname === "/demo-001/") {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/demo-001");
      // Delay slightly to allow page to render
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <nav className="store-navbar">
      {/* Demo Portal Info Bar */}
      <div className="demo-info-bar">
        <div className="container demo-info-flex">
          <span>Client Review Environment: <strong>{CONFIG.CLIENT_NAME} ({CONFIG.CURRENT_PHASE})</strong></span>
          <Link to="/" className="back-portal-link">
            <LayoutDashboard size={14} /> Back to Demo Portal
          </Link>
        </div>
      </div>

      <div className="main-nav-bar">
        <div className="container nav-flex">
          <Link to="/demo-001" className="store-logo">
            <Sparkles size={20} className="logo-sparkle" />
            <span className="logo-text">SHREE GANESHA</span>
          </Link>

          {/* Desktop Menu */}
          <div className="nav-links-desktop">
            <Link to="/demo-001" className="nav-link">Home</Link>
            <button onClick={() => handleScrollTo("products")} className="nav-link-btn">Collections</button>
            <button onClick={() => handleScrollTo("about")} className="nav-link-btn">Our Heritage</button>
            <button onClick={() => handleScrollTo("contact")} className="nav-link-btn">Contact Us</button>
          </div>

          <div className="nav-actions">
            <Link to="/demo-001/cart" className="cart-nav-btn" title="View Cart">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
            </Link>
            <button className="menu-toggle-btn" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu">
            <Link to="/demo-001" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Home</Link>
            <button onClick={() => handleScrollTo("products")} className="mobile-nav-link-btn">Collections</button>
            <button onClick={() => handleScrollTo("about")} className="mobile-nav-link-btn">Our Heritage</button>
            <button onClick={() => handleScrollTo("contact")} className="mobile-nav-link-btn">Contact Us</button>
            <Link to="/" className="mobile-nav-link highlight-portal" onClick={() => setIsOpen(false)}>
              <LayoutDashboard size={16} /> Back to Demo Portal
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
