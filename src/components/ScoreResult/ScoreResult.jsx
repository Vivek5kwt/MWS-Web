import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import SignUpPopup from '../SignUpPopup/SignUpPopup'
import { exportScoreResultToPdf } from '../../services/pdfExport'
import './ScoreResult.scss'

export default function ScoreResult({ score = 30, domainScores = [], recommendations = [] }) {
  const [openDomainIndex, setOpenDomainIndex] = useState(0)
  const [showSignUpPopup, setShowSignUpPopup] = useState(true)

  const chartOptions = {
    chart: { type: 'radar', height: 500, background: 'transparent' },
    xaxis: {
      categories: domainScores.map(d => d.name),
      labels: { style: { colors: '#fff', fontSize: '16px' } }
    },
    yaxis: { show: true, labels: { style: { colors: '#aaa', fontSize: '14px' } } },
    fill: { opacity: 0.3, colors: ['#00d4ff'] },
    stroke: { width: 2, colors: ['#00d4ff'] },
    markers: { size: 4, colors: ['#fff'], strokeColors: ['#00d4ff'] },
    theme: { mode: 'dark' },
    dataLabels: { enabled: false },
    title: {}
  }

  const chartSeries = [{ name: 'Score', data: domainScores.map(d => d.value) }]

  function toggleDomain(i) {
    setOpenDomainIndex(openDomainIndex === i ? null : i)
  }

  async function downloadReport() {
    await exportScoreResultToPdf({ score, domainScores, recommendations })
  }

  return (
    <div className="score-result-wrapper">
      <div className="score-card-gradient-border">
        <div className="score-card">
          <div className="score-title">Your Wealth Score is</div>
          <div className="score-value">{score}</div>
          <div className="score-status">Concerning Financial Health</div>
          <div className="score-description">
            Your financial health is concerning with critical issues that need immediate attention.<br />
            Several aspects of your finances require significant improvement. Focus first on stabilizing your situation by addressing the most pressing vulnerabilities.
          </div>
        </div>
      </div>

      <div className="domain-section">
        <div className="domain-title">Your Domain Scores</div>
        <div className="domain-list">
          {domainScores.map((domain, i) => (
            <div
              key={i}
              className={`domain-item${openDomainIndex === i ? ' open' : ''}`}
              onClick={() => toggleDomain(i)}
              style={{ cursor: 'pointer' }}
            >
              <div className="domain-header">
                <div>
                  <div className="domain-name">{domain.name}</div>
                  <div className="domain-percentage">{domain.percent} of Total Score</div>
                </div>
                <div className="domain-value">
                  {domain.value}
                  <span className="domain-arrow">
                    {openDomainIndex === i ? (
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M10 24L20 14L30 24" stroke="url(#arrowGradientUp)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                        <defs>
                          <linearGradient id="arrowGradientUp" x1="10" y1="14" x2="30" y2="24" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#ffb347" /><stop offset="0.5" stopColor="#00c6ff" /><stop offset="1" stopColor="#43e97b" />
                          </linearGradient>
                        </defs>
                      </svg>
                    ) : (
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M10 16L20 26L30 16" stroke="url(#arrowGradientDown)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                        <defs>
                          <linearGradient id="arrowGradientDown" x1="10" y1="16" x2="30" y2="26" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#ffb347" /><stop offset="0.5" stopColor="#00c6ff" /><stop offset="1" stopColor="#43e97b" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                  </span>
                </div>
              </div>
              {openDomainIndex === i && (
                domain.summary
                  ? <div className="domain-summary"><b>{domain.summary}</b></div>
                  : domain.description && <div className="domain-description">{domain.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {domainScores.length > 0 && (
        <div className="visualization-section">
          <div className="visualization-title">Score Visualization</div>
          <div className="radar-chart-container">
            <ReactApexChart options={chartOptions} series={chartSeries} type="radar" height={500} />
          </div>
        </div>
      )}

      <div className="recommendations-section">
        <div className="recommendations-title">Recommendations</div>
        <div className="recommendation-list">
          {recommendations.map((rec, i) => (
            <div className="recommendation-item" key={i}>
              <div className="recommendation-title">{rec.title}</div>
              {rec.priority && <div className="recommendation-priority">Priority: {rec.priority}</div>}
              <div className="recommendation-description">{rec.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="download-section">
        <button className="download-btn" onClick={downloadReport}>Download Report</button>
      </div>

      <div className="disclaimer">
        Disclaimer: This wealth score is for informational purposes only and should not be considered as financial advice. Please consult with a qualified financial advisor before making any financial decisions.
      </div>

      {showSignUpPopup && (
        <SignUpPopup onClose={() => setShowSignUpPopup(false)} onSkip={() => setShowSignUpPopup(false)} />
      )}
    </div>
  )
}
