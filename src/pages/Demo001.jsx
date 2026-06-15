import React, { useState, useRef } from "react";
import productsData from "../data/products.json";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { Sparkles, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Demo001({ onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const productsSectionRef = useRef(null);

  const categories = ["All", "Necklaces", "Earrings", "Bangles", "Rings"];

  // Filter products for the Browse section
  const filteredProducts = selectedCategory === "All"
    ? productsData
    : productsData.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  // Filter for spotlight sections
  const newArrivals = productsData.filter(p => p.tags?.includes("new-arrival"));
  const bestSellers = productsData.filter(p => p.tags?.includes("best-seller"));

  const scrollToProducts = () => {
    productsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="store-home">
      {/* Premium Hero Banner */}
      <Hero onExploreClick={scrollToProducts} />

      {/* Featured Spotlight Grid */}
      <section className="store-section section-bg-light" id="featured-spotlight">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Curated Masterpieces</span>
            <h2 className="section-title-elegant">Featured Creations</h2>
            <div className="title-divider"></div>
          </div>
          
          <div className="products-grid">
            {productsData.filter(p => p.tags?.includes("featured")).slice(0, 4).map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Browse Collection Section */}
      <section className="store-section" id="products" ref={productsSectionRef}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Exquisite Artistry</span>
            <h2 className="section-title-elegant">Browse Our Collection</h2>
            <div className="title-divider"></div>
          </div>

          {/* Category Tabs */}
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category}
                className={`category-tab-btn ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Dynamic Products Grid */}
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Grid: New Arrivals & Best Sellers side-by-side */}
      <section className="store-section section-bg-light" id="spotlight">
        <div className="container spotlight-container">
          {/* New Arrivals Column */}
          <div className="spotlight-col">
            <div className="section-header">
              <span className="section-subtitle">Freshly Crafted</span>
              <h3 className="section-title-elegant-sm">New Arrivals</h3>
              <div className="title-divider-left"></div>
            </div>
            <div className="mini-products-list">
              {newArrivals.slice(0, 3).map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={onAddToCart} 
                />
              ))}
            </div>
          </div>

          {/* Best Sellers Column */}
          <div className="spotlight-col">
            <div className="section-header">
              <span className="section-subtitle">Customer Favorites</span>
              <h3 className="section-title-elegant-sm">Best Sellers</h3>
              <div className="title-divider-left"></div>
            </div>
            <div className="mini-products-list">
              {bestSellers.slice(0, 3).map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={onAddToCart} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="store-section about-store-section" id="about">
        <div className="container about-grid">
          <div className="about-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80" 
              alt="Handcrafted jewellery heritage" 
              className="about-image"
            />
            <div className="about-badge">
              <Sparkles size={24} className="text-gold" />
              <span>Est. 2005</span>
            </div>
          </div>
          <div className="about-text-content">
            <span className="section-subtitle text-gold">Our Legacy</span>
            <h2 className="section-title-elegant text-white">About Shree Ganesha</h2>
            <div className="title-divider-left"></div>
            <p>
              At Shree Ganesha, we believe jewellery is more than an accessory—it is an extension of 
              one's heritage and grace. We specialize in premium-quality imitation jewellery, featuring 
              masterpieces in Kundan, Temple carving, American Diamond CZ, and hand-painted Meenakari.
            </p>
            <p>
              Every single piece in our collection is curated with the utmost care, utilizing brass 
              bases and double gold-plated finishes to ensure anti-tarnish durability and an identical look 
              to fine gold ornaments. Experience premium bridal jewellery elegance at everyday pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="store-section contact-store-section" id="contact">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Reach Out</span>
            <h2 className="section-title-elegant">Contact Our Store</h2>
            <div className="title-divider"></div>
          </div>

          <div className="contact-grid">
            <div className="contact-info-card">
              <MapPin size={24} className="text-gold" />
              <h3>Visit Us</h3>
              <p>123 Business Street, City Name, State Name</p>
            </div>
            
            <div className="contact-info-card">
              <Phone size={24} className="text-gold" />
              <h3>Call / WhatsApp</h3>
              <p>+91 XXXXXXXXXX</p>
            </div>

            <div className="contact-info-card">
              <Mail size={24} className="text-gold" />
              <h3>Email Inquiries</h3>
              <p>contact@example.com</p>
            </div>

            <div className="contact-info-card">
              <Clock size={24} className="text-gold" />
              <h3>Business Hours</h3>
              <p>Mon - Sat: 10:30 AM - 8:30 PM <br /> Sun: 11:30 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
