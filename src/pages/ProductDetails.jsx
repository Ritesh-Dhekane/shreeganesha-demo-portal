import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";
import { CONFIG } from "../config/constants";
import { 
  ArrowLeft, 
  ShoppingCart, 
  CreditCard, 
  CheckCircle, 
  Truck, 
  ShieldCheck, 
  RotateCcw 
} from "lucide-react";

export default function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the product
  const product = productsData.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container error-page">
        <h2>Product Not Found</h2>
        <p>The jewellery item you are looking for does not exist or has been removed.</p>
        <Link to="/demo-001" className="btn btn-primary">
          <ArrowLeft size={16} /> Back to Store Home
        </Link>
      </div>
    );
  }

  // Find related products in the same category (excluding current)
  const relatedProducts = productsData
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleBuyNow = () => {
    onAddToCart(product, 1);
    navigate("/demo-001/checkout");
  };

  return (
    <div className="product-details-page">
      <div className="container">
        {/* Back Link */}
        <Link to="/demo-001" className="back-link">
          <ArrowLeft size={16} /> Back to Collection
        </Link>

        {/* Core Product Info */}
        <div className="product-detail-grid">
          {/* Product Gallery */}
          <div className="product-gallery">
            <div className="main-image-wrapper">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="details-main-image"
              />
            </div>
          </div>

          {/* Product Content Details */}
          <div className="product-details-content">
            <span className="details-category">{product.category}</span>
            <h1 className="details-name">{product.name}</h1>
            
            <div className="details-price-row">
              <span className="details-price">
                {CONFIG.CURRENCY_SYMBOL}{product.price.toLocaleString("en-IN")}
              </span>
              <span className="details-tax-info">Inclusive of all taxes</span>
            </div>

            <p className="details-desc">{product.description}</p>

            <div className="details-cta-group">
              <button 
                onClick={() => onAddToCart(product, 1)} 
                className="btn btn-outline btn-lg btn-icon"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
              
              <button 
                onClick={handleBuyNow} 
                className="btn btn-primary btn-lg btn-icon"
              >
                <CreditCard size={18} /> Buy Now
              </button>
            </div>

            {/* Quality Check Policies */}
            <div className="policy-list">
              <div className="policy-item">
                <Truck size={20} className="text-gold" />
                <div>
                  <strong>Free Premium Delivery</strong>
                  <p>Secured packing, insured dispatch nationwide.</p>
                </div>
              </div>
              <div className="policy-item">
                <ShieldCheck size={20} className="text-gold" />
                <div>
                  <strong>Double Gold Plated Finish</strong>
                  <p>Anti-tarnish alloy base, hypoallergenic skin safe materials.</p>
                </div>
              </div>
              <div className="policy-item">
                <RotateCcw size={20} className="text-gold" />
                <div>
                  <strong>Easy Exchange</strong>
                  <p>7-day replacement for damage or size adjustments.</p>
                </div>
              </div>
            </div>

            {/* Features Bullet List */}
            <div className="details-features">
              <h3>Design Specifications</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>
                    <CheckCircle size={14} className="text-gold" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <div className="section-header">
              <span className="section-subtitle">Complete The Look</span>
              <h2 className="section-title-elegant-sm">Related Creations</h2>
              <div className="title-divider-left"></div>
            </div>
            
            <div className="products-grid">
              {relatedProducts.map(relProduct => (
                <ProductCard 
                  key={relProduct.id} 
                  product={relProduct} 
                  onAddToCart={onAddToCart} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
