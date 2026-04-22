import React, { useState, ChangeEvent } from "react";
import "./WealthScoreFormn.css";

// ── Types ──────────────────────────────────────────────
interface FormState {
  age: string;
  monthlyIncome: string;
  maritalStatus: string;
  numberOfDependents: string;
  locationTier: string;
  riskProfile: string;
  cashInHand: string;
  savingsAccountBalance: string;
  fixedDeposits: string;
  liquidMutualFunds: string;
  monthlyEssentialExpenses: string;
  incomeStability: string;
  equityInvestments: string;
  fixedIncomeInvestments: string;
  realEstateInvestments: string;
  goldPreciousMetals: string;
  retirementAccounts: string;
  monthlyInvestmentAmount: string;
  portfolioDiversification: string;
  averageAnnualReturn: string;
  homeLoanOutstanding: string;
  homeLoanEMI: string;
  carLoanOutstanding: string;
  carLoanEMI: string;
  personalLoanOutstanding: string;
  personalLoanEMI: string;
  creditCardDebt: string;
  creditScore: string;
  termLifeInsuranceCover: string;
  healthInsuranceCover: string;
  criticalIllnessCover: string;
  employerLifeCover: string;
  employerHealthCover: string;
  homeInsuranceCover: string;
}

const initialForm: FormState = {
  age: "", monthlyIncome: "", maritalStatus: "Single", numberOfDependents: "",
  locationTier: "Tier 1 (Metro)", riskProfile: "Conservative",
  cashInHand: "", savingsAccountBalance: "", fixedDeposits: "", liquidMutualFunds: "",
  monthlyEssentialExpenses: "", incomeStability: "Highly Stable (Fixed Salary, Government)",
  equityInvestments: "", fixedIncomeInvestments: "", realEstateInvestments: "",
  goldPreciousMetals: "", retirementAccounts: "", monthlyInvestmentAmount: "",
  portfolioDiversification: "Highly Diverse", averageAnnualReturn: "Negative",
  homeLoanOutstanding: "", homeLoanEMI: "", carLoanOutstanding: "", carLoanEMI: "",
  personalLoanOutstanding: "", personalLoanEMI: "", creditCardDebt: "", creditScore: "",
  termLifeInsuranceCover: "", healthInsuranceCover: "", criticalIllnessCover: "",
  employerLifeCover: "", employerHealthCover: "", homeInsuranceCover: "",
};

// ── Sub-components ─────────────────────────────────────

const PlainInput: React.FC<{
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}> = ({ label, name, value, onChange, placeholder = "Enter amount", type = "text" }) => (
  <div className="wf-field">
    <label className="wf-label" htmlFor={name}>
      {label}<span className="req">*</span>
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="wf-input"
      autoComplete="off"
    />
  </div>
);

const CurrencyInput: React.FC<{
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, value, onChange }) => (
  <div className="wf-field">
    <label className="wf-label" htmlFor={name}>
      {label}<span className="req">*</span>
    </label>
    <div className="wf-input-group">
      <span className="wf-input-group__prefix">
        ₹<span className="wf-input-group__prefix-chevron">▾</span>
      </span>
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Enter amount"
        className="wf-input-group__field"
        autoComplete="off"
      />
    </div>
  </div>
);

const SelectInput: React.FC<{
  label: string;
  name: keyof FormState;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}> = ({ label, name, value, onChange, options }) => (
  <div className="wf-field">
    <label className="wf-label" htmlFor={name}>
      {label}<span className="req">*</span>
    </label>
    <select id={name} name={name} value={value} onChange={onChange} className="wf-select">
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

// ── Main Component ─────────────────────────────────────

const WealthScoreFormn: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialForm);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // Plug in your API call here
  };

  return (
    <div className="wf-page">

      {/* ── Hero ── */}
      <div className="wf-hero">
        <h1 className="wf-hero__title">
          Let's Personalize Your <span>Wealth Score</span>
        </h1>
        <p className="wf-hero__sub">
          Fill in your financial details securely. It only takes 2 minutes.
        </p>
        <div className="wf-badge">
          <span>End-End Encryption</span>
          <span className="wf-badge__divider" />
          <span>No Sharing of Data</span>
        </div>
      </div>

      {/* ── Form Card ── */}
      <div className="wf-card">

        {/* Personal Information */}
        <div className="wf-section">
          <h2 className="wf-section__title">Personal Informations</h2>
          <div className="wf-grid">
            <PlainInput label="Age" name="age" value={form.age} onChange={handleInput}
              placeholder="Enter your age" type="number" />
            <CurrencyInput label="Monthly Income" name="monthlyIncome" value={form.monthlyIncome} onChange={handleInput} />
            <SelectInput label="Marital Status" name="maritalStatus" value={form.maritalStatus} onChange={handleSelect}
              options={["Single", "Married", "Divorced", "Widowed"]} />
            <PlainInput label="Number of Dependents" name="numberOfDependents" value={form.numberOfDependents}
              onChange={handleInput} placeholder="Enter count" type="number" />
            <SelectInput label="Location Tier" name="locationTier" value={form.locationTier} onChange={handleSelect}
              options={["Tier 1 (Metro)", "Tier 2", "Tier 3", "Rural"]} />
            <SelectInput label="Risk Profile" name="riskProfile" value={form.riskProfile} onChange={handleSelect}
              options={["Conservative", "Moderate", "Aggressive", "Very Aggressive"]} />
          </div>
        </div>

        {/* Liquidity Assessment */}
        <div className="wf-section">
          <h2 className="wf-section__title">Liquidity Assessment</h2>
          <div className="wf-grid">
            <CurrencyInput label="Cash in Hand" name="cashInHand" value={form.cashInHand} onChange={handleInput} />
            <CurrencyInput label="Savings Account Balance" name="savingsAccountBalance" value={form.savingsAccountBalance} onChange={handleInput} />
            <CurrencyInput label="Fixed Deposits" name="fixedDeposits" value={form.fixedDeposits} onChange={handleInput} />
            <CurrencyInput label="Liquid Mutual Funds" name="liquidMutualFunds" value={form.liquidMutualFunds} onChange={handleInput} />
            <CurrencyInput label="Monthly Essential Expenses" name="monthlyEssentialExpenses" value={form.monthlyEssentialExpenses} onChange={handleInput} />
            <SelectInput label="Income Stability" name="incomeStability" value={form.incomeStability} onChange={handleSelect}
              options={[
                "Highly Stable (Fixed Salary, Government)",
                "Stable (Private Sector)",
                "Moderate (Freelance / Business)",
                "Unstable (Variable Income)",
              ]} />
          </div>
        </div>

        {/* Investment Portfolio */}
        <div className="wf-section">
          <h2 className="wf-section__title">Investment Portfolio</h2>
          <div className="wf-grid">
            <CurrencyInput label="Equity Investments" name="equityInvestments" value={form.equityInvestments} onChange={handleInput} />
            <CurrencyInput label="Fixed Income Investments" name="fixedIncomeInvestments" value={form.fixedIncomeInvestments} onChange={handleInput} />
            <CurrencyInput label="Real Estate Investments" name="realEstateInvestments" value={form.realEstateInvestments} onChange={handleInput} />
            <CurrencyInput label="Gold & Precious Metals" name="goldPreciousMetals" value={form.goldPreciousMetals} onChange={handleInput} />
            <CurrencyInput label="Retirement Accounts" name="retirementAccounts" value={form.retirementAccounts} onChange={handleInput} />
            <CurrencyInput label="Monthly Investment Amount" name="monthlyInvestmentAmount" value={form.monthlyInvestmentAmount} onChange={handleInput} />
            <SelectInput label="Portfolio Diversification" name="portfolioDiversification" value={form.portfolioDiversification} onChange={handleSelect}
              options={["Highly Diverse", "Moderately Diverse", "Concentrated", "Single Asset"]} />
            <SelectInput label="Average Annual Return" name="averageAnnualReturn" value={form.averageAnnualReturn} onChange={handleSelect}
              options={["Negative", "0–5%", "5–10%", "10–15%", "15%+"]} />
          </div>
        </div>

        {/* Debt & Liabilities */}
        <div className="wf-section">
          <h2 className="wf-section__title">Debt & Liabilities</h2>
          <div className="wf-grid">
            <CurrencyInput label="Home Loan Outstanding" name="homeLoanOutstanding" value={form.homeLoanOutstanding} onChange={handleInput} />
            <CurrencyInput label="Home Loan EMI" name="homeLoanEMI" value={form.homeLoanEMI} onChange={handleInput} />
            <CurrencyInput label="Car Loan Outstanding" name="carLoanOutstanding" value={form.carLoanOutstanding} onChange={handleInput} />
            <CurrencyInput label="Car Loan EMI" name="carLoanEMI" value={form.carLoanEMI} onChange={handleInput} />
            <CurrencyInput label="Personal Loan Outstanding" name="personalLoanOutstanding" value={form.personalLoanOutstanding} onChange={handleInput} />
            <CurrencyInput label="Personal Loan EMI" name="personalLoanEMI" value={form.personalLoanEMI} onChange={handleInput} />
            <CurrencyInput label="Credit Card Debt" name="creditCardDebt" value={form.creditCardDebt} onChange={handleInput} />
            <PlainInput label="Credit Score" name="creditScore" value={form.creditScore}
              onChange={handleInput} placeholder="Enter score" type="number" />
          </div>
        </div>

        {/* Insurance Coverage */}
        <div className="wf-section">
          <h2 className="wf-section__title">Insurance Coverage</h2>
          <div className="wf-grid">
            <CurrencyInput label="Term Life Insurance Cover" name="termLifeInsuranceCover" value={form.termLifeInsuranceCover} onChange={handleInput} />
            <CurrencyInput label="Health Insurance Cover" name="healthInsuranceCover" value={form.healthInsuranceCover} onChange={handleInput} />
            <CurrencyInput label="Critical Illness Cover" name="criticalIllnessCover" value={form.criticalIllnessCover} onChange={handleInput} />
            <CurrencyInput label="Employer Life Cover" name="employerLifeCover" value={form.employerLifeCover} onChange={handleInput} />
            <CurrencyInput label="Employer Health Cover" name="employerHealthCover" value={form.employerHealthCover} onChange={handleInput} />
            <CurrencyInput label="Home Insurance Cover" name="homeInsuranceCover" value={form.homeInsuranceCover} onChange={handleInput} />
          </div>
        </div>

        {/* Submit */}
        <div className="wf-submit-wrapper">
          <button className="wf-submit" onClick={handleSubmit}>
            Check My Wealth Score
          </button>
        </div>

      </div>
    </div>
  );
};

export default WealthScoreFormn;
