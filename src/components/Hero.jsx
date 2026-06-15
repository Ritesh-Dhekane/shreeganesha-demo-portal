import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero({ onExploreClick }) {
  return (
    <div className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content container">
        <div className="hero-badge">
          <Sparkles size={14} className="text-gold" />
          <span>Shree Ganesha Imitation Collection</span>
        </div>
        <h1 className="hero-title">
          Timeless Elegance <br />
          <span className="text-gold">Everyday Luxury</span>
        </h1>
        <p className="hero-subtitle">
          Discover handcrafted, gold-plated imitation jewellery designed to capture 
          the brilliance of royal heritage. Perfect for brides, festivals, and modern celebrations.
        </p>
        <div className="hero-actions">
          <button onClick={onExploreClick} className="btn btn-primary btn-lg">
            Shop Collection <ArrowRight size={18} />
          </button>
          <a href="#about" className="btn btn-outline btn-lg">
            Our Heritage
          </a>
        </div>
      </div>
    </div>
  );
}
