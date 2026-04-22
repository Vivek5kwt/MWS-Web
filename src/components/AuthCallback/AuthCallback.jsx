import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

export default function AuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const token = searchParams.get('token')
    const flow = searchParams.get('flow')
    const user = searchParams.get('user')
    const email = searchParams.get('email')

    if (token) {
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user_name', user || email?.split('@')[0] || '')
      localStorage.setItem('user_email', email || '')
      localStorage.setItem('display_name', user || '')

      window.dispatchEvent(new StorageEvent('storage', {
        key: 'user_name',
        newValue: email || user || ''
      }))

      setTimeout(() => {
        alert(`${flow === 'signup' ? 'Registration' : 'Login'} successful! Welcome ${user || 'User'}!`)
        if (flow === 'signup') {
          navigate('/score-result')
        } else {
          navigate('/home')
        }
      }, 1000)
    } else {
      alert('Login failed. Please try again.')
      navigate('/home')
    }
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0F0F0F', color: 'white', fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ width: '50px', height: '50px', border: '4px solid #333', borderTop: '4px solid #11CED4', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
        <h2 style={{ marginBottom: '0.5rem', background: 'linear-gradient(90deg, #D98E24, #11CED4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Completing your login...
        </h2>
        <p>Please wait while we finalize your authentication.</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )
}
