import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";
import { CONFIG } from "../config/constants";

export default function ProductCard({ product, onAddToCart }) {
  // Safe truncation for description
  const shortDescription = product.description.length > 80
    ? `${product.description.substring(0, 80)}...`
    : product.description;

  const isBestSeller = product.tags?.includes("best-seller");
  const isNewArrival = product.tags?.includes("new-arrival");

  return (
    <div className="product-card">
      <div className="product-image-container">
        {isBestSeller && <span className="product-tag tag-bestseller">Best Seller</span>}
        {isNewArrival && <span className="product-tag tag-new">New</span>}
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="product-image"
          loading="lazy"
        />
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{shortDescription}</p>
        
        <div className="product-price-row">
          <span className="product-price">
            {CONFIG.CURRENCY_SYMBOL}{product.price.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <div className="product-actions">
        <Link 
          to={`/demo-001/product/${product.id}`} 
          className="btn btn-secondary btn-sm"
          title="View Details"
        >
          <Eye size={15} /> Details
        </Link>
        <button 
          onClick={() => onAddToCart(product)} 
          className="btn btn-primary btn-sm btn-icon"
        >
          <ShoppingCart size={15} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
