import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { CONFIG } from "../config/constants";

export default function Cart({ cart, onUpdateQuantity, onRemove }) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  if (cart.length === 0) {
    return (
      <div className="container empty-cart-container">
        <div className="empty-cart-content">
          <div className="empty-cart-icon">
            <ShoppingBag size={48} className="text-gold" />
          </div>
          <h2>Your Shopping Cart is Empty</h2>
          <p>Explore our royal collection to add handcrafted necklaces, rings, and bangles.</p>
          <Link to="/demo-001" className="btn btn-primary btn-lg">
            Browse Jewellery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title-elegant">Shopping Cart</h1>
        <div className="title-divider-left"></div>

        <div className="cart-layout">
          {/* Items List */}
          <div className="cart-items-column">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div className="cart-item-image-wrapper">
                  <img src={item.images[0]} alt={item.name} />
                </div>
                
                <div className="cart-item-details">
                  <span className="cart-item-category">{item.category}</span>
                  <h3>{item.name}</h3>
                  <span className="cart-item-unit-price">
                    Unit Price: {CONFIG.CURRENCY_SYMBOL}{item.price.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="cart-item-quantity">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="qty-btn"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="qty-btn"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="cart-item-total">
                  <span>
                    {CONFIG.CURRENCY_SYMBOL}{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="cart-item-remove">
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="remove-btn"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary-column">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="summary-divider"></div>
              
              <div className="summary-row">
                <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
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

              <div className="summary-actions">
                <Link to="/demo-001/checkout" className="btn btn-primary btn-block btn-lg btn-icon">
                  Proceed to Checkout <ArrowRight size={18} />
                </Link>
                <Link to="/demo-001" className="continue-shopping-link">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
