import React, { useState } from "react";
import type { ChangeEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { googleLoginUser, loginUser } from "../../redux/authSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import "./Signuppopup.css";

type Props = {
  onClose: () => void;
  onShowLogin: () => void;
};

type Step = "welcome" | "email" | "details" | "phone-otp" | "email-otp";

const SignUpPopup: React.FC<Props> = ({ onClose, onShowLogin }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState<Step>("welcome");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [registrationId, setRegistrationId] = useState<string | number>("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const res = await dispatch((googleLoginUser as any)(idToken));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Account created & logged in successfully!");
        onClose();
      } else {
        setError(res.payload?.message || "Google sign-up failed");
      }
    } catch (err: any) {
      console.error("Google sign-up error:", err.code, err.message);
      if (err.code === "auth/popup-closed-by-user" || err.code === "auth/cancelled-popup-request") {
        setError("");
      } else {
        setError(err.message || "Google sign-up failed");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleEmailContinue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email");
      return;
    }
    setError("");
    setStep("details");
  };

  // Step 1: Send phone OTP
  const handleSendPhoneOtp = async (e: React.FormEvent<HTMLFormElement>) => {
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
    const toastId = toast.loading("Sending OTP...");
    try {
      const otpRes = await axios.post("https://admin.mywealthscore.ai/api/send-otp", {
        phone_number: `+91${phone_number}`,
        otp_type: "phone",
      });
      console.log("send-otp response:", otpRes.data);
      toast.success("OTP sent to your phone!", { id: toastId });
      setError("");
      setStep("phone-otp");
    } catch (err: any) {
      console.error("send-otp error:", err?.response?.data);
      const message = err?.response?.data?.message || err?.response?.data?.error || "Failed to send OTP";
      setError(message);
      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify phone OTP → then send email OTP
  const handleVerifyPhoneOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phoneOtp) {
      setError("Please enter the OTP");
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Verifying phone OTP...");
    try {
      const verifyRes = await axios.post("https://admin.mywealthscore.ai/api/verify-otp", {
        phone_number: `+91${phone_number}`,
        otp: phoneOtp,
        device_token: "web",
      });

      const id =
        verifyRes.data?.id ||
        verifyRes.data?.data?.id ||
        verifyRes.data?.user?.id ||
        verifyRes.data?.data?.user?.id ||
        "";

      setRegistrationId(id);

      // Now send email OTP
      toast.loading("Sending email OTP...", { id: toastId });
      await axios.post("https://admin.mywealthscore.ai/api/send-email", {
        id,
        email,
      });

      toast.success("OTP sent to your email!", { id: toastId });
      setError("");
      setStep("email-otp");
    } catch (err: any) {
      const message = err?.response?.data?.message || "Verification failed";
      setError(message);
      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Verify email OTP → then register
  const handleVerifyEmailOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailOtp) {
      setError("Please enter the OTP");
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Verifying email OTP...");
    try {
      await axios.post("https://admin.mywealthscore.ai/api/verify-email", {
        id: registrationId,
        otp: emailOtp,
      });

      // Account was already created by verify-otp — just auto-login
      const loginRes = await dispatch((loginUser as any)({ email, password }));
      if (loginRes.meta.requestStatus === "fulfilled") {
        toast.success("Account created & logged in!", { id: toastId });
        onClose();
      } else {
        toast.success("Account created! Please log in.", { id: toastId });
        onClose();
        onShowLogin();
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || "Verification failed";
      setError(message);
      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleResendPhoneOtp = async () => {
    const toastId = toast.loading("Resending OTP...");
    try {
      await axios.post("https://admin.mywealthscore.ai/api/send-otp", {
        phone_number: `+91${phone_number}`,
        otp_type: "phone",
      });
      toast.success("OTP resent!", { id: toastId });
      setPhoneOtp("");
      setError("");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to resend OTP", { id: toastId });
    }
  };

  const handleResendEmailOtp = async () => {
    const toastId = toast.loading("Resending email OTP...");
    try {
      await axios.post("https://admin.mywealthscore.ai/api/send-email", {
        id: registrationId,
        email,
      });
      toast.success("Email OTP resent!", { id: toastId });
      setEmailOtp("");
      setError("");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to resend email OTP", { id: toastId });
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
            <p className="lp-subtitle">Sign up with Google or Email to get started for free.</p>

            {error && <div className="lp-error">{error}</div>}

            <button className="lp-btn lp-btn--google" onClick={handleGoogleSignUp} disabled={googleLoading}>
              {googleLoading ? "Signing in..." : "Continue with Google"}
            </button>
            <button className="lp-btn lp-btn--email" onClick={() => setStep("email")}>
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
            <button className="lp-back" onClick={() => setStep("welcome")}>←</button>
            <h2 className="lp-title">Your Email</h2>
            <p className="lp-subtitle">We'll use this to create your account.</p>

            {error && <div className="lp-error">{error}</div>}

            <form onSubmit={handleEmailContinue} className="lp-form">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); setError(""); }}
                autoFocus
              />
              <button type="submit" className="lp-btn lp-btn--submit">Continue</button>
            </form>
          </>
        )}

        {/* ── Step: Details ── */}
        {step === "details" && (
          <>
            <button className="lp-back" onClick={() => setStep("email")}>←</button>
            <h2 className="lp-title">Finish Setup</h2>
            <p className="lp-subtitle">Almost there! Just a few more details.</p>

            {error && <div className="lp-error">{error}</div>}

            <form onSubmit={handleSendPhoneOtp} className="lp-form">
              <div className="sp-field-row">
                <span className="sp-field-label">Full name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => { setName(e.target.value); setError(""); }}
                />
              </div>
              <div className="sp-field-row">
                <span className="sp-field-label">Phone number</span>
                <input
                  type="tel"
                  value={phone_number}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => { setPhone_number(e.target.value); setError(""); }}
                />
              </div>
              <div className="sp-field-row">
                <span className="sp-field-label">Create password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value); setError(""); }}
                />
              </div>
              <button type="submit" className="lp-btn lp-btn--submit" disabled={loading}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </>
        )}

        {/* ── Step: Phone OTP ── */}
        {step === "phone-otp" && (
          <>
            <button className="lp-back" onClick={() => setStep("details")}>←</button>
            <h2 className="lp-title">Verify Phone</h2>
            <p className="lp-subtitle">Enter the OTP sent to +91{phone_number}</p>

            {error && <div className="lp-error">{error}</div>}

            <form onSubmit={handleVerifyPhoneOtp} className="lp-form">
              <input
                type="text"
                placeholder="Enter OTP"
                value={phoneOtp}
                onChange={(e: ChangeEvent<HTMLInputElement>) => { setPhoneOtp(e.target.value); setError(""); }}
                maxLength={6}
                autoFocus
              />
              <button type="submit" className="lp-btn lp-btn--submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify Phone"}
              </button>
            </form>

            <p className="lp-switch" onClick={handleResendPhoneOtp}>
              Didn't receive OTP? <span>Resend</span>
            </p>
          </>
        )}

        {/* ── Step: Email OTP ── */}
        {step === "email-otp" && (
          <>
            <h2 className="lp-title">Verify Email</h2>
            <p className="lp-subtitle">Enter the OTP sent to {email}</p>

            {error && <div className="lp-error">{error}</div>}

            <form onSubmit={handleVerifyEmailOtp} className="lp-form">
              <input
                type="text"
                placeholder="Enter OTP"
                value={emailOtp}
                onChange={(e: ChangeEvent<HTMLInputElement>) => { setEmailOtp(e.target.value); setError(""); }}
                maxLength={6}
                autoFocus
              />
              <button type="submit" className="lp-btn lp-btn--submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify & Create Account"}
              </button>
            </form>

            <p className="lp-switch" onClick={handleResendEmailOtp}>
              Didn't receive OTP? <span>Resend</span>
            </p>
          </>
        )}

      </div>
    </div>
  );
};

export default SignUpPopup;
