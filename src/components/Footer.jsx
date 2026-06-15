import React from "react";
import { Sparkles, Phone, Mail, MapPin, Heart } from "lucide-react";
import { CONFIG } from "../config/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="store-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <Sparkles size={20} className="text-gold" />
            <h3>SHREE GANESHA</h3>
          </div>
          <p className="footer-tagline">
            Bringing you the finest selection of gold-plated, kundan, temple, and CZ jewellery. 
            Crafted with passion, designed for elegance.
          </p>
        </div>

        <div className="footer-hours">
          <h4>Store Hours</h4>
          <ul>
            <li>Monday - Saturday: 10:30 AM - 8:30 PM</li>
            <li>Sunday: 11:30 AM - 6:00 PM</li>
            <li>Festive Season: Open Everyday</li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Get in Touch</h4>
          <ul>
            <li>
              <Phone size={16} className="text-gold" />
              <span>+91 XXXXXXXXXX</span>
            </li>
            <li>
              <Mail size={16} className="text-gold" />
              <span>contact@example.com</span>
            </li>
            <li>
              <MapPin size={16} className="text-gold" />
              <span>123 Business Street, City Name, State Name</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-flex">
          <p>&copy; {currentYear} Shree Ganesha Jewellery. All Rights Reserved.</p>
          <p className="credit-text">
            Designed for Client Review with <Heart size={12} className="text-gold fill-gold" />
          </p>
        </div>
      </div>
    </footer>
  );
}
