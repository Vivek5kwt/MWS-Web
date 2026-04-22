import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import SignUpPopup from '../SignUpPopup/SignUpPopup'
import './Header.scss'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSignUpPopup, setShowSignUpPopup] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  function syncLoginState() {
    const token = localStorage.getItem('auth_token')
    const name = localStorage.getItem('user_name')
    const email = localStorage.getItem('user_email')
    setIsLoggedIn(!!token)
    setUserName(name || '')
    setUserEmail(email || '')
  }

  useEffect(() => {
    syncLoginState()
    window.addEventListener('storage', syncLoginState)
    window.addEventListener('focus', syncLoginState)
    const interval = setInterval(syncLoginState, 2000)
    return () => {
      window.removeEventListener('storage', syncLoginState)
      window.removeEventListener('focus', syncLoginState)
      clearInterval(interval)
    }
  }, [])

  function getInitial() {
    if (!userName) return '?'
    return userName.charAt(0).toUpperCase()
  }

  function logout() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_name')
    localStorage.removeItem('user_email')
    setIsLoggedIn(false)
    setUserName('')
    setUserEmail('')
    setShowProfileMenu(false)
    window.location.reload()
  }

  function scrollToSection(section) {
    if (location.pathname !== '/home') {
      navigate('/home')
      setTimeout(() => {
        const el = document.getElementById(section)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } else {
      const el = document.getElementById(section)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const url = location.pathname

  return (
    <div className="container header w-full flex justify-between items-center">
      <div className="logo">
        <p onClick={() => navigate('/home')} className="cursor-pointer">
          MyWealthScore<span className="gradient-text">.ai</span>
        </p>
      </div>

      <div className="navigation flex items-center desktop-nav">
        <p className={url === '/vision' ? 'active' : ''} onClick={() => scrollToSection('vision')}>Vision</p>
        <p className={url === '/four-pillars' ? 'active' : ''} onClick={() => scrollToSection('four-pillars')}>Four Pillars</p>
        <p className={url === '/ai-intelligence' ? 'active' : ''} onClick={() => scrollToSection('ai-intelligence')}>AI Intelligence</p>

        {!isLoggedIn && (
          <>
            <button className="btn btn-primary" onClick={() => setShowSignUpPopup(true)}>Sign up</button>
            {showSignUpPopup && (
              <SignUpPopup mode="header" onClose={() => setShowSignUpPopup(false)} onSkip={() => setShowSignUpPopup(false)} />
            )}
          </>
        )}

        {isLoggedIn && (
          <>
            <div className="profile-circle" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <span>{getInitial()}</span>
            </div>
            {showProfileMenu && (
              <div className="profile-menu">
                <div className="profile-name">{userName}</div>
                <div className="profile-email">{userEmail}</div>
                <button className="btn btn-primary" onClick={logout}>Logout</button>
              </div>
            )}
          </>
        )}
      </div>

      <button
        className={`hamburger-menu${isMenuOpen ? ' open' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Open navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {isMenuOpen && (
        <div className="mobile-nav">
          <p className={url === '/vision' ? 'active' : ''} onClick={() => { scrollToSection('vision'); setIsMenuOpen(false) }}>Vision</p>
          <p className={url === '/four-pillars' ? 'active' : ''} onClick={() => { scrollToSection('four-pillars'); setIsMenuOpen(false) }}>Four Pillars</p>
          <p className={url === '/ai-intelligence' ? 'active' : ''} onClick={() => { scrollToSection('ai-intelligence'); setIsMenuOpen(false) }}>AI Intelligence</p>

          {!isLoggedIn && (
            <button className="btn btn-primary" onClick={() => { setShowSignUpPopup(true); setIsMenuOpen(false) }}>Sign up</button>
          )}

          {isLoggedIn && (
            <div className="mobile-profile-info">
              <div className="mobile-profile-name">{userName}</div>
              <div className="mobile-profile-email">{userEmail}</div>
              <button className="btn btn-primary" onClick={() => { logout(); setIsMenuOpen(false) }}>Logout</button>
            </div>
          )}

          {showSignUpPopup && (
            <SignUpPopup mode="header" onClose={() => setShowSignUpPopup(false)} onSkip={() => setShowSignUpPopup(false)} />
          )}
        </div>
      )}
    </div>
  )
}
