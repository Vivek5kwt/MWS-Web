import React, { useState } from 'react'
import axios from 'axios'
import ScoreResult from '../ScoreResult/ScoreResult'
import './BeginJourney.scss'

const initialForm = {
  age: '', email: '', monthlyIncome: '', maritalStatus: '', dependents: '',
  locationTier: '', riskProfile: '', cashInHand: '', savingsBalance: '',
  fixedDeposits: '', liquidFunds: '', monthlyExpenses: '', incomeStability: '',
  equityInvestments: '', fixedIncomeInvestments: '', realEstateInvestments: '',
  goldInvestments: '', retirementAccounts: '', monthlyInvestment: '',
  portfolioDiversification: '', investmentReturn: '', homeLoan: '', homeLoanEMI: '',
  carLoan: '', carLoanEMI: '', personalLoan: '', personalLoanEMI: '',
  creditCardDebt: '', creditScore: '', termInsurance: '', healthInsurance: '',
  criticalIllness: '', employerLifeCover: '', employerHealthCover: '', homeInsurance: ''
}

function FieldError({ show, children }) {
  if (!show) return null
  return <div className="error-message">{children}</div>
}

export default function BeginJourney() {
  const [form, setForm] = useState(initialForm)
  const [touched, setTouched] = useState({})
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleBlur(e) {
    setTouched({ ...touched, [e.target.name]: true })
  }

  function isInvalid(field) {
    return touched[field] && !form[field]
  }

  async function onSubmit(e) {
    e.preventDefault()
    const allTouched = {}
    Object.keys(form).forEach(k => allTouched[k] = true)
    setTouched(allTouched)
    const hasEmpty = Object.values(form).some(v => !v)
    if (hasEmpty) return
    setLoading(true)
    setError(null)
    try {
      const res = await axios.post('http://localhost:3000/api/wealth-score', form)
      window.scrollTo(0, 0)
      setResult({
        score: res.data.finalScore,
        domainScores: [
          { name: 'Liquidity', value: res.data.liquidityScore, percent: res.data.weights?.liquidity ? res.data.weights.liquidity + '%' : undefined, summary: res.data.liquidityAnalysis, description: res.data.liquidityAnalysis },
          { name: 'Investment', value: res.data.investmentScore, percent: res.data.weights?.investment ? res.data.weights.investment + '%' : undefined, summary: res.data.investmentAnalysis, description: res.data.investmentAnalysis },
          { name: 'Debt', value: res.data.debtScore, percent: res.data.weights?.debt ? res.data.weights.debt + '%' : undefined, summary: res.data.debtAnalysis, description: res.data.debtAnalysis },
          { name: 'Insurance', value: res.data.insuranceScore, percent: res.data.weights?.insurance ? res.data.weights.insurance + '%' : undefined, summary: res.data.insuranceAnalysis, description: res.data.insuranceAnalysis },
        ],
        recommendations: (res.data.recommendations || []).map(rec => ({ title: rec, priority: '', description: rec }))
      })
    } catch {
      setError('Failed to fetch wealth score. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return <ScoreResult score={result.score} domainScores={result.domainScores} recommendations={result.recommendations} />
  }

  return (
    <div className="begin-journey-intro">
      <h1 className="gradient-text text-center">
        Let's Personalize Your <span className="highlight">Wealth Score</span>
      </h1>
      <p className="subtitle text-center">
        Fill in your financial details securely. It only takes 2 minutes.
      </p>
      <div className="encryption-info-pill">
        End–End Encryption <span className="divider"></span> No Sharing of Data
      </div>

      <div className="begin-journey-wrapper">
        <form className="wealth-form" onSubmit={onSubmit}>

          {/* Personal Information */}
          <div className="form-section">
            <h2>Personal Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Age</label>
                <input type="number" name="age" value={form.age} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your age" />
                <FieldError show={isInvalid('age')}>This field cannot be empty</FieldError>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your email" />
                <FieldError show={isInvalid('email')}>This field cannot be empty</FieldError>
              </div>
              <div className="form-group">
                <label>Monthly Income</label>
                <div className="input-group">
                  <span className="input-group-text">₹</span>
                  <input type="text" name="monthlyIncome" value={form.monthlyIncome} onChange={handleChange} onBlur={handleBlur} placeholder="Enter amount" />
                </div>
                <FieldError show={isInvalid('monthlyIncome')}>This field cannot be empty</FieldError>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Marital Status</label>
                <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange} onBlur={handleBlur}>
                  <option value="">Select</option>
                  <option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option>
                </select>
                <FieldError show={isInvalid('maritalStatus')}>This field cannot be empty</FieldError>
              </div>
              <div className="form-group">
                <label>Number of Dependents</label>
                <input type="number" name="dependents" value={form.dependents} onChange={handleChange} onBlur={handleBlur} placeholder="Enter count" />
                <FieldError show={isInvalid('dependents')}>This field cannot be empty</FieldError>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Location Tier</label>
                <select name="locationTier" value={form.locationTier} onChange={handleChange} onBlur={handleBlur}>
                  <option value="">Select</option>
                  <option>Tier 1 (Metro)</option><option>Tier 2 (City/Town)</option><option>Rural Area</option>
                </select>
                <FieldError show={isInvalid('locationTier')}>This field cannot be empty</FieldError>
              </div>
              <div className="form-group">
                <label>Risk Profile</label>
                <select name="riskProfile" value={form.riskProfile} onChange={handleChange} onBlur={handleBlur}>
                  <option value="">Select</option>
                  <option>Conservative</option><option>Moderately Conservative</option><option>Moderate</option><option>Moderately Aggressive</option><option>Aggressive</option>
                </select>
                <FieldError show={isInvalid('riskProfile')}>This field cannot be empty</FieldError>
              </div>
            </div>
          </div>

          {/* Liquidity Assessment */}
          <div className="form-section">
            <h2>Liquidity Assessment</h2>
            <div className="form-row">
              {[['cashInHand','Cash in Hand'],['savingsBalance','Savings Account Balance']].map(([name,label]) => (
                <div className="form-group" key={name}>
                  <label>{label}</label>
                  <input type="number" name={name} value={form[name]} onChange={handleChange} onBlur={handleBlur} placeholder="₹ Enter amount" />
                  <FieldError show={isInvalid(name)}>This field cannot be empty</FieldError>
                </div>
              ))}
            </div>
            <div className="form-row">
              {[['fixedDeposits','Fixed Deposits'],['liquidFunds','Liquid Mutual Funds']].map(([name,label]) => (
                <div className="form-group" key={name}>
                  <label>{label}</label>
                  <input type="number" name={name} value={form[name]} onChange={handleChange} onBlur={handleBlur} placeholder="₹ Enter amount" />
                  <FieldError show={isInvalid(name)}>This field cannot be empty</FieldError>
                </div>
              ))}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Monthly Essential Expenses</label>
                <input type="number" name="monthlyExpenses" value={form.monthlyExpenses} onChange={handleChange} onBlur={handleBlur} placeholder="₹ Enter amount" />
                <FieldError show={isInvalid('monthlyExpenses')}>This field cannot be empty</FieldError>
              </div>
              <div className="form-group">
                <label>Income Stability</label>
                <select name="incomeStability" value={form.incomeStability} onChange={handleChange} onBlur={handleBlur}>
                  <option value="">Select</option>
                  <option>Highly Stable (Fixed Salary, Government)</option>
                  <option>Stable (Private Salary, Fixed Income)</option>
                  <option>Moderately Variable (Business, Sales)</option>
                  <option>Highly Variable (Freelance, Business)</option>
                </select>
                <FieldError show={isInvalid('incomeStability')}>This field cannot be empty</FieldError>
              </div>
            </div>
          </div>

          {/* Investment Portfolio */}
          <div className="form-section">
            <h2>Investment Portfolio</h2>
            <div className="form-row">
              {[['equityInvestments','Equity Investments'],['fixedIncomeInvestments','Fixed Income Investments']].map(([name,label]) => (
                <div className="form-group" key={name}>
                  <label>{label}</label>
                  <input type="number" name={name} value={form[name]} onChange={handleChange} onBlur={handleBlur} placeholder="₹ Enter amount" />
                  <FieldError show={isInvalid(name)}>This field cannot be empty</FieldError>
                </div>
              ))}
            </div>
            <div className="form-row">
              {[['realEstateInvestments','Real Estate Investments'],['goldInvestments','Gold & Precious Metals']].map(([name,label]) => (
                <div className="form-group" key={name}>
                  <label>{label}</label>
                  <input type="number" name={name} value={form[name]} onChange={handleChange} onBlur={handleBlur} placeholder="₹ Enter amount" />
                  <FieldError show={isInvalid(name)}>This field cannot be empty</FieldError>
                </div>
              ))}
            </div>
            <div className="form-row">
              {[['retirementAccounts','Retirement Accounts'],['monthlyInvestment','Monthly Investment Amount']].map(([name,label]) => (
                <div className="form-group" key={name}>
                  <label>{label}</label>
                  <input type="number" name={name} value={form[name]} onChange={handleChange} onBlur={handleBlur} placeholder="₹ Enter amount" />
                  <FieldError show={isInvalid(name)}>This field cannot be empty</FieldError>
                </div>
              ))}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Portfolio Diversification</label>
                <select name="portfolioDiversification" value={form.portfolioDiversification} onChange={handleChange} onBlur={handleBlur}>
                  <option value="">Select</option>
                  <option>Highly Diverse</option><option>Moderately Diverse</option><option>Somewhat Diverse</option><option>Concentrated</option>
                </select>
                <FieldError show={isInvalid('portfolioDiversification')}>This field cannot be empty</FieldError>
              </div>
              <div className="form-group">
                <label>Average Annual Return</label>
                <select name="investmentReturn" value={form.investmentReturn} onChange={handleChange} onBlur={handleBlur}>
                  <option value="">Select</option>
                  <option>Negative</option><option>0-5% per annum</option><option>5-10% per annum</option><option>10-15% per annum</option><option>More than 15% per annum</option>
                </select>
                <FieldError show={isInvalid('investmentReturn')}>This field cannot be empty</FieldError>
              </div>
            </div>
          </div>

          {/* Debt & Liabilities */}
          <div className="form-section">
            <h2>Debt & Liabilities</h2>
            <div className="form-row">
              {[['homeLoan','Home Loan Outstanding'],['homeLoanEMI','Home Loan EMI']].map(([name,label]) => (
                <div className="form-group" key={name}>
                  <label>{label}</label>
                  <input type="number" name={name} value={form[name]} onChange={handleChange} onBlur={handleBlur} placeholder="₹ Enter amount" />
                  <FieldError show={isInvalid(name)}>This field cannot be empty</FieldError>
                </div>
              ))}
            </div>
            <div className="form-row">
              {[['carLoan','Car Loan Outstanding'],['carLoanEMI','Car Loan EMI']].map(([name,label]) => (
                <div className="form-group" key={name}>
                  <label>{label}</label>
                  <input type="number" name={name} value={form[name]} onChange={handleChange} onBlur={handleBlur} placeholder="₹ Enter amount" />
                  <FieldError show={isInvalid(name)}>This field cannot be empty</FieldError>
                </div>
              ))}
            </div>
            <div className="form-row">
              {[['personalLoan','Personal Loan Outstanding'],['personalLoanEMI','Personal Loan EMI']].map(([name,label]) => (
                <div className="form-group" key={name}>
                  <label>{label}</label>
                  <input type="number" name={name} value={form[name]} onChange={handleChange} onBlur={handleBlur} placeholder="₹ Enter amount" />
                  <FieldError show={isInvalid(name)}>This field cannot be empty</FieldError>
                </div>
              ))}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Credit Card Debt</label>
                <input type="number" name="creditCardDebt" value={form.creditCardDebt} onChange={handleChange} onBlur={handleBlur} placeholder="₹ Enter amount" />
                <FieldError show={isInvalid('creditCardDebt')}>This field cannot be empty</FieldError>
              </div>
              <div className="form-group">
                <label>Credit Score</label>
                <input type="text" name="creditScore" value={form.creditScore} onChange={handleChange} onBlur={handleBlur} placeholder="Enter score" maxLength="3" />
                <FieldError show={isInvalid('creditScore')}>This field cannot be empty</FieldError>
              </div>
            </div>
          </div>

          {/* Insurance Coverage */}
          <div className="form-section">
            <h2>Insurance Coverage</h2>
            <div className="form-row">
              {[['termInsurance','Term Life Insurance Cover'],['healthInsurance','Health Insurance Cover']].map(([name,label]) => (
                <div className="form-group" key={name}>
                  <label>{label}</label>
                  <input type="number" name={name} value={form[name]} onChange={handleChange} onBlur={handleBlur} placeholder="₹ Enter amount" />
                  <FieldError show={isInvalid(name)}>This field cannot be empty</FieldError>
                </div>
              ))}
            </div>
            <div className="form-row">
              {[['criticalIllness','Critical Illness Cover'],['employerLifeCover','Employer Life Cover']].map(([name,label]) => (
                <div className="form-group" key={name}>
                  <label>{label}</label>
                  <input type="number" name={name} value={form[name]} onChange={handleChange} onBlur={handleBlur} placeholder="₹ Enter amount" />
                  <FieldError show={isInvalid(name)}>This field cannot be empty</FieldError>
                </div>
              ))}
            </div>
            <div className="form-row">
              {[['employerHealthCover','Employer Health Cover'],['homeInsurance','Home Insurance Cover']].map(([name,label]) => (
                <div className="form-group" key={name}>
                  <label>{label}</label>
                  <input type="number" name={name} value={form[name]} onChange={handleChange} onBlur={handleBlur} placeholder="₹ Enter amount" />
                  <FieldError show={isInvalid(name)}>This field cannot be empty</FieldError>
                </div>
              ))}
            </div>
          </div>

          {error && <div style={{ color: '#F04A27', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Calculating...' : 'Check My Wealth Score'}
          </button>
        </form>
      </div>
    </div>
  )
}
