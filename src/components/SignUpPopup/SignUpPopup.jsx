import React, { useState } from 'react'
import axios from 'axios'
import LoginPopup from '../LoginPopup/LoginPopup'
import './SignUpPopup.scss'

export default function SignUpPopup({ mode = 'journey', onClose, onSkip }) {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showLoginPopup, setShowLoginPopup] = useState(false)

  function onGoogleAuth() {
    window.location.href = 'http://localhost:3000/oauth2/authorization/google?state=signup'
  }

  function onContinueEmail() {
    setStep(3)
  }

  async function onUnlockScore() {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.post('http://localhost:3000/auth/register', {
        email, phone, name, password
      })
      setLoading(false)
      if (res.data.token) {
        localStorage.setItem('auth_token', res.data.token)
        let userEmail = email
        try {
          const payload = JSON.parse(atob(res.data.token.split('.')[1]))
          if (payload.email) userEmail = payload.email
          else if (payload.sub) userEmail = payload.sub
        } catch (e) {}
        localStorage.setItem('user_name', name || userEmail.split('@')[0])
        localStorage.setItem('user_email', userEmail)
        alert('Registration successful!')
        window.location.href = '/score-result'
      } else {
        setError(res.data.message || 'Registration failed.')
      }
    } catch (err) {
      setLoading(false)
      if (!err.response) setError('Server is not available. Please try again later.')
      else if (err.response.status === 409) setError('User already exists with this email or phone.')
      else if (err.response.status >= 500) setError('Server error. Please try again later.')
      else setError(err.response?.data?.message || 'Registration failed. Please try again.')
    }
  }

  return (
    <div className="signup-popup-backdrop">
      <div className="signup-popup-modal" style={{ position: 'relative' }}>
        <button className="signup-close-btn" onClick={onClose} aria-label="Close">&times;</button>

        {step === 1 && (
          <>
            {mode === 'header' ? (
              <>
                <div className="signup-popup-title">Welcome!</div>
                <div className="signup-popup-desc">
                  Continue with Google or Email, we'll create your free account if you're new.
                </div>
              </>
            ) : (
              <>
                <div className="signup-popup-title">Your Wealth Score is ready!</div>
                <div className="signup-popup-desc">
                  Unlock your personalized results by creating or logging in<br />
                  your account. It takes less than 20 seconds.
                </div>
              </>
            )}
            <button className="signup-google-btn" onClick={onGoogleAuth}>
              <img src="/google-icon.svg" alt="Google" className="google-icon" />
              {mode === 'header' ? 'Continue with Google' : 'Unlock my score'}
            </button>
            <button className="signup-email-btn" onClick={() => setStep(2)}>Continue with Email</button>
            {mode === 'journey' && (
              <div className="signup-popup-skip">
                <a onClick={onSkip} style={{ cursor: 'pointer' }}>Skip for now (view summary only)</a>
              </div>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <div className="signup-email-header">
              <button className="signup-back-btn" onClick={() => setStep(1)} aria-label="Back">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="signup-popup-title signup-email-title">Continue with Email</div>
            <div className="signup-popup-desc signup-email-desc">
              Log in to see your personalized results. If you're new, we'll<br />
              create your account automatically in seconds.
            </div>
            <div className="signup-email-form">
              <input className="signup-input signup-email-input" type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
              <button className="signup-continue-btn signup-email-btn" disabled={!email} onClick={onContinueEmail}>
                Continue
              </button>
            </div>
            <div className="signup-popup-skip signup-email-skip">
              <a onClick={onSkip} style={{ cursor: 'pointer' }}>Skip for now (view summary only)</a>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            {error && (
              <div className="signup-error-popup">
                <div className="signup-error-content">
                  <div className="signup-error-title">Error</div>
                  <div className="signup-error-message">{error}</div>
                  <button className="signup-error-btn" onClick={() => setError(null)}>Close</button>
                </div>
              </div>
            )}
            <div className="signup-popup-title signup-finish-title">Finish setting up your account!</div>
            <div className="signup-popup-desc signup-finish-desc">
              Add your name & phone so we can personalize your<br />
              experience and keep you updated instantly.
            </div>
            <div className="signup-finish-form">
              <div className="signup-label signup-finish-label">Name</div>
              <input className="signup-input signup-finish-input" type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />
              <div className="signup-label signup-finish-label">Phone number</div>
              <div className="signup-phone-row signup-finish-phone-row">
                <select className="signup-phone-country signup-finish-country" value={countryCode} onChange={e => setCountryCode(e.target.value)}>
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                </select>
                <input className="signup-input signup-phone-input signup-finish-phone-input" type="tel" placeholder="Enter number" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="signup-label signup-finish-label">Password</div>
              <input className="signup-input signup-finish-input" type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
              <button className="signup-continue-btn signup-finish-btn" disabled={!name || !phone || !password || loading} onClick={onUnlockScore}>
                {loading ? 'Please wait...' : 'Unlock my score'}
              </button>
            </div>
          </>
        )}

        <div className="signup-popup-bottom">
          <hr className="signup-popup-divider" />
          <div className="signup-popup-login-text">
            Already have an account?{' '}
            <a className="signup-popup-login-link" onClick={() => setShowLoginPopup(true)} style={{ cursor: 'pointer' }}>Please login</a>
          </div>
        </div>

        {showLoginPopup && (
          <LoginPopup onClose={() => setShowLoginPopup(false)} onShowSignUp={() => setShowLoginPopup(false)} />
        )}
      </div>
    </div>
  )
}
