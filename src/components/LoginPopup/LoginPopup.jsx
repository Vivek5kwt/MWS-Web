import React, { useState } from 'react'
import axios from 'axios'
import './LoginPopup.scss'

export default function LoginPopup({ onClose, onShowSignUp }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  async function onLogin(e) {
    e.preventDefault()
    setError(null)
    try {
      const res = await axios.post('http://localhost:3000/auth/login', {
        emailOrPhone: email,
        password
      })
      if (res.data.token) {
        localStorage.setItem('auth_token', res.data.token)
        let userEmail = email
        let userName = email.split('@')[0]
        try {
          const payload = JSON.parse(atob(res.data.token.split('.')[1]))
          if (payload.email) userEmail = payload.email
          else if (payload.sub) userEmail = payload.sub
          if (payload.name) userName = payload.name
          else if (payload.given_name) userName = payload.given_name
        } catch (e) {}
        if (res.data.user?.name) userName = res.data.user.name
        localStorage.setItem('user_name', userName)
        localStorage.setItem('user_email', userEmail)
        alert('Login successful!')
        onClose()
        window.location.reload()
      } else {
        setError(res.data.message || 'Login failed.')
      }
    } catch (err) {
      if (!err.response) setError('Server is not available. Please try again later.')
      else if (err.response.status === 401) setError('Invalid email or password. Please try again.')
      else if (err.response.status >= 500) setError('Server error. Please try again later.')
      else setError(err.response?.data?.message || 'Login failed. Please try again.')
    }
  }

  return (
    <div className="login-popup-backdrop">
      <div className="login-popup-modal">
        <button className="login-close-btn" onClick={onClose} aria-label="Close">&times;</button>
        {error && (
          <div style={{ background: '#ff4444', color: 'white', padding: '12px', borderRadius: '8px', marginBottom: '16px', textAlign: 'center' }}>{error}</div>
        )}
        <div className="login-popup-title">Login to your account</div>
        <div className="login-popup-desc">Enter your email and password to access your personalized Wealth Score.</div>
        <form className="login-form" onSubmit={onLogin}>
          <input className="login-input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="login-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="login-btn" type="submit" disabled={!email || !password}>Login</button>
        </form>
        <div className="login-popup-bottom">
          <hr className="login-popup-divider" />
          <div className="login-popup-signup-text">
            Don't have an account?
            <a className="login-popup-signup-link" onClick={onShowSignUp} style={{ cursor: 'pointer' }}>Sign up</a>
          </div>
        </div>
      </div>
    </div>
  )
}
