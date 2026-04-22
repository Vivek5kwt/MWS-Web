import React from 'react'
import './Footer.scss'

export default function Footer() {
  return (
    <footer className="custom-footer">
      <div className="container">
        <div className="footer-content row">
          <div className="col-md-3 brand-section">
            <h4 className="logo">
              <span>MyWealthScore</span><span className="dot-ai">.ai</span>
            </h4>
            <p className="tagline">
              <a href="/home" style={{ color: 'inherit' }}>
                Making Financial Planning Accessible to Every Indian
              </a>
            </p>
            <ul className="credentials">
              <li>RBI Guidelines Compliant</li>
              <li>ISO 27001 Certified</li>
              <li>Featured in Economic Times</li>
            </ul>
            <div className="social-icons">
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="bi bi-instagram"></i></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="bi bi-facebook"></i></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer"><i className="bi bi-youtube"></i></a>
              <a href="https://x.com" target="_blank" rel="noreferrer"><i className="bi bi-x"></i></a>
            </div>
          </div>

          <div className="col-md-3 link-column">
            <h5 className="column-title">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div className="col-md-3 link-column">
            <h5 className="column-title">Financial Tools</h5>
            <ul className="footer-links">
              <li><a href="#">Tax Calculator</a></li>
              <li><a href="#">SIP Calculator</a></li>
              <li><a href="#">EMI Calculator</a></li>
              <li><a href="#">Insurance Calculator</a></li>
            </ul>
          </div>

          <div className="col-md-3 contact-column">
            <h5 className="column-title">Contact</h5>
            <ul className="footer-links">
              <li>
                <a href="mailto:support@mywealthscore.ai">
                  <i className="bi bi-envelope-fill"></i> support@mywealthscore.ai
                </a>
              </li>
              <li><i className="bi bi-telephone-fill"></i> +91-XXXXX-XXXXX</li>
              <li><i className="bi bi-geo-alt-fill"></i> Mumbai, Maharashtra India</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom text-center mt-4">
          <p>Copyright © 2025 MyWealthScore.ai. All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
