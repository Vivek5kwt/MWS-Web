import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./footer.css";

// ── SVG Icons ────────────────────────────────────────────────────────────────

const InstagramIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon fill="#111" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const XIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.25 2.25h6.846l4.263 5.637 5.885-5.637Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const EmailIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.2 6.2l.88-.88a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LocationIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// ── Types ─────────────────────────────────────────────────────────────────────

interface QuickLink {
  label: string;
  href: string;
}

interface FinancialTool {
  label: string;
  href: string;
}

interface ContactItem {
  icon: React.ReactNode;
  text: string;
  href?: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const quickLinks: QuickLink[] = [
  { label: "About Us", href: "#" },
  { label: "How It Works", href: "#" },
  { label: "Security", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms and conditions", href: "#" },
  { label: "Blog", href: "#" },
];

const financialTools: FinancialTool[] = [
  { label: "Tax Calculator", href: "#" },
  { label: "SIP Calculator", href: "#" },
  { label: "EMI Calculator", href: "#" },
  { label: "Insurance Calculator", href: "#" },
];

const contactItems: ContactItem[] = [
  {
    icon: <EmailIcon />,
    text: "support@mywealthscore.ai",
    href: "mailto:support@mywealthscore.ai",
  },
  {
    icon: <PhoneIcon />,
    text: "+91-XXXXX-XXXXX",
    href: "tel:+91XXXXXXXXXX",
  },
  {
    icon: <LocationIcon />,
    text: "Mumbai, Maharashtra India",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

const Footer: React.FC = () => {
  const [policyOpen, setPolicyOpen] = useState(false);
  const [policyContent, setPolicyContent] = useState("");
  const [policyLoading, setPolicyLoading] = useState(false);

  const [termsOpen, setTermsOpen] = useState(false);
  const [termsContent, setTermsContent] = useState("");
  const [termsLoading, setTermsLoading] = useState(false);

  const handleTermsClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setTermsOpen(true);
    if (termsContent) return;
    setTermsLoading(true);
    try {
      const res = await axios.get("https://admin.mywealthscore.ai/api/terms-and-conditions");
      const data = res.data;
      const items: any[] = Array.isArray(data?.data) ? data.data : [];
      const extracted = items
        .map((item: any) => item?.content || item?.text || item?.body || item?.description || item?.policy || "")
        .filter(Boolean)
        .join("\n\n");
      setTermsContent(extracted || "No terms content available.");
    } catch {
      setTermsContent("Failed to load Terms and Conditions. Please try again later.");
    } finally {
      setTermsLoading(false);
    }
  };

  const handlePolicyClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setPolicyOpen(true);
    if (policyContent) return;
    setPolicyLoading(true);
    try {
      const res = await axios.get("https://admin.mywealthscore.ai/api/policy");
      const data = res.data;
      const items: any[] = Array.isArray(data?.data) ? data.data : [];
      const extracted = items
        .map((item: any) => item?.content || item?.text || item?.body || item?.description || item?.policy || "")
        .filter(Boolean)
        .join("\n\n");
      setPolicyContent(extracted || "No policy content available.");
    } catch {
      setPolicyContent("Failed to load Privacy Policy. Please try again later.");
    } finally {
      setPolicyLoading(false);
    }
  };

  return (
    <footer className="custom-footer">
      <div className="container">
        <div className="row">

          {/* Brand Column */}
          <div className="col-12 col-md-4 col-lg-3 footer-col">
            <div className="logo mb-2">
              MyWealthScore<span className="dot-ai">.ai</span>
            </div>
            <p className="tagline">
              Making Financial Planning
              <br />
              Accessible to Every Indian
            </p>
            <ul className="credentials">
              <li>RBI Guidelines Compliant</li>
              <li>ISO 27001 Certified</li>
              <li>Featured in Economic Times</li>
            </ul>
            <div className="social-icons">
              <a href="#" className="social-icon-btn" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" className="social-icon-btn" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="#" className="social-icon-btn" aria-label="YouTube">
                <YoutubeIcon />
              </a>
              <a href="#" className="social-icon-btn" aria-label="X (Twitter)">
                <XIcon />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="col-12 col-sm-6 col-md-2 col-lg-3 footer-col">
            <h6 className="column-title">Quick Links</h6>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.label === "Privacy Policy" ? (
                    <a href="#" onClick={handlePolicyClick}>{link.label}</a>
                  ) : link.label === "Terms and conditions" ? (
                    <a href="#" onClick={handleTermsClick}>{link.label}</a>
                  ) : (
                    <a href={link.href}>{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Financial Tools Column */}
          <div className="col-12 col-sm-6 col-md-3 col-lg-3 footer-col">
            <h6 className="column-title">Financial Tools</h6>
            <ul className="footer-links">
              {financialTools.map((tool) => (
                <li key={tool.label}>
                  <a href={tool.href}>{tool.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-12 col-sm-6 col-md-3 col-lg-3 footer-col">
            <h6 className="column-title">Contact</h6>
            <ul className="footer-links">
              {contactItems.map((item) => (
                <li key={item.text}>
                  <span className="link-icon">{item.icon}</span>
                  {item.href ? (
                    <a href={item.href}>{item.text}</a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="row">
            <div className="col-12 text-center">
              <p>Copyright © 2025 MyWealthScore.ai. All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
      {termsOpen && (
        <div className="policy-backdrop" onClick={() => setTermsOpen(false)}>
          <div className="policy-modal" onClick={(e) => e.stopPropagation()}>
            <div className="policy-header">
              <h2>Terms and Conditions</h2>
              <button className="policy-close" onClick={() => setTermsOpen(false)}>&times;</button>
            </div>
            <div className="policy-body">
              {termsLoading ? (
                <p className="policy-loading">Loading...</p>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: termsContent }} />
              )}
            </div>
          </div>
        </div>
      )}

      {policyOpen && (
        <div className="policy-backdrop" onClick={() => setPolicyOpen(false)}>
          <div className="policy-modal" onClick={(e) => e.stopPropagation()}>
            <div className="policy-header">
              <h2>Privacy Policy</h2>
              <button className="policy-close" onClick={() => setPolicyOpen(false)}>&times;</button>
            </div>
            <div className="policy-body">
              {policyLoading ? (
                <p className="policy-loading">Loading...</p>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: policyContent }} />
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
