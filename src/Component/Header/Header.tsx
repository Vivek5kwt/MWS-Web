import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Header/header.css";
import logo from "../../../public/Images/Logo.png";
import Login from "../../Component/Signup/LoginPopup"; // ✅ Import Login component

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Vision", href: "#vision" },
  { label: "Four Pillars", href: "#four-pillars" },
  { label: "AI Intelligence", href: "#ai-intelligence" },
];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false); // ✅ modal state

  const toggleNav = () => setIsOpen((prev) => !prev);
  const closeNav = () => setIsOpen(false);

  return (
    <div className="wealthscore-main">
      <div className="container-fluid px-0">
        <nav className="navbar navbar-expand-lg mws-navbar">
          <div className="container-fluid">
            {/* ── Brand ── */}
            <a className="navbar-brand" href="/">
              <img src={logo} alt="MyWealthScore" />
            </a>

            {/* ── Hamburger Toggler ── */}
            <button
              className="navbar-toggler"
              type="button"
              aria-controls="mwsNavbar"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
              onClick={toggleNav}
            >
              <span className="navbar-toggler-icon" />
            </button>

            {/* ── Collapsible Menu ── */}
            <div
              className={`collapse navbar-collapse${isOpen ? " show" : ""}`}
              id="mwsNavbar"
            >
              <ul className="navbar-nav mb-2 mb-lg-0">
                {navItems.map((item) => (
                  <li className="nav-item" key={item.label}>
                    <a className="nav-link" href={item.href} onClick={closeNav}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* ── CTA Button ── */}
              <div className="mws-cta-wrapper">
                <button
                  className="mws-btn-cta"
                  onClick={() => {
                    closeNav();
                    setShowLogin(true); // ✅ open modal instead of navigating
                  }}
                >
                  Begin Journey
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* ✅ Render Login modal conditionally */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onShowSignUp={() => {
            setShowLogin(false);
            navigate("/signup", { state: { backgroundLocation: location } });
          }}
        />
      )}
    </div>
  );
};

export default Header;