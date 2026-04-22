import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScoreResultComponent } from '../score-result/score-result.component';

export interface ScoreResult {
  score: number;
  domainScores: { name: string; value: number; description?: string; percent?: string; summary?: string }[];
  recommendations: { title: string; priority: string; description: string }[];
}

@Component({
  selector: 'app-begin-journey',
  templateUrl: './begin-journey.component.html',
  styleUrls: ['./begin-journey.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ScoreResultComponent]
})
export class BeginJourneyComponent {
  form: FormGroup;
  result: ScoreResult | null = null;
  loading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      age: ['', [
        Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(1), Validators.max(99)
      ]],
      email: ['', [
        Validators.required, Validators.email
      ]],
      monthlyIncome: ['', [
        Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)
      ]],
      maritalStatus: ['', Validators.required],
      dependents: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      locationTier: ['', Validators.required],
      riskProfile: ['', Validators.required],
      cashInHand: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      savingsBalance: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      fixedDeposits: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      liquidFunds: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      monthlyExpenses: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      incomeStability: ['', Validators.required],
      equityInvestments: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      fixedIncomeInvestments: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      realEstateInvestments: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      goldInvestments: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      retirementAccounts: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      monthlyInvestment: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      portfolioDiversification: ['', Validators.required],
      investmentReturn: ['', Validators.required],
      homeLoan: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      carLoan: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      personalLoan: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      creditCardDebt: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      homeLoanEMI: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      carLoanEMI: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      personalLoanEMI: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      creditScore: ['', [
        Validators.required, Validators.pattern(/^[0-9]{3}$/)
      ]],
      termInsurance: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      employerLifeCover: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      healthInsurance: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      criticalIllness: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      employerHealthCover: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]],
      homeInsurance: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = null;
    this.result = null;
    const body = this.form.value;
    this.http.post<any>('http://localhost:3000/api/wealth-score', body).subscribe({
      next: (res) => {
        window.scrollTo(0, 0);
        this.result = {
          score: res.finalScore,
          domainScores: [
            {
              name: 'Liquidity',
              value: res.liquidityScore,
              percent: res.weights?.liquidity ? res.weights.liquidity + '%' : undefined,
              summary: res.liquidityAnalysis,
              description: res.liquidityAnalysis
            },
            {
              name: 'Investment',
              value: res.investmentScore,
              percent: res.weights?.investment ? res.weights.investment + '%' : undefined,
              summary: res.investmentAnalysis,
              description: res.investmentAnalysis
            },
            {
              name: 'Debt',
              value: res.debtScore,
              percent: res.weights?.debt ? res.weights.debt + '%' : undefined,
              summary: res.debtAnalysis,
              description: res.debtAnalysis
            },
            {
              name: 'Insurance',
              value: res.insuranceScore,
              percent: res.weights?.insurance ? res.weights.insurance + '%' : undefined,
              summary: res.insuranceAnalysis,
              description: res.insuranceAnalysis
            }
          ],
          recommendations: (res.recommendations || []).map((rec: string) => ({
            title: rec,
            priority: '',
            description: rec
          }))
        };
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to fetch wealth score. Please try again.';
        this.loading = false;
      }
    });
  }
}