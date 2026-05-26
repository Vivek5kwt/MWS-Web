import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

import "../Header/header.css";
import logo from "../../../public/Images/Logo.png";
import Login from "../../Component/Signup/LoginPopup";
import SignUpPopup from "../../Component/Signup/Signuppopup";

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
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activePopup, setActivePopup] = useState<"login" | "signup" | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleNav = () => setIsOpen((prev) => !prev);
  const closeNav = () => setIsOpen(false);

  // 🔥 Redux user
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user) return;
    const timer = setTimeout(() => setActivePopup("login"), 5000);
    return () => clearTimeout(timer);
  }, [user]);

  const initial = user?.name?.charAt(0)?.toUpperCase();

  const handleLogout = () => {
    dispatch(logout());
    setOpenDropdown(false);
    navigate("/");
  };

  return (
    <div className="wealthscore-main">
      <div className="container-fluid px-0">
        <nav className="navbar navbar-expand-lg mws-navbar">
          <div className="container-fluid">

            {/* ── Brand ── */}
            <a className="navbar-brand" href="/">
              <img src={logo} alt="MyWealthScore" />
            </a>

            {/* ── Hamburger ── */}
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

            {/* ── Menu ── */}
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

              {/* ── CTA / USER SECTION ── */}
              <div className="mws-cta-wrapper" style={{ position: "relative" }}>

                {/* ✅ LOGGED IN */}
{user ? (
  <div className="mws-user-wrapper">

    <div className="mws-btn-cta-login">
      <span className="mws-user-initial">{initial}</span>

      
    </div>
    
    <span
  className="mws-dropdown-arrow"
  onClick={() => setOpenDropdown((prev) => !prev)}
  style={{ marginLeft: "6px", cursor:"pointer" }}
>
  <svg
    className={`arrow-icon ${openDropdown ? "open" : ""}`}
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
</span>

    {openDropdown && (
      <div className="mws-user-dropdown mt-1 logout-dropdown">
        <button onClick={handleLogout} className="p-2 logout-btn">
          Logout
        </button>
      </div>
    )}

  </div>
) : (
  /* ❌ NOT LOGGED IN */
  <button
    className="mws-btn-cta"
    onClick={() => {
      closeNav();
      setActivePopup("signup");
    }}
  >
    Begin Journey
  </button>
)}

              </div>
            </div>

          </div>
        </nav>
      </div>

      {/* ── Login Popup ── */}
      {activePopup === "login" && (
        <Login
          onClose={() => setActivePopup(null)}
          onShowSignUp={() => setActivePopup("signup")}
        />
      )}

      {/* ── Signup Popup ── */}
      {activePopup === "signup" && (
        <SignUpPopup
          onClose={() => setActivePopup(null)}
          onShowLogin={() => setActivePopup("login")}
        />
      )}
    </div>
  );
};

export default Header;