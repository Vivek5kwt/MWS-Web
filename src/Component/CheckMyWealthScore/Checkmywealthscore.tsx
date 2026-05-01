import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./checkmywealthscore.css";
import ProgressBar from "./Progressbar";
import PersonalInfoForm from "./Personalinfoform";
import LiquidityForm from "./Liquidityform";
import InvestmentPortfolioForm from "./Investmentportfolioform";
import DebtLiabilitiesForm from "./Debtliabilitiesform";
import InsuranceCoverageForm from "./Insurancecoverageform";
import WealthScoreResult from "./WealthScoreFinalResult";

const STEPS = [
  { id: 1, label: "Personal\nInformation" },
  { id: 2, label: "Liquidity\nAssessment" },
  { id: 3, label: "Investment\nPortfolio" },
  { id: 4, label: "Debt &\nLiabilities" },
  { id: 5, label: "Insurance\nCoverage" },
];
 
const CheckMyWealthScore: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [allData, setAllData] = useState<Record<string, any>>({});
 
  const handleNext = (stepData: any, key: string) => {
    setAllData((prev) => ({ ...prev, [key]: stepData }));
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
 
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
 
  const handleFinalSubmit = (data: any) => {
    setAllData((prev) => ({ ...prev, insurance: data }));
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log("Final Submission Data:", { ...allData, insurance: data });
  };
 
  return (
    <div className="wealth-page">

      {/* ========== HERO (hidden after submission) ========== */}
      {!submitted && (
        <section className="hero-section">
          <h1 className="hero-title">
            Let's Personalize Your <span className="highlight">Wealth Score</span>
          </h1>
          <p className="hero-subtitle">
            Fill in your financial details securely. It only takes 2 minutes.
          </p>
          <div className="trust-badge">
            <span>🔒 End-End Encryption</span>
            <div className="trust-divider" />
            <span>🚫 No Sharing of Data</span>
          </div>
        </section>
      )}
 
      {/* ========== MAIN CONTENT ========== */}
      <main className="wealth-main">
        <div className="container">
          {submitted ? (
            <WealthScoreResult />
          ) : (
            <>
              {/* Progress Bar */}
              <div className="mb-4">
                <ProgressBar steps={STEPS} currentStep={currentStep} />
              </div>
 
              {/* Step Forms */}
              {currentStep === 1 && (
                <PersonalInfoForm
                  onNext={(data) => handleNext(data, "personalInfo")}
                />
              )}
              {currentStep === 2 && (
                <LiquidityForm
                  onNext={(data) => handleNext(data, "liquidity")}
                  onBack={handleBack}
                />
              )}
              {currentStep === 3 && (
                <InvestmentPortfolioForm
                  onNext={(data) => handleNext(data, "investment")}
                  onBack={handleBack}
                />
              )}
              {currentStep === 4 && (
                <DebtLiabilitiesForm
                  onNext={(data) => handleNext(data, "debt")}
                  onBack={handleBack}
                />
              )}
              {currentStep === 5 && (
                <InsuranceCoverageForm
                  onSubmit={handleFinalSubmit}
                  onBack={handleBack}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};
 
export default CheckMyWealthScore;