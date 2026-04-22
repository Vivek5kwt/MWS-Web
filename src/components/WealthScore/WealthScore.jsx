import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './WealthScore.scss'

export default function WealthScore({ score = 75 }) {
  const carouselRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const circles = document.querySelectorAll('.progress-circle')
    circles.forEach((el) => {
      const target = parseInt(el.getAttribute('data-value'), 10) || 0
      let current = 0
      const step = () => {
        if (current < target) {
          current += 1
          el.style.setProperty('--value', current.toString())
          requestAnimationFrame(step)
        } else {
          el.style.setProperty('--value', target.toString())
        }
      }
      step()
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    document.querySelectorAll('.scroll-animate, .scroll-animate-stagger').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  function scrollCarousel(direction) {
    if (carouselRef.current) {
      const offset = direction === 'left' ? -300 : 300
      carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  function scrollToBeyondScore() {
    const el = document.querySelector('.beyond-score-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="wealth-score-wrapper row" style={{ marginTop: '70px' }}>
        <div className="content col-7 flex-center">
          <div className="continer p-0 scroll-animate-stagger" style={{ width: 'fit-content', marginLeft: '45px' }}>
            <h1 className="gradient-text">
              <span>Transform Your Financial Future with</span>
              <br />
              <span>India's Most Intelligent Wealth Score</span>
            </h1>
            <p>
              Get your complete financial health report in just 2 minutes! Our advanced AI analyzes your savings, investments, loans, and insurance to give you a personalized Wealth Score with expert recommendations completely FREE.
            </p>
            <div className="buttons">
              <button className="primary-btn" type="button" onClick={() => navigate('/begin-journey')}>Check My Wealth Score</button>
              <button className="outline-btn" onClick={scrollToBeyondScore}>See How It Works</button>
            </div>
          </div>
        </div>

        <div className="content col-5 score-col">
          <div className="container score-card scroll-animate score-card-pos">
            <h2>Wealth Score</h2>
            <div
              className={`progress-circle main-score ${score >= 60 ? 'blue' : 'orange'}`}
              data-value={score}
            >
              <span>{score}</span>
            </div>
            <div className="status-text">CONCERNING FINANCIAL HEALTH</div>
            <div className="metrics">
              <div className="metric">
                <div className="progress-circle orange" data-value="25"><span>25</span></div>
                <div>Liquidity</div>
              </div>
              <div className="metric">
                <div className="progress-circle orange" data-value="45"><span>45</span></div>
                <div>Investments</div>
              </div>
              <div className="metric">
                <div className="progress-circle blue" data-value="75"><span>75</span></div>
                <div>Debt</div>
              </div>
              <div className="metric">
                <div className="progress-circle blue" data-value="85"><span>85</span></div>
                <div>Insurance</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Crisis Section */}
      <div id="vision" className="financial-crisis-section scroll-animate">
        <h2 className="title gradient-text">The Financial Planning Crisis in India</h2>
        <p className="description">
          Most Indians are navigating their financial journey without proper
          <br />guidance. Traditional financial advisors are expensive and often
          <br />push products for commissions. The real challenge isn't lack of
          <br />money, it's lack of personalized, unbiased financial guidance.
        </p>
        <div className="stats-grid scroll-animate-stagger">
          {[
            { icon: '%', stat: '27%', text: 'Indians are financially literate' },
            { icon: '🏦', stat: '68%', text: 'Depend solely on traditional savings' },
            { icon: '📈', stat: '85%', text: "Don't invest in equity markets" },
            { icon: '₹', stat: '30%', text: 'Saves more but invests poorly' },
            { icon: '🛡️', stat: '87%', text: 'Lack adequate life insurance coverage' },
          ].map(({ icon, stat, text }) => (
            <div className="stat-card" key={stat}>
              <div className="icon">{icon}</div>
              <div className="stat-text">
                <strong>{stat}</strong>
                <span>{text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Four Pillars Section */}
      <div id="four-pillars" className="critical-areas-section scroll-animate">
        <h2 className="gradient-text title">Your Financial Health Depends on Four Critical Areas</h2>
        <p className="description">
          Our AI analyzes every aspect of your financial life across four fundamental domains that matter most to Indian families.
          Like the pillars of a strong foundation, weakness in any area can affect your entire financial stability.
        </p>
        <div className="areas-grid scroll-animate-stagger">
          {[
            { icon: '₹', title: 'LIQUIDITY', subtitle: 'Emergency Fund & Cash Flow', desc: "Your liquidity score measures your ability to handle financial emergencies. Our AI evaluates your emergency fund and monthly cash flow to ensure you're prepared for medical emergencies, job loss, or family needs." },
            { icon: '🌱', title: 'INVESTMENTS', subtitle: 'Wealth Building & Growth', desc: "Your investment score reveals how effectively you're building wealth. Our AI examines your portfolio across SIPs, ELSS, PPF, and other Indian investment options to optimize tax benefits and long-term wealth creation." },
            { icon: '🏠', title: 'DEBT', subtitle: 'Smart Borrowing Management', desc: "Your debt score measures how well you're managing loans and credit. Our AI evaluates home loans, personal loans, and credit cards to accelerate your journey to financial freedom while maximizing tax benefits." },
            { icon: '🛡️', title: 'INSURANCE', subtitle: 'Family Protection & Security', desc: "Your insurance score assesses how well your family is protected against uncertainties. Our AI reviews term insurance, health insurance, and coverage gaps to ensure your family's financial security." },
          ].map(({ icon, title, subtitle, desc }) => (
            <div className="area-card" key={title}>
              <div className="area-icon gradient-circle">{icon}</div>
              <div className="area-content">
                <h3>{title}</h3>
                <p className="subtitle">{subtitle}</p>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Intelligence / Steps Section */}
      <div id="ai-intelligence" className="steps-section scroll-animate">
        <h2 className="title gradient-text">Get Your Personalized Wealth Score in 3 Simple Steps</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number gradient-badge">1</div>
            <h3>Share Your Financial Details Safely</h3>
            <p>Securely share your financial details — salary, expenses, loans, and insurance. Our AI uses bank-level security to protect your data.</p>
          </div>
          <div className="step-line"></div>
          <div className="step-card">
            <div className="step-number gradient-badge">2</div>
            <h3>AI Processing for Indian Markets</h3>
            <p>Our AI analyzes your data using Indian tax laws and financial regulations. It evaluates over 500+ products across all wealth areas.</p>
          </div>
          <div className="step-line"></div>
          <div className="step-card">
            <div className="step-number gradient-badge">3</div>
            <h3>Receive Your Wealth Score & Recommendations</h3>
            <p>Get your score with personalized recommendations for tax savings, smart investments, and family financial protection.</p>
          </div>
        </div>
      </div>

      {/* Transformation Section */}
      <div className="transformation-section scroll-animate">
        <div className="container">
          <h2 className="gradient-text text-center" style={{ marginBottom: '32px' }}>
            Start Your Financial Transformation Today
          </h2>
          <div className="row align-items-center gx-5">
            <div className="col-md-6">
              <img src="/images/financial-transformation.png" alt="Financial Transformation" className="img-fluid rounded-image" />
            </div>
            <div className="col-md-6 content-block">
              <p className="description">
                Stop worrying about your financial future. In just 2 minutes, get a complete picture of your financial health with personalized recommendations for Indian financial products and tax optimization.
              </p>
              <ul className="feature-list">
                <li><i className="bi bi-cloud-download"></i> FREE Wealth Score Analysis</li>
                <li><i className="bi bi-cpu"></i> AI Recommendations for Indian Products</li>
                <li><i className="bi bi-bar-chart"></i> Tax Optimization Strategies</li>
                <li><i className="bi bi-x-circle"></i> No Hidden Charges</li>
                <li><i className="bi bi-shield-lock"></i> RBI Compliant Security</li>
              </ul>
              <div className="buttons">
                <button className="primary-btn" onClick={() => navigate('/begin-journey')}>Check My Wealth Score – FREE</button>
                <button className="outline-btn" onClick={scrollToBeyondScore}>See Sample Report</button>
              </div>
              <div className="sub-text">Join 1,00,000+ Indians who improved their financial health</div>
            </div>
          </div>
        </div>
      </div>

      {/* Beyond Score Section */}
      <div className="beyond-score-section">
        <h2 className="title scroll-animate">
          <span className="gradient-text">Beyond the Score</span>
        </h2>
        <p className="subtitle scroll-animate">
          Your Wealth Score is just the beginning. True financial ascension requires comprehensive mastery.
        </p>
        <div className="carousel-wrapper scroll-animate-stagger" ref={carouselRef}>
          {[
            { img: '/images/score1.png', title: 'Goal Planning', desc: 'Transform aspirations into mathematically precise roadmaps.' },
            { img: '/images/score2.png', title: 'Liquidity Optimization', desc: 'Every rupee positioned for maximum strategic advantage.' },
            { img: '/images/score3.png', title: 'Investment Mastery', desc: 'AI-driven allocation that adapts to market evolution.' },
            { img: '/images/score1.png', title: 'Loan Strategy', desc: 'Converting borrowed capital into acceleration tools.' },
            { img: '/images/score1.png', title: 'Goal Planning', desc: 'Transform aspirations into mathematically precise roadmaps.' },
            { img: '/images/score2.png', title: 'Liquidity Optimization', desc: 'Every rupee positioned for maximum strategic advantage.' },
            { img: '/images/score3.png', title: 'Investment Mastery', desc: 'AI-driven allocation that adapts to market evolution.' },
            { img: '/images/score1.png', title: 'Loan Strategy', desc: 'Converting borrowed capital into acceleration tools.' },
          ].map((card, i) => (
            <div className="card" key={i}>
              <img src={card.img} alt={card.title} />
              <div className="card-content">
                <h5>{card.title}</h5>
                <p>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-controls">
          <button className="control" onClick={() => scrollCarousel('left')}>&lt;</button>
          <button className="control" onClick={() => scrollCarousel('right')}>&gt;</button>
        </div>
      </div>
    </>
  )
}
