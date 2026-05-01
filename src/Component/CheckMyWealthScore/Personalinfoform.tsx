import React, { useState, useRef, useEffect } from "react";
import "./PersonalInfoForm.css";

interface PersonalInfoData {
  age: string;
  gender: string;
  monthlyIncome: string;
  maritalStatus: string;
  numberOfDependents: string;
  locationTier: string;
  riskProfile: string;
}

interface Props {
  onNext: (data: PersonalInfoData) => void;
}

const GENDER_OPTIONS = ["Male", "Female", "Other"];
const MARITAL_OPTIONS = ["Single", "Married", "Divorced", "Widowed"];
const LOCATION_OPTIONS = ["Tier 1 (Metro)", "Tier 2 City", "Tier 3 City/ Town", "Rural Area"];
const RISK_OPTIONS = ["Conservative", "Moderate", "Aggressive"];

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
      {/* Trigger */}
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

      {/* Panel */}
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
const PersonalInfoForm: React.FC<Props> = ({ onNext }) => {
  const [data, setData] = useState<PersonalInfoData>({
    age: "",
    gender: "Male",
    monthlyIncome: "",
    maritalStatus: "Single",
    numberOfDependents: "",
    locationTier: "Tier 1 (Metro)",
    riskProfile: "Conservative",
  });

  const [errors, setErrors] = useState<Partial<PersonalInfoData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<PersonalInfoData> = {};
    if (!data.age || isNaN(Number(data.age)) || Number(data.age) < 18 || Number(data.age) > 100)
      newErrors.age = "Enter a valid age (18–100)";
    if (!data.monthlyIncome || isNaN(Number(data.monthlyIncome)) || Number(data.monthlyIncome) <= 0)
      newErrors.monthlyIncome = "Enter a valid monthly income";
    if (data.numberOfDependents === "" || isNaN(Number(data.numberOfDependents)) || Number(data.numberOfDependents) < 0)
      newErrors.numberOfDependents = "Enter a valid number (0 or more)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof PersonalInfoData])
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
      <div className="form-card-title">Personal Informations</div>
      <div className="form-card-subtitle">Tell us about yourself</div>

      <div className="row">
        {/* Age */}
        <div className="col-md-6 form-group-mb">
          <label className="form-label-custom">Age <span className="required-star">*</span></label>
          <input
            type="number" name="age"
            className={`form-control-custom ${errors.age ? "is-invalid" : ""}`}
            placeholder="Enter your age"
            value={data.age} onChange={handleInputChange}
          />
          {errors.age && <span className="error-msg">{errors.age}</span>}
        </div>

        {/* Gender */}
        <div className="col-md-6 form-group-mb">
          <label className="form-label-custom">Gender <span className="required-star">*</span></label>
          <Dropdown name="gender" value={data.gender} options={GENDER_OPTIONS} onChange={handleDropdown} />
        </div>

        {/* Monthly Income */}
        <div className="col-12 form-group-mb">
          <label className="form-label-custom">Monthly Income <span className="required-star">*</span></label>
          <div className="currency-input-wrap">
            <div className="currency-badge">₹</div>
            <input
              type="number" name="monthlyIncome"
              className={`form-control-custom currency-input-field ${errors.monthlyIncome ? "is-invalid" : ""}`}
              placeholder="Enter amount"
              value={data.monthlyIncome} onChange={handleInputChange}
            />
          </div>
          {errors.monthlyIncome && <span className="error-msg">{errors.monthlyIncome}</span>}
        </div>

        {/* Marital Status */}
        <div className="col-md-6 form-group-mb">
          <label className="form-label-custom">Marital Status <span className="required-star">*</span></label>
          <Dropdown name="maritalStatus" value={data.maritalStatus} options={MARITAL_OPTIONS} onChange={handleDropdown} />
        </div>

        {/* Number of Dependents */}
        <div className="col-md-6 form-group-mb">
          <label className="form-label-custom">Number of Dependents <span className="required-star">*</span></label>
          <input
            type="number" name="numberOfDependents"
            className={`form-control-custom ${errors.numberOfDependents ? "is-invalid" : ""}`}
            placeholder="Enter count"
            value={data.numberOfDependents} onChange={handleInputChange}
          />
          {errors.numberOfDependents && <span className="error-msg">{errors.numberOfDependents}</span>}
        </div>

        {/* Location Tier */}
        <div className="col-md-6 form-group-mb">
          <label className="form-label-custom">Location Tier <span className="required-star">*</span></label>
          <Dropdown name="locationTier" value={data.locationTier} options={LOCATION_OPTIONS} onChange={handleDropdown} />
        </div>

        {/* Risk Profile */}
        <div className="col-md-6 form-group-mb">
          <label className="form-label-custom">Risk Profile <span className="required-star">*</span></label>
          <Dropdown name="riskProfile" value={data.riskProfile} options={RISK_OPTIONS} onChange={handleDropdown} />
        </div>
      </div>

      <button className="next-btn" onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default PersonalInfoForm;