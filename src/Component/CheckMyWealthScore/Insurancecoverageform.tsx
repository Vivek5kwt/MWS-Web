import React, { useState } from "react";
import "./PersonalInfoForm.css";

interface InsuranceData {
  termLifeInsuranceCover: string;
  healthInsuranceCover: string;
  criticalIllnessCover: string;
  employerLifeCover: string;
  employerHealthCover: string;
  homeInsuranceCover: string;
}

interface Props {
  onSubmit: (data: InsuranceData) => void;
  onBack: () => void;
}

const insuranceFields: { key: keyof InsuranceData; label: string }[] = [
  { key: "termLifeInsuranceCover", label: "Term Life Insurance Cover" },
  { key: "healthInsuranceCover", label: "Health Insurance Cover" },
  { key: "criticalIllnessCover", label: "Critical Illness Cover" },
  { key: "employerLifeCover", label: "Employer Life Cover" },
  { key: "employerHealthCover", label: "Employer Health Cover" },
  { key: "homeInsuranceCover", label: "Home Insurance Cover" },
];

const InsuranceCoverageForm: React.FC<Props> = ({ onSubmit, onBack }) => {
  const [data, setData] = useState<InsuranceData>({
    termLifeInsuranceCover: "",
    healthInsuranceCover: "",
    criticalIllnessCover: "",
    employerLifeCover: "",
    employerHealthCover: "",
    homeInsuranceCover: "",
  });

  const [errors, setErrors] = useState<Partial<InsuranceData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<InsuranceData> = {};
    insuranceFields.forEach(({ key, label }) => {
      const val = data[key];
      if (val === "" || isNaN(Number(val)) || Number(val) < 0)
        newErrors[key] = `Enter a valid ${label}` as any;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof InsuranceData])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = () => {
    if (validate()) onSubmit(data);
  };

  return (
    <div className="form-card">
      <div className="form-card-title">Insurance Coverage</div>
      <div className="form-card-subtitle">Your protection coverage</div>

      <div className="row">
        {insuranceFields.map(({ key, label }) => (
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
                onChange={handleChange}
              />
            </div>
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
        <button className="next-btn" onClick={handleSubmit}>
          Submit Info
        </button>
      </div>
    </div>
  );
};

export default InsuranceCoverageForm;