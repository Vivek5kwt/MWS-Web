import React, { useState } from "react";
import { useSelector } from "react-redux";
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

const mapLocationTier = (tier: string): string => {
  if (tier.includes("Tier 1")) return "Tier I";
  if (tier.includes("Tier 2")) return "Tier II";
  if (tier.includes("Tier 3")) return "Tier III";
  return "Tier IV";
};

const mapIncomeStability = (stability: string): string => {
  if (stability.startsWith("Highly Stable")) return "Highly Stable";
  if (stability.startsWith("Stable")) return "Stable";
  if (stability.startsWith("Moderate")) return "Moderate";
  return "Unstable";
};

const mapMaritalStatus = (status: string): string => status.toLowerCase();

const mapAverageAnnualReturn = (val: string): number => {
  if (val === "Negative") return -5;
  if (val === "0–5%") return 2.5;
  if (val === "5–10%") return 7.5;
  if (val === "10–15%") return 12.5;
  return 15;
};

const CheckMyWealthScore: React.FC = () => {
  const { token } = useSelector((state: any) => state.auth);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  // const [navOpen, setNavOpen] = useState(false);
  const [allData, setAllData] = useState<Record<string, any>>({});
  const [liquidityScore, setLiquidityScore] = useState(0);
  const [debtScore, setDebtScore] = useState(0);
  const [insuranceScore, setInsuranceScore] = useState(0);
  const [investmentScore, setInvestmentScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [liquidityInterp, setLiquidityInterp] = useState("");
  const [debtInterp, setDebtInterp] = useState("");
  const [insuranceInterp, setInsuranceInterp] = useState("");
  const [investmentInterp, setInvestmentInterp] = useState("");
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleNext = (stepData: any, key: string) => {
    setAllData((prev) => ({ ...prev, [key]: stepData }));
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinalSubmit = async (insuranceData: any) => {
    setAllData((prev) => ({ ...prev, insurance: insuranceData }));
    setApiLoading(true);
    setApiError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      const { personalInfo, liquidity, investment, debt } = allData as Record<string, any>;

      // const loans: any[] = [];
      // if (Number(debt.homeLoanOutstanding) > 0)
      //   loans.push({ type: "Home Loan", outstanding: Number(debt.homeLoanOutstanding), emi: Number(debt.homeLoanEMI) });
      // if (Number(debt.carLoanOutstanding) > 0)
      //   loans.push({ type: "Car Loan", outstanding: Number(debt.carLoanOutstanding), emi: Number(debt.carLoanEMI) });
      // if (Number(debt.personalLoanOutstanding) > 0)
      //   loans.push({ type: "Personal Loan", outstanding: Number(debt.personalLoanOutstanding), emi: Number(debt.personalLoanEMI) });
      const loansForLiquidity: any[] = [];
const loansForDebt: any[] = [];

if (Number(debt.homeLoanOutstanding) > 0) {
  loansForLiquidity.push({ type: "Home Loan", outstanding: Number(debt.homeLoanOutstanding), emi: Number(debt.homeLoanEMI) });
  loansForDebt.push({ type: "Home Loan", outstanding: Number(debt.homeLoanOutstanding), emi: Number(debt.homeLoanEMI) });
}
if (Number(debt.carLoanOutstanding) > 0) {
  loansForLiquidity.push({ type: "Car Loan", outstanding: Number(debt.carLoanOutstanding), emi: Number(debt.carLoanEMI) });
  loansForDebt.push({ type: "Car Loan", outstanding: Number(debt.carLoanOutstanding), emi: Number(debt.carLoanEMI) });
}
if (Number(debt.personalLoanOutstanding) > 0) {
  loansForLiquidity.push({ type: "Personal Loan", outstanding: Number(debt.personalLoanOutstanding), emi: Number(debt.personalLoanEMI) });
  loansForDebt.push({ type: "Personal Loan", outstanding: Number(debt.personalLoanOutstanding), emi: Number(debt.personalLoanEMI) });
}

      const sharedLiquidityAssessment = {
        cash_in_hand: Number(liquidity.cashInHand),
        savings_account_balance: Number(liquidity.savingsAccountBalance),
        fixed_deposits: Number(liquidity.fixedDeposits),
        liquid_mutual_funds: Number(liquidity.liquidMutualFunds),
        monthly_essential_expenses: Number(liquidity.monthlyEssentialExpenses),
      };

      const sharedInvestmentPortfolio = {
        equity_investments: Number(investment.equityInvestments),
        fixed_income_investments: Number(investment.fixedIncomeInvestments),
        real_estate_investments: Number(investment.realEstateInvestments),
        gold_precious_metals: Number(investment.goldPreciousMetals),
        retirement_accounts: Number(investment.retirementAccounts),
      };

      const liquidityBody = {
        personal_information: {
          age: Number(personalInfo.age),
          monthly_income: Number(personalInfo.monthlyIncome),
          number_of_dependents: Number(personalInfo.numberOfDependents),
          location_tier: mapLocationTier(personalInfo.locationTier),
        },
        liquidity_assessment: {
          ...sharedLiquidityAssessment,
          income_stability: mapIncomeStability(liquidity.incomeStability),
        },
        debt_liabilities: {
           loans: loansForLiquidity,  
  credit_card_debt: Number(debt.creditCardDebt),
        },
      };

      const debtBody = {
        personal_information: {
          monthly_income: Number(personalInfo.monthlyIncome),
        },
        liquidity_assessment: {
          ...sharedLiquidityAssessment,
          income_stability: mapIncomeStability(liquidity.incomeStability),
        },
        investment_portfolio: sharedInvestmentPortfolio,
        debt_liabilities: {
  loans: loansForDebt,       
  credit_card_debt: Number(debt.creditCardDebt),
  credit_score: Number(debt.creditScore) || 300,
},
      };

      const insuranceBody = {
        personal_information: {
          age: Number(personalInfo.age),
          marital_status: mapMaritalStatus(personalInfo.maritalStatus),
          number_of_dependents: Number(personalInfo.numberOfDependents),
          location_tier: mapLocationTier(personalInfo.locationTier),
        },
        liquidity_assessment: sharedLiquidityAssessment,
        investment_portfolio: sharedInvestmentPortfolio,
        debt_liabilities: {
          loans: loansForDebt,
          credit_card_debt: Number(debt.creditCardDebt),
        },
        insurance_coverage: {
          term_life_insurance_cover: Number(insuranceData.termLifeInsuranceCover),
          health_insurance_cover: Number(insuranceData.healthInsuranceCover),
        },
        goals_corpus: 0,
      };
      
      const investmentBody = {
        personal_information: {
          age: Number(personalInfo.age),
        },
        investment_portfolio: {
          ...sharedInvestmentPortfolio,
          monthly_investment_amount: Number(investment.monthlyInvestmentAmount),
          average_annual_return: mapAverageAnnualReturn(investment.averageAnnualReturn),
        },
      };

      const finalBody = {
        personal_information: {
          age: Number(personalInfo.age),
          monthly_income: Number(personalInfo.monthlyIncome),
          marital_status: mapMaritalStatus(personalInfo.maritalStatus),
          number_of_dependents: Number(personalInfo.numberOfDependents),
          location_tier: mapLocationTier(personalInfo.locationTier),
          risk_profile: personalInfo.riskProfile,
        },
        liquidity_assessment: {
          ...sharedLiquidityAssessment,
          income_stability: mapIncomeStability(liquidity.incomeStability),
        },
        investment_portfolio: {
          ...sharedInvestmentPortfolio,
          monthly_investment_amount: Number(investment.monthlyInvestmentAmount),
          portfolio_diversification: investment.portfolioDiversification,
          average_annual_return: mapAverageAnnualReturn(investment.averageAnnualReturn),
        },
        debt_liabilities: {
          loans: loansForDebt,
          credit_card_debt: Number(debt.creditCardDebt),
          credit_score: Number(debt.creditScore) || 300,
        },
        insurance_coverage: {
          term_life_insurance_cover: Number(insuranceData.termLifeInsuranceCover),
          health_insurance_cover: Number(insuranceData.healthInsuranceCover),
          household_insurance: Number(insuranceData.homeInsuranceCover),
          motor_insurance: 0,
          quality_of_insurer: "High",
        },
        goals_corpus: 0,
      };

      const postJSON = (url: string, body: object) =>
        fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

      const [liqRes, debtRes, insRes, invRes, finRes] = await Promise.all([
        postJSON("http://3.110.223.162:8000/api/liquidity/calculate", liquidityBody),
        postJSON("http://3.110.223.162:8000/api/debt/calculate", debtBody),
        postJSON("http://3.110.223.162:8000/api/insurance/calculate", insuranceBody),
        postJSON("http://3.110.223.162:8000/api/investment/calculate", investmentBody),
        postJSON("http://3.110.223.162:8000/api/final/calculate", finalBody),
      ]);

      if (!liqRes.ok) { const e = await liqRes.text(); console.error("Liquidity error:", e); throw new Error(`Liquidity API ${liqRes.status}`); }
      if (!debtRes.ok) { const e = await debtRes.text(); console.error("Debt error:", e); throw new Error(`Debt API ${debtRes.status}`); }
      if (!insRes.ok) { const e = await insRes.text(); console.error("Insurance error:", e); throw new Error(`Insurance API ${insRes.status}`); }
      if (!invRes.ok) { const e = await invRes.text(); console.error("Investment error:", e); throw new Error(`Investment API ${invRes.status}`); }
      if (!finRes.ok) { const e = await finRes.text(); console.error("Final error:", e); throw new Error(`Final API ${finRes.status}`); }

      const [liqResult, debtResult, insResult, invResult, finResult] = await Promise.all([
        liqRes.json(), debtRes.json(), insRes.json(), invRes.json(), finRes.json(),
      ]);

      console.log("Liquidity:", JSON.stringify(liqResult));
      console.log("Debt:", JSON.stringify(debtResult));
      console.log("Insurance:", JSON.stringify(insResult));
      console.log("Investment:", JSON.stringify(invResult));
      console.log("Final:", JSON.stringify(finResult));

      setLiquidityScore(liqResult.total_score);
      setDebtScore(debtResult.total_score);
      setInsuranceScore(insResult.insurance_score);
      setInvestmentScore(invResult.investment_score);
      setFinalScore(finResult.final_score);
      setLiquidityInterp(liqResult.interpretation ?? "");
      setDebtInterp(debtResult.interpretation ?? "");
      setInsuranceInterp(insResult.interpretation ?? "");
      setInvestmentInterp(invResult.interpretation ?? "");

      // Always save to localStorage so homepage can read immediately
      const scorePayload = {
        final_score:      finResult.final_score,
        liquidity_score:  liqResult.total_score,
        debt_score:       debtResult.total_score,
        insurance_score:  insResult.insurance_score,
        investment_score: invResult.investment_score,
      };
      localStorage.setItem("wealthScores", JSON.stringify(scorePayload));

      // Also try to persist to backend (non-blocking, fail silently)
      try {
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;
        const saveRes = await fetch("https://admin.mywealthscore.ai/api/wealth-score", {
          method: "POST",
          headers,
          body: JSON.stringify(scorePayload),
        });
        const saveBody = await saveRes.json().catch(() => null);
        console.log("[wealth-score POST]", saveRes.status, saveBody);
      } catch (e) {
        console.error("[wealth-score POST] failed:", e);
      }

      setSubmitted(true);
    } catch (err) {
      console.error("API call failed:", err);
      setApiError(`Failed to calculate your score. Please try again. (${err instanceof Error ? err.message : "Unknown error"})`);
    } finally {
      setApiLoading(false);
    }
  };
    
  return (
    <div className="wealth-page">

      {/* ========== HERO (hidden after submission) ========== */}
      {!submitted && !apiLoading && (
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
          {apiLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-light" role="status" />
              <p className="mt-3" style={{ color: "#aaa" }}>Calculating your wealth score...</p>
            </div>
          ) : submitted ? (
            <WealthScoreResult
              liquidityScore={liquidityScore}
              debtScore={debtScore}
              insuranceScore={insuranceScore}
              investmentScore={investmentScore}
              finalScore={finalScore}
              liquidityInterp={liquidityInterp}
              debtInterp={debtInterp}
              insuranceInterp={insuranceInterp}
              investmentInterp={investmentInterp}
            />
          ) : (
            <>
              {/* Progress Bar */}
              <div className="mb-4">
                <ProgressBar steps={STEPS} currentStep={currentStep} />
              </div>

              {apiError && (
                <div className="alert alert-danger mb-3" role="alert">{apiError}</div>
              )}

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