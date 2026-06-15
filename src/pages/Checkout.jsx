import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageSquare, ShieldCheck } from "lucide-react";
import { CONFIG } from "../config/constants";

export default function Checkout({ cart, onClearCart }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [isRedirecting, setIsRedirecting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/; // Basic 10-digit validation for Indian context

    if (!formData.fullName.trim()) tempErrors.fullName = "Full Name is required";
    
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone Number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/[\s-+]/g, ""))) {
      tempErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (formData.email && !emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (!formData.address.trim()) tempErrors.address = "Delivery Address is required";
    if (!formData.city.trim()) tempErrors.city = "City is required";
    if (!formData.state.trim()) tempErrors.state = "State is required";
    if (!formData.postalCode.trim()) tempErrors.postalCode = "Postal Code is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsRedirecting(true);

    // Format WhatsApp Message
    let message = `New Order Request\n\n`;
    message += `## Customer Details\n\n`;
    message += `Name: ${formData.fullName.trim()}\n`;
    message += `Phone: ${formData.phone.trim()}\n`;
    message += `Email: ${formData.email.trim() || "Not Provided"}\n\n`;
    message += `Address: ${formData.address.trim()}\n`;
    message += `City: ${formData.city.trim()}\n`;
    message += `State: ${formData.state.trim()}\n`;
    message += `Postal Code: ${formData.postalCode.trim()}\n\n`;
    
    message += `## Products\n\n`;
    cart.forEach(item => {
      message += `Product Name: ${item.name}\n`;
      message += `Quantity: ${item.quantity}\n`;
      message += `Price: ${CONFIG.CURRENCY_SYMBOL}${(item.price * item.quantity).toLocaleString("en-IN")}\n\n`;
    });
    
    message += `Order Total: ${CONFIG.CURRENCY_SYMBOL}${subtotal.toLocaleString("en-IN")}\n\n`;
    message += `Additional Notes:\n${formData.notes.trim() || "None"}\n\n`;
    message += `Generated From:\nDemo 001`;

    // Encode text message
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Set a minor timeout to show redirect screen before opening link
    setTimeout(() => {
      onClearCart();
      window.open(whatsappUrl, "_blank");
      setIsRedirecting(false);
      navigate("/demo-001");
    }, 1500);
  };

  if (cart.length === 0 && !isRedirecting) {
    return (
      <div className="container error-page">
        <h2>Your Cart is Empty</h2>
        <p>Please add products to your cart before proceeding to checkout.</p>
        <Link to="/demo-001" className="btn btn-primary">
          Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      {isRedirecting && (
        <div className="redirect-overlay">
          <div className="redirect-content">
            <div className="spinner"></div>
            <h2>Redirecting to WhatsApp...</h2>
            <p>We are opening WhatsApp with your order message auto-compiled.</p>
          </div>
        </div>
      )}

      <div className="container">
        <Link to="/demo-001/cart" className="back-link">
          <ArrowLeft size={16} /> Back to Cart
        </Link>
        
        <h1 className="page-title-elegant">Secure Checkout</h1>
        <div className="title-divider-left"></div>

        <div className="checkout-layout">
          {/* Checkout Form */}
          <div className="checkout-form-column">
            <form onSubmit={handlePlaceOrder} className="checkout-form">
              <h3>Shipping & Delivery Information</h3>
              
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={errors.fullName ? "error-input" : ""}
                  placeholder="e.g. Client Name"
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number (10 digits) *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? "error-input" : ""}
                    placeholder="e.g. 9876543210"
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address (Optional)</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "error-input" : ""}
                    placeholder="e.g. contact@example.com"
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Street Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={errors.address ? "error-input" : ""}
                  placeholder="e.g. Flat 104, Sunrise Heights, SV Road"
                  rows="3"
                ></textarea>
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="form-grid-three">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={errors.city ? "error-input" : ""}
                    placeholder="e.g. Mumbai"
                  />
                  {errors.city && <span className="error-text">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={errors.state ? "error-input" : ""}
                    placeholder="e.g. Maharashtra"
                  />
                  {errors.state && <span className="error-text">{errors.state}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code / PIN *</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className={errors.postalCode ? "error-input" : ""}
                    placeholder="e.g. 400001"
                  />
                  {errors.postalCode && <span className="error-text">{errors.postalCode}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Order Notes (Optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Notes about your order, e.g. special delivery instructions or ring sizes"
                  rows="3"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg btn-icon submit-checkout-btn">
                <MessageSquare size={18} /> Place Order via WhatsApp
              </button>
            </form>
          </div>

          {/* Cart Breakdown Panel */}
          <div className="checkout-summary-column">
            <div className="summary-card">
              <h3>Order Review</h3>
              <div className="summary-divider"></div>
              
              <div className="checkout-items-preview">
                {cart.map(item => (
                  <div key={item.id} className="checkout-preview-item">
                    <img src={item.images[0]} alt={item.name} />
                    <div className="item-meta">
                      <h4>{item.name}</h4>
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <span className="item-price">
                      {CONFIG.CURRENCY_SYMBOL}{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>{CONFIG.CURRENCY_SYMBOL}{subtotal.toLocaleString("en-IN")}</span>
              </div>
              
              <div className="summary-row">
                <span>Delivery Charges</span>
                <span className="text-success">FREE</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total-row">
                <span>Grand Total</span>
                <span>{CONFIG.CURRENCY_SYMBOL}{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="secure-badge">
                <ShieldCheck size={16} className="text-success" />
                <span>Zero Risk static demo review</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
