import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./Signuppopup.css";


type Props = {
  onClose: () => void;
  onShowLogin: () => void;
};

type Step = "welcome" | "email" | "details";

const SignUpPopup: React.FC<Props> = ({ onClose, onShowLogin }) => {
  const [step, setStep] = useState<Step>("welcome");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Email Step
  const handleEmailContinue = (e: FormEvent) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email");
      return;
    }

    setError("");
    setStep("details");
  };

  // ✅ Signup
  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !phone_number || !password) {
      setError("All fields required");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone_number)) {
      setError("Enter valid 10-digit phone number");
      return;
    }

    setLoading(true);

    const toastId = toast.loading("Creating account...");

   try {
  await axios.post(`/auth-api/api/register`, {
    email,
    name,
    phone_number,
    password,
  });

  // Try auto login
  // const result = await dispatch((loginUser as any)({ email, password }));

  // if (result.meta.requestStatus === "fulfilled") {
  //   toast.success("Account created & logged in successfully!", {
  //     id: toastId,
  //   });

  //   onClose();
  // } else {
  //   toast.success("Account created successfully!", {
  //     id: toastId,
  //   });

  //   toast.error("Please log in manually.");
  // }
  toast.success("Account created successfully!", {
  id: toastId,
});

onClose();
onShowLogin();

} catch (err: any) {
  const message =
    err?.response?.data?.message || "Signup failed";

  setError(message);

  toast.error(message, { id: toastId });
}finally {
      setLoading(false);
    }
  };

  return (
    <div className="lp-backdrop" onClick={onClose}>
      <div className="lp-modal" onClick={(e) => e.stopPropagation()}>

        {/* ── Step: Welcome ── */}
        {step === "welcome" && (
          <>
            <button className="lp-close" onClick={onClose}>&times;</button>

            <h2 className="lp-title">Create Account</h2>
            <p className="lp-subtitle">
              Sign up with Google or Email to get started for free.
            </p>

            <button className="lp-btn lp-btn--google">
              Continue with Google
            </button>

            <button
              className="lp-btn lp-btn--email"
              onClick={() => setStep("email")}
            >
              Continue with Email
            </button>

            <p className="lp-switch" onClick={onShowLogin}>
              Already have an account? <span>Log in</span>
            </p>
          </>
        )}

        {/* ── Step: Email ── */}
        {step === "email" && (
          <>
            <button
              className="lp-back"
              onClick={() => setStep("welcome")}
            >
              ←
            </button>

            <h2 className="lp-title">Your Email</h2>
            <p className="lp-subtitle">
              We'll use this to create your account.
            </p>

            {error && <div className="lp-error">{error}</div>}

            <form onSubmit={handleEmailContinue} className="lp-form">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                autoFocus
              />

              <button type="submit" className="lp-btn lp-btn--submit">
                Continue
              </button>
            </form>
          </>
        )}

        {/* ── Step: Details ── */}
        {step === "details" && (
          <>
            <button
              className="lp-back"
              onClick={() => setStep("email")}
            >
              ←
            </button>

            <h2 className="lp-title">Finish Setup</h2>
            <p className="lp-subtitle">
              Almost there! Just a few more details.
            </p>

            {error && <div className="lp-error">{error}</div>}

            <form onSubmit={handleSignup} className="lp-form">
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                  setError("");
                }}
              />

              <input
                type="tel"
                placeholder="Phone number"
                value={phone_number}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPhone_number(e.target.value);
                  setError("");
                }}
              />

              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />

              <button
                type="submit"
                className="lp-btn lp-btn--submit"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};

export default SignUpPopup;