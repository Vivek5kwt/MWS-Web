import React, { useState } from "react";
import "./PersonalInfoForm.css";

interface DebtData {
  homeLoanOutstanding: string;
  homeLoanEMI: string;
  carLoanOutstanding: string;
  carLoanEMI: string;
  personalLoanOutstanding: string;
  personalLoanEMI: string;
  creditCardDebt: string;
  creditScore: string;
}

interface Props {
  onNext: (data: DebtData) => void;
  onBack: () => void;
}

const amountFields: { key: keyof DebtData; label: string; isCurrency: boolean }[] = [
  { key: "homeLoanOutstanding", label: "Home Loan Outstanding", isCurrency: true },
  { key: "homeLoanEMI", label: "Home Loan EMI", isCurrency: true },
  { key: "carLoanOutstanding", label: "Car Loan Outstanding", isCurrency: true },
  { key: "carLoanEMI", label: "Car Loan EMI", isCurrency: true },
  { key: "personalLoanOutstanding", label: "Personal Loan Outstanding", isCurrency: true },
  { key: "personalLoanEMI", label: "Personal Loan EMI", isCurrency: true },
  { key: "creditCardDebt", label: "Credit Card Debt", isCurrency: true },
  { key: "creditScore", label: "Credit Score", isCurrency: false },
];

const DebtLiabilitiesForm: React.FC<Props> = ({ onNext, onBack }) => {
  const [data, setData] = useState<DebtData>({
    homeLoanOutstanding: "",
    homeLoanEMI: "",
    carLoanOutstanding: "",
    carLoanEMI: "",
    personalLoanOutstanding: "",
    personalLoanEMI: "",
    creditCardDebt: "",
    creditScore: "",
  });

  const [errors, setErrors] = useState<Partial<DebtData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<DebtData> = {};
    amountFields.forEach(({ key, label }) => {
      const val = data[key];
      if (val === "" || isNaN(Number(val)) || Number(val) < 0)
        newErrors[key] = `Enter a valid ${label}` as any;
      if (key === "creditScore" && val !== "" && (Number(val) < 300 || Number(val) > 900))
        newErrors[key] = "Credit Score must be between 300–900" as any;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof DebtData])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = () => {
    if (validate()) onNext(data);
  };

  return (
    <div className="form-card">
      <div className="form-card-title">Debt & Liabilities</div>
      <div className="form-card-subtitle">Your outstanding loans and debts</div>

      <div className="row">
        {amountFields.map(({ key, label, isCurrency }) => (
          <div className="col-md-6 form-group-mb" key={key}>
            <label className="form-label-custom">
              {label} <span className="required-star">*</span>
            </label>
            {isCurrency ? (
              <div className="currency-input-wrap">
                <div className="currency-badge">₹</div>
                <input
                  type="number"
                  name={key}
                  className={`form-control-custom currency-input-field ${errors[key] ? "is-invalid" : ""}`}
                  placeholder="Enter amount"
                  value={data[key]}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <input
                type="number"
                name={key}
                className={`form-control-custom ${errors[key] ? "is-invalid" : ""}`}
                placeholder="Enter score"
                value={data[key]}
                onChange={handleChange}
              />
            )}
            {errors[key] && <span className="error-msg">{errors[key]}</span>}
          </div>
        ))}
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

export default DebtLiabilitiesForm;