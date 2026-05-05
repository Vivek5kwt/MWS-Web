import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Header/header.css";
import logo from "../../../public/Images/Logo.png";
import Login from "../../Component/Signup/LoginPopup";
import SignUpPopup from "../../Component/Signup/Signuppopup"; // ✅ import SignUp

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activePopup, setActivePopup] = useState<"login" | "signup" | null>(null); // ✅ single state controls both

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
                    setActivePopup("signup"); // ✅ open login popup
                  }}
                >
                  Begin Journey
                </button>
              </div>
            </div>

          </div>
        </nav>
      </div>

      {/* ✅ Login Popup */}
      {activePopup === "login" && ( 
        <Login
          onClose={() => setActivePopup(null)}
          onShowSignUp={() => setActivePopup("signup")} // ✅ switch to signup
        />
      )}

      {/* ✅ SignUp Popup */}
      {activePopup === "signup" && (
        <SignUpPopup
          onClose={() => setActivePopup(null)}
          onShowLogin={() => setActivePopup("login")} // ✅ switch back to login
        />
      )}

    </div>
  );
};

export default Header;