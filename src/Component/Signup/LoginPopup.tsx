import React, { useState, useRef, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import "./LoginPopup.css";
import toast from "react-hot-toast";

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

  // 🔥 Redux
  const dispatch = useDispatch();
  const { loading, error: reduxError, token } = useSelector((state: any) => state.auth);

  const [step, setStep] = useState<Step>("welcome");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [error, setError] = useState("");

  // ✅ Redirect after login
  useEffect(() => {
    if (token) {
      onClose();
      navigate("/");
    }
  }, [token, navigate, onClose]);

  const handleEmailContinue = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) { setError("Please enter your email"); return; }
    setError("");
    setStep("password");
  };

  // 🔥 UPDATED: LOGIN WITH REDUX HERE
  const handlePasswordContinue = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError("");

    const result = await dispatch(loginUser({ email, password }) as any);

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Login Successfully");
      setStep("setup"); // or skip if not needed
    } else {
      setError(result.payload?.message || "Login failed");
    }
  };

  const handleSetup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !phone) { setError("All fields are required"); return; }
    setError("");
    onClose();
    navigate("/");
  };

  return (
    <div className="lp-backdrop" onClick={onClose}>
      <div className="lp-modal" onClick={(e) => e.stopPropagation()}>

        {step === "welcome" && (
          <>
            <button className="lp-close" onClick={onClose}>&times;</button>
            <h2 className="lp-title">Welcome !</h2>
            <p className="lp-subtitle">
              Continue with Google or Email, we'll create your free account if you're new.
            </p>

            <button className="lp-btn lp-btn--google">
              Continue with Google
            </button>

            <button className="lp-btn lp-btn--email" onClick={() => setStep("email")}>
              Continue with Email
            </button>
          </>
        )}

        {step === "email" && (
          <>
            <button className="lp-back" onClick={() => setStep("welcome")}>Back</button>
            <h2 className="lp-title">Continue with Email</h2>

            {(error || reduxError) && <div className="lp-error">{error || reduxError}</div>}

            <form onSubmit={handleEmailContinue} className="lp-form">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="lp-btn lp-btn--submit">Continue</button>
            </form>
          </>
        )}

        {step === "password" && (
          <>
            <button className="lp-back" onClick={() => setStep("email")}>Back</button>
            <h2 className="lp-title">Enter your password</h2>

            {(error || reduxError) && <div className="lp-error">{error || reduxError}</div>}

            <form onSubmit={handlePasswordContinue} className="lp-form">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit" className="lp-btn lp-btn--submit" disabled={loading}>
                {loading ? "Logging in..." : "Continue"}
              </button>
            </form>
          </>
        )}

        {step === "setup" && (
          <>
            <h2 className="lp-title">Finish setting up your account!</h2>

            {(error || reduxError) && <div className="lp-error">{error || reduxError}</div>}

            <form onSubmit={handleSetup} className="lp-form">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

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
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <button type="submit" className="lp-btn lp-btn--submit">
                Save & Continue
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};

export default Login;