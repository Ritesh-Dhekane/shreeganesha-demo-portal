import React from "react";
import { Link } from "react-router-dom";
import { Calendar, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

export default function DemoCard({ demo }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "under-review":
        return (
          <span className="status-badge status-review">
            <AlertCircle size={14} /> Under Review
          </span>
        );
      case "approved":
        return (
          <span className="status-badge status-approved">
            <CheckCircle2 size={14} /> Approved
          </span>
        );
      default:
        return (
          <span className="status-badge status-draft">
            <Calendar size={14} /> Draft
          </span>
        );
    }
  };

  return (
    <div className="demo-card">
      <div className="demo-card-header">
        <h3 className="demo-card-title">{demo.title}</h3>
        {getStatusBadge(demo.status)}
      </div>

      <div className="demo-card-meta">
        <Calendar size={16} />
        <span>Created: {demo.createdAt}</span>
      </div>

      <div className="demo-card-features">
        <h4>Key Scope & Features Included:</h4>
        <ul>
          {demo.features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="demo-card-footer">
        <Link to={`/${demo.id}`} className="btn btn-primary demo-card-btn">
          Launch Concept Demo <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
