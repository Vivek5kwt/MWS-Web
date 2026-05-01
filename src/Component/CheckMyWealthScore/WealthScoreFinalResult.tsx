import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./WealthScoreFinalResult.css";
 interface DomainScore {
  id: string;
  name: string;
  percent: string;
  score: number;
  maxScore: number;
  tier: "low" | "medium" | "high";
  badge: string;
  detail: string;
}

interface Recommendation {
  title: string;
  priority: string;
  description: string;
}

/* ─── Static Data (replace with props/API later) ─── */
const DOMAINS: DomainScore[] = [
  {
    id: "liquidity",
    name: "Liquidity",
    percent: "33% of Total Score",
    score: 14,
    maxScore: 100,
    tier: "low",
    badge: "Concerning liquidity position",
    detail:
      "Your emergency fund of 0.0 months is insufficient and leaves you vulnerable to financial shocks. Your current savings rate is 0.0% of income, which needs improvement.",
  },
  {
    id: "investment",
    name: "Investment",
    percent: "29% of Total Score",
    score: 28,
    maxScore: 100,
    tier: "medium",
    badge: "Below average investment portfolio",
    detail:
      "Your investment allocation is below recommended levels. Consider diversifying across equity, debt, and alternate assets to build long-term wealth.",
  },
  {
    id: "debt",
    name: "Debt",
    percent: "23% of Total Score",
    score: 74,
    maxScore: 100,
    tier: "high",
    badge: "Good debt management",
    detail:
      "Your debt-to-income ratio is within healthy limits. Continue maintaining timely repayments to sustain your credit health.",
  },
  {
    id: "insurance",
    name: "Insurance",
    percent: "15% of Total Score",
    score: 45,
    maxScore: 100,
    tier: "medium",
    badge: "Partial insurance coverage",
    detail:
      "You have some insurance coverage but gaps remain in health and term life policies. Aim for at least ₹5–10 lakhs health cover per person.",
  },
];

const RECOMMENDATIONS: Recommendation[] = [
  {
    title: "Build Emergency Fund",
    priority: "Priority: High",
    description:
      "Aim to save 3–6 months of expenses in highly liquid accounts for emergencies. Start with a target of saving ₹0.",
  },
  {
    title: "Start Regular Investment Plan",
    priority: "Priority: High",
    description:
      "Begin investing at least 10–15% of your income (₹0/month) regularly through SIPs in diversified mutual funds.",
  },
  {
    title: "Increase Health Insurance Coverage",
    priority: "Priority: High",
    description:
      "Obtain comprehensive health insurance with at least ₹5–10 lakhs coverage per person. Your current coverage averages only ₹0 per person.",
  },
];

/* ─── Radar Chart SVG ─── */
const WealthScoreFinalResult: React.FC<{ domains: DomainScore[] }> = ({ domains }) => {
  const cx = 200, cy = 200, r = 140;
  const labels = domains.map((d) => d.name);
  const values = domains.map((d) => d.score / 100);
  const rings = [20, 40, 60, 80, 100];
  const n = labels.length;

  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;

  const point = (val: number, i: number) => {
    const a = angle(i);
    return { x: cx + r * val * Math.cos(a), y: cy + r * val * Math.sin(a) };
  };

  const ringPath = (frac: number) => {
    const pts = Array.from({ length: n }, (_, i) => point(frac, i));
    return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
  };

  const dataPath = () => {
    const pts = values.map((v, i) => point(v, i));
    return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
  };

  const labelPos = (i: number) => {
    const a = angle(i);
    const offset = 26;
    return { x: cx + (r + offset) * Math.cos(a), y: cy + (r + offset) * Math.sin(a) };
  };

  return (
    <svg
      className="radar-svg"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grid rings */}
      {rings.map((ring) => (
        <path
          key={ring}
          d={ringPath(ring / 100)}
          fill="none"
          stroke="#2e2e2e"
          strokeWidth="1"
        />
      ))}

      {/* Axis lines */}
      {Array.from({ length: n }, (_, i) => {
        const p = point(1, i);
        return (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={p.x} y2={p.y}
            stroke="#2e2e2e"
            strokeWidth="1"
          />
        );
      })}

      {/* Ring labels */}
      {rings.map((ring) => (
        <text
          key={ring}
          x={cx + 4}
          y={cy - (r * ring) / 100 + 4}
          fill="#555"
          fontSize="9"
          fontFamily="DM Sans, sans-serif"
        >
          {ring}
        </text>
      ))}

      {/* Data polygon */}
      <path
        d={dataPath()}
        fill="rgba(74,158,255,0.15)"
        stroke="#4a9eff"
        strokeWidth="2"
      />

      {/* Data points */}
      {values.map((v, i) => {
        const p = point(v, i);
        return (
          <circle key={i} cx={p.x} cy={p.y} r="5" fill="#4a9eff" stroke="#0e0e0e" strokeWidth="2" />
        );
      })}

      {/* Axis labels */}
      {labels.map((label, i) => {
        const pos = labelPos(i);
        return (
          <text
            key={i}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#aaa"
            fontSize="13"
            fontFamily="Sora, sans-serif"
            fontWeight="500"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
};

/* ─── Animated Score Counter ─── */
const AnimatedScore: React.FC<{ target: number }> = ({ target }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let current = 0;
    const step = Math.ceil(target / 40);
    const tick = () => {
      current = Math.min(current + step, target);
      setDisplay(current);
      if (current < target) ref.current = setTimeout(tick, 30);
    };
    ref.current = setTimeout(tick, 300);
    return () => { if (ref.current) clearTimeout(ref.current); };
  }, [target]);

  return <>{display}</>;
};

/* ─── Domain Card ─── */
const DomainCard: React.FC<{ domain: DomainScore }> = ({ domain }) => {
  const [open, setOpen] = useState(domain.id === "liquidity");

  return (
    <div className="domain-card fade-in">
      <div className="domain-header" onClick={() => setOpen((o) => !o)}>
        <div className="domain-info">
          <h4>{domain.name}</h4>
          <span>{domain.percent}</span>
        </div>
        <div className="domain-right">
          <span className={`domain-score ${domain.tier}`}>{domain.score}</span>
          <svg
            className={`chevron ${open ? "open" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {open && <div className="domain-divider" />}

      <div className={`domain-body ${open ? "open" : ""}`}>
        <h5>{domain.badge}</h5>
        <p>{domain.detail}</p>
      </div>
    </div>
  );
};

/* ─── Main Component ─── */
const WealthScoreResult: React.FC = () => {
  const totalScore = 30;
  const scoreLabel = "Concerning Financial Health";
  const scoreDesc =
    "Your financial health is concerning with critical issues that need immediate attention. Several aspects of your finances require significant improvement. Focus first on stabilizing your situation by addressing the most pressing vulnerabilities.";

  return (
    <div className="result-page">
      <div className="container-fluid px-0">

        {/* ── Score Hero ── */}
        <div className="text-center mb-5">
          <div className="score-number">
            <AnimatedScore target={totalScore} />
          </div>
          <div className="score-label">{scoreLabel}</div>
          <p className="score-desc">{scoreDesc}</p>
        </div>

        {/* ── Domain Scores ── */}
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-10 col-lg-8">
            <h2 className="section-title">Your Domain Scores</h2>
            {DOMAINS.map((d) => (
              <DomainCard key={d.id} domain={d} />
            ))}
          </div>
        </div>

        {/* ── Radar Chart ── */}
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-10 col-lg-8">
            <h2 className="section-title">Score Visualization</h2>
            <div className="radar-container">
              <WealthScoreFinalResult domains={DOMAINS} />
            </div>
          </div>
        </div>

        {/* ── Recommendations ── */}
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-md-10 col-lg-8">
            <h2 className="section-title">Recommendations</h2>
            {RECOMMENDATIONS.map((rec, i) => (
              <div className="rec-card fade-in" key={i}>
                <h4>{rec.title}</h4>
                <span className="rec-priority">{rec.priority}</span>
                <p>{rec.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Download Button ── */}
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 px-3">
            <button className="btn-download">Download Report</button>
            <p className="disclaimer">
              Disclaimer: This wealth score is for informational purposes only and should not be
              considered as financial advice. Please consult with a qualified financial advisor
              before making any financial decisions.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};




export default WealthScoreResult;