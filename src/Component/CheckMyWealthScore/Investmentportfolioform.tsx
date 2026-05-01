import React, { useState, useRef, useEffect } from "react";
import "./PersonalInfoForm.css";

interface InvestmentData {
  equityInvestments: string;
  fixedIncomeInvestments: string;
  realEstateInvestments: string;
  goldPreciousMetals: string;
  retirementAccounts: string;
  monthlyInvestmentAmount: string;
  portfolioDiversification: string;
  averageAnnualReturn: string;
}

interface Props {
  onNext: (data: InvestmentData) => void;
  onBack: () => void;
}

const amountFields: { key: keyof InvestmentData; label: string }[] = [
  { key: "equityInvestments", label: "Equity Investments" },
  { key: "fixedIncomeInvestments", label: "Fixed Income Investments" },
  { key: "realEstateInvestments", label: "Real Estate Investments" },
  { key: "goldPreciousMetals", label: "Gold & Precious Metals" },
  { key: "retirementAccounts", label: "Retirement Accounts" },
  { key: "monthlyInvestmentAmount", label: "Monthly Investment Amount" },
];

const DIVERSIFICATION_OPTIONS = [
  "Highly Diverse",
  "Moderately Diverse",
  "Low Diversity",
  "Not Diversified",
];

const ANNUAL_RETURN_OPTIONS = [
  "Negative",
  "0–5%",
  "5–10%",
  "10–15%",
  "15%+",
];

/* ─── Inline Custom Dropdown ─── */
interface DropdownProps {
  name: string;
  value: string;
  options: string[];
  onChange: (name: string, value: string) => void;
  isInvalid?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ name, value, options, onChange, isInvalid }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="cdd-wrapper" ref={ref}>
      <div
        className={`cdd-trigger${open ? " cdd-open" : ""}${isInvalid ? " cdd-invalid" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{value}</span>
        <svg
          className={`cdd-chevron${open ? " cdd-chevron-open" : ""}`}
          viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      <div className={`cdd-panel${open ? " cdd-panel-open" : ""}`}>
        {options.map((opt) => (
          <div
            key={opt}
            className={`cdd-option${value === opt ? " cdd-selected" : ""}`}
            onClick={() => { onChange(name, opt); setOpen(false); }}
          >
            <span>{opt}</span>
            {value === opt && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="cdd-check"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Main Form ─── */
const InvestmentPortfolioForm: React.FC<Props> = ({ onNext, onBack }) => {
  const [data, setData] = useState<InvestmentData>({
    equityInvestments: "",
    fixedIncomeInvestments: "",
    realEstateInvestments: "",
    goldPreciousMetals: "",
    retirementAccounts: "",
    monthlyInvestmentAmount: "",
    portfolioDiversification: "Highly Diverse",
    averageAnnualReturn: "Negative",
  });

  const [errors, setErrors] = useState<Partial<InvestmentData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<InvestmentData> = {};
    amountFields.forEach(({ key, label }) => {
      const val = data[key];
      if (val === "" || isNaN(Number(val)) || Number(val) < 0)
        newErrors[key] = `Enter a valid ${label}` as any;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof InvestmentData])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleDropdown = (name: string, value: string) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (validate()) onNext(data);
  };

  return (
    <div className="form-card">
      <div className="form-card-title">Investment Portfolio</div>
      <div className="form-card-subtitle">Your investments and returns</div>

      <div className="row">
        {amountFields.map(({ key, label }) => (
          <div className="col-md-6 form-group-mb" key={key}>
            <label className="form-label-custom">
              {label} <span className="required-star">*</span>
            </label>
            <div className="currency-input-wrap">
              <div className="currency-badge">₹</div>
              <input
                type="number"
                name={key}
                className={`form-control-custom currency-input-field ${errors[key] ? "is-invalid" : ""}`}
                placeholder="Enter amount"
                value={data[key]}
                onChange={handleInputChange}
              />
            </div>
            {errors[key] && <span className="error-msg">{errors[key]}</span>}
          </div>
        ))}

        <div className="col-md-6 form-group-mb">
          <label className="form-label-custom">
            Portfolio Diversification <span className="required-star">*</span>
          </label>
          <Dropdown
            name="portfolioDiversification"
            value={data.portfolioDiversification}
            options={DIVERSIFICATION_OPTIONS}
            onChange={handleDropdown}
          />
        </div>

        <div className="col-md-6 form-group-mb">
          <label className="form-label-custom">
            Average Annual Return <span className="required-star">*</span>
          </label>
          <Dropdown
            name="averageAnnualReturn"
            value={data.averageAnnualReturn}
            options={ANNUAL_RETURN_OPTIONS}
            onChange={handleDropdown}
          />
        </div>
      </div>

      <div className="d-flex gap-3">
        <button
          className="next-btn"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #252525" }}
          onClick={onBack}
        >
          Back
        </button>
        <button className="next-btn" onClick={handleSubmit}>Next</button>
      </div>
    </div>
  );
};

export default InvestmentPortfolioForm;