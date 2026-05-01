import React, { useState, useRef, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPopup.css";

type LoginProps = {
  onClose: () => void;
  onShowSignUp: () => void;
};

type Step = "welcome" | "email" | "password" | "setup";

/* ─── Inline Custom Dropdown ─── */
interface DropdownProps {
  name: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ name, value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? value;

  return (
    <div className="cdd-wrapper" ref={ref}>
      <div
        className={`cdd-trigger${open ? " cdd-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{selectedLabel}</span>
        <svg
          className={`cdd-chevron${open ? " cdd-chevron-open" : ""}`}
          viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      <div className={`cdd-panel${open ? " cdd-panel-open" : ""}`}>
        {options.map((opt) => (
          <div
            key={opt.value}
            className={`cdd-option${value === opt.value ? " cdd-selected" : ""}`}
            onClick={() => { onChange(opt.value); setOpen(false); }}
          >
            <span>{opt.label}</span>
            {value === opt.value && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="cdd-check"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const COUNTRY_OPTIONS = [
  { label: "+91 ", value: "+91" },
  { label: "+1 ", value: "+1" },
  { label: "+44 ", value: "+44" },
  { label: "+61 ", value: "+61" },
  { label: "+971 ", value: "+971" },
  { label: "+65 ", value: "+65" },
];

/* ─── Main Component ─── */
const Login: React.FC<LoginProps> = ({ onClose, onShowSignUp }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("welcome");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [error, setError] = useState("");

  const handleEmailContinue = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) { setError("Please enter your email"); return; }
    setError("");
    setStep("password");
  };

  const handlePasswordContinue = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password) { setError("Please enter your password"); return; }
    setError("");
    setStep("setup");
  };

  const handleSetup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !phone) { setError("All fields are required"); return; }
    setError("");
    navigate("/dashboard");
  };

  return (
    <div className="lp-backdrop" onClick={onClose}>
      <div className="lp-modal" onClick={(e) => e.stopPropagation()}>

        {/* ── Step: Welcome ── */}
        {step === "welcome" && (
          <>
            <button className="lp-close" onClick={onClose}>&times;</button>
            <h2 className="lp-title">Welcome !</h2>
            <p className="lp-subtitle">
              Continue with Google or Email, we'll create your free account if you're new.
            </p>

            <button className="lp-btn lp-btn--google">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <button className="lp-btn lp-btn--email" onClick={() => setStep("email")}>
              Continue with Email
            </button>
          </>
        )}

        {/* ── Step: Enter Email ── */}
        {step === "email" && (
          <>
            <button className="lp-back" onClick={() => setStep("welcome")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
            </button>
            <h2 className="lp-title">Continue with Email</h2>
            <p className="lp-subtitle">Enter your email to log in or create a free account.</p>

            {error && <div className="lp-error">{error}</div>}

            <form onSubmit={handleEmailContinue} className="lp-form">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                autoFocus
              />
              <button type="submit" className="lp-btn lp-btn--submit">Continue</button>
            </form>
          </>
        )}

        {/* ── Step: Enter Password ── */}
        {step === "password" && (
          <>
            <button className="lp-back" onClick={() => setStep("email")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
            </button>
            <h2 className="lp-title">Enter your password</h2>
            <p className="lp-subtitle">Welcome back! Enter the password for <strong>{email}</strong></p>

            {error && <div className="lp-error">{error}</div>}

            <form onSubmit={handlePasswordContinue} className="lp-form">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                autoFocus
              />
              <button type="submit" className="lp-btn lp-btn--submit">Continue</button>
            </form>

            <p className="lp-switch" onClick={onShowSignUp}>
              Don't have an account? <span>Sign up</span>
            </p>
          </>
        )}

        {/* ── Step: Finish Setup ── */}
        {step === "setup" && (
          <>
            <h2 className="lp-title">Finish setting up your account!</h2>
            <p className="lp-subtitle">
              Add your name &amp; phone so we can personalize your experience and keep you updated instantly.
            </p>

            {error && <div className="lp-error">{error}</div>}

            <form onSubmit={handleSetup} className="lp-form">
              <div className="lp-field-group">
                <label className="lp-label">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
              </div>

              <div className="lp-field-group">
                <label className="lp-label">Phone number</label>
                <div className="lp-phone-row">
                  <Dropdown
                    name="countryCode"
                    value={countryCode}
                    options={COUNTRY_OPTIONS}
                    onChange={setCountryCode}
                  />
                  <input
                    type="tel"
                    placeholder="Enter number"
                    value={phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                    className="lp-phone-input"
                  />
                </div>
              </div>

              <button type="submit" className="lp-btn lp-btn--submit">
                Save &amp; Continue
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};

export default Login;