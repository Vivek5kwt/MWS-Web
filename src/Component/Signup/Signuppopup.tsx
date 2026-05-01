import React, { useState } from "react";
import axios from "axios";
import Login from "./LoginPopup";
import "./Signuppopup.css";

type Props = {
  onClose: () => void;
};

const SignUpPopup: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/auth/register", {
        email,
        name,
        phone,
        password,
      });

      console.log(res.data);

      setLoading(false);
      alert("Signup success");

    } catch (err: any) {
      setLoading(false);
      setError("Signup failed");
    }
  };

  return (
    <div className="signup-popup-backdrop">
      <div className="signup-popup-modal">

        <button onClick={onClose}>&times;</button>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2>Signup</h2>

            <button onClick={() => setStep(2)}>
              Continue with Email
            </button>

            <p onClick={() => setShowLoginPopup(true)}>
              Already have account? Login
            </p>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={() => setStep(3)} disabled={!email}>
              Continue
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            {error && <p>{error}</p>}

            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleSignup}
              disabled={!name || !phone || !password || loading}
            >
              {loading ? "Loading..." : "Signup"}
            </button>
          </>
        )}

        {/* LOGIN POPUP */}
        {showLoginPopup && (
          <Login
            onClose={() => setShowLoginPopup(false)}
            onShowSignUp={() => setShowLoginPopup(false)}
          />
        )}

      </div>
    </div>
  );
};

export default SignUpPopup;