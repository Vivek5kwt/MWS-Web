import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import WealthScore from './components/WealthScore/WealthScore'
import BeginJourney from './components/BeginJourney/BeginJourney'
import AuthCallback from './components/AuthCallback/AuthCallback'
import WealthScoreForm from './pages/WealthScoreForm'
import WealthScoreFormn from './pages/WealthScoreFormn'

function HomePage() {
  return (
    <div className="home-wrapper">
      <Header />
      <WealthScore />
      <WealthScoreForm/>
      <WealthScoreFormn/>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/begin-journey" element={<><Header /><BeginJourney /></>} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
