import React from "react";
import "./ProgressBar.css";

interface Step {
  id: number;
  label: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => {
  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="progress-bar-wrapper">
      <div className="steps-container">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isInactive = step.id > currentStep;

          const statusClass = isCompleted
            ? "completed"
            : isActive
            ? "active"
            : "inactive";

          const isFirst = index === 0;
          const isLast = index === steps.length - 1;

          return (
            <div className="step-item" key={step.id}>
              <div className="step-icon-row">
                {/* Left connector */}
                {!isFirst && (
                  <div
                    className={`step-connector left ${
                      isCompleted || isActive ? "completed" : ""
                    }`}
                  />
                )}
                {isFirst && <div className="step-connector left" style={{ visibility: "hidden" }} />}

                {/* Circle */}
                <div className="step-circle-wrap">
                  <div className={`step-circle ${statusClass}`}>
                    {isCompleted ? (
                      <span className="checkmark-icon">✓</span>
                    ) : (
                      step.id
                    )}
                  </div>
                </div>

                {/* Right connector */}
                {!isLast && (
                  <div
                    className={`step-connector right ${
                      isCompleted ? "completed" : ""
                    }`}
                  />
                )}
                {isLast && <div className="step-connector right" style={{ visibility: "hidden" }} />}
              </div>

              <div className={`step-label ${statusClass}`}>
                {step.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="progress-line-bar">
        <div
          className="progress-line-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;