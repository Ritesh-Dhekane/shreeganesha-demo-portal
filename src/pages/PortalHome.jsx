import React from "react";
import demosData from "../data/demos.json";
import DemoCard from "../components/DemoCard";
import { CONFIG } from "../config/constants";
import { 
  Building2, 
  CalendarRange, 
  FileCheck2, 
  Info, 
  ArrowUpRight, 
  Sparkles,
  GitBranch
} from "lucide-react";

export default function PortalHome() {
  return (
    <div className="portal-dashboard">
      {/* Dashboard Top Banner */}
      <header className="portal-header">
        <div className="container header-flex">
          <div className="portal-brand">
            <Sparkles className="text-gold animate-pulse" size={28} />
            <div>
              <h1>{CONFIG.PROJECT_NAME}</h1>
              <p className="subtitle">Client Demo, Approvals & Design Repository</p>
            </div>
          </div>
          <span className="phase-badge">
            <GitBranch size={14} /> Active Phase: {CONFIG.CURRENT_PHASE.split(" - ")[0]}
          </span>
        </div>
      </header>

      <main className="container dashboard-main">
        {/* Client Meta Info Panel */}
        <section className="meta-section">
          <div className="dashboard-grid">
            <div className="meta-card">
              <div className="meta-icon-wrapper">
                <Building2 size={24} />
              </div>
              <div className="meta-content">
                <span className="meta-label">Client Partner</span>
                <span className="meta-value">{CONFIG.CLIENT_NAME}</span>
                <span className="meta-sub">{CONFIG.BUSINESS_TYPE}</span>
              </div>
            </div>

            <div className="meta-card">
              <div className="meta-icon-wrapper">
                <CalendarRange size={24} />
              </div>
              <div className="meta-content">
                <span className="meta-label">Key Schedule Milestones</span>
                <span className="meta-value">Initial: June 13, 2026</span>
                <span className="meta-sub">Created: {CONFIG.DEMO_CREATION_DATE}</span>
              </div>
            </div>

            <div className="meta-card">
              <div className="meta-icon-wrapper">
                <FileCheck2 size={24} />
              </div>
              <div className="meta-content">
                <span className="meta-label">Current Status</span>
                <span className="meta-value text-gold">Concept Review</span>
                <span className="meta-sub">Demo 001 - Under Review</span>
              </div>
            </div>
          </div>
        </section>

        {/* Info Callout */}
        <div className="info-callout">
          <Info size={20} className="text-gold" />
          <p>
            This portal hosts working prototypes, design validations, and interactive components. 
            All reviews, approvals, and decisions are archived inside this repository's folders to serve 
            as the single source of truth.
          </p>
        </div>

        {/* Demos Section */}
        <section className="demos-section">
          <h2 className="section-title">Available Demo Versions</h2>
          <div className="demos-grid">
            {demosData.map((demo) => (
              <DemoCard key={demo.id} demo={demo} />
            ))}
          </div>
        </section>

        {/* Directory Structure Helper */}
        <section className="repo-map-section">
          <h2 className="section-title">Portal Artifact Repository Map</h2>
          <div className="repo-map-card">
            <p className="repo-map-desc">
              This project maintains clean isolation between client-visible demo code, design decisions, and approvals tracking:
            </p>
            <div className="folder-links-grid">
              <div className="folder-info">
                <h5>📁 approvals/</h5>
                <p>Stores formalized client approvals, checklists, and sign-offs.</p>
              </div>
              <div className="folder-info">
                <h5>📁 decisions/</h5>
                <p>Architecture Decision Records (ADRs) tracking design and dev pathing.</p>
              </div>
              <div className="folder-info">
                <h5>📁 production/</h5>
                <p>Tracks tags and releases promoted to production repositories.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="portal-footer">
        <div className="container footer-content">
          <p>Shree Ganesha Client Repository &bull; Internal Demo Environment</p>
          <p className="footer-links">
            <span className="dot-sep">&bull;</span>
            Vite + React Static App
          </p>
        </div>
      </footer>
    </div>
  );
}
