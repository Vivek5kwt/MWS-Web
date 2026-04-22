import React, { useState } from "react";
import "./WealthScoreForm.css";

interface FormData {
  age: string;
  gender: string;
  monthlyIncome: string;
  maritalStatus: string;
  dependents: string;
  locationTier: string;
  riskProfile: string;
}

const PROGRESS = 20;

const WealthScoreForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    age: "",
    gender: "Male",
    monthlyIncome: "",
    maritalStatus: "Single",
    dependents: "",
    locationTier: "Tier 1 (Metro)",
    riskProfile: "Conservative",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    console.log("Form Data:", formData);
    // Navigate to next step here
  };

  return (
    <div className="wealthscore-page">
      <div className="container-fluid px-0">

        {/* ── Hero Text ── */}
        <div className="text-center mb-2">
          <h1 className="hero-title">
            Let's Personalize Your{" "}
            <span className="highlight">Wealth Score</span>
          </h1>
          <p className="hero-subtitle">
            Fill in your financial details securely. It only takes 2 minutes.
          </p>
        </div>

        {/* ── Trust Badge ── */}
        <div className="d-flex justify-content-center">
          <div className="trust-badge">
            <span>End-End Encryption</span>
            <span className="divider" />
            <span>No Sharing of Data</span>
          </div>
        </div>

        {/* ── Progress Bar ── */}
        <div className="progress-wrapper px-3">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${PROGRESS}%` }}
            />
            <div
              className="progress-bubble"
              style={{ left: `${PROGRESS}%` }}
            >
              {PROGRESS}%
            </div>
          </div>
        </div>

        {/* ── Form Card ── */}
        <div className="form-card">
          <p className="form-section-title">Personal Informations</p>

          {/* Age & Gender */}
          <div className="row form-row g-3">
            <div className="col-12 col-sm-6">
              <label className="field-label">
                Age <span className="required-star">*</span>
              </label>
              <input
                type="number"
                name="age"
                className="field-input"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
                min={1}
                max={120}
              />
            </div>
            <div className="col-12 col-sm-6">
              <label className="field-label">
                Gender <span className="required-star">*</span>
              </label>
              <select
                name="gender"
                className="field-select"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* Monthly Income */}
          <div className="form-row">
            <label className="field-label">
              Monthly Income <span className="required-star">*</span>
            </label>
            <div className="currency-input-group">
              <span className="currency-prefix">
                ₹
                <svg viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1l4 4 4-4" stroke="#888" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="number"
                name="monthlyIncome"
                className="currency-field"
                placeholder="Enter amount"
                value={formData.monthlyIncome}
                onChange={handleChange}
                min={0}
              />
            </div>
          </div>

          {/* Marital Status & Dependents */}
          <div className="row form-row g-3">
            <div className="col-12 col-sm-6">
              <label className="field-label">
                Marital Status <span className="required-star">*</span>
              </label>
              <select
                name="maritalStatus"
                className="field-select"
                value={formData.maritalStatus}
                onChange={handleChange}
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            <div className="col-12 col-sm-6">
              <label className="field-label">
                Number of Dependents <span className="required-star">*</span>
              </label>
              <input
                type="number"
                name="dependents"
                className="field-input"
                placeholder="Enter count"
                value={formData.dependents}
                onChange={handleChange}
                min={0}
              />
            </div>
          </div>

          {/* Location Tier & Risk Profile */}
          <div className="row form-row g-3">
            <div className="col-12 col-sm-6">
              <label className="field-label">
                Location Tier <span className="required-star">*</span>
              </label>
              <select
                name="locationTier"
                className="field-select"
                value={formData.locationTier}
                onChange={handleChange}
              >
                <option value="Tier 1 (Metro)">Tier 1 (Metro)</option>
                <option value="Tier 2">Tier 2</option>
                <option value="Tier 3">Tier 3</option>
                <option value="Rural">Rural</option>
              </select>
            </div>
            <div className="col-12 col-sm-6">
              <label className="field-label">
                Risk Profile <span className="required-star">*</span>
              </label>
              <select
                name="riskProfile"
                className="field-select"
                value={formData.riskProfile}
                onChange={handleChange}
              >
                <option value="Conservative">Conservative</option>
                <option value="Moderate">Moderate</option>
                <option value="Aggressive">Aggressive</option>
              </select>
            </div>
          </div>

          {/* Next Button */}
          <button className="btn-next" onClick={handleNext}>
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default WealthScoreForm;
