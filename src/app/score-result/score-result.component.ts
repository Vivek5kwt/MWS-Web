import { Component, Input, OnChanges } from '@angular/core';
import { PdfExportService } from './pdf-export.service';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ApexNonAxisChartSeries, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexPlotOptions, ApexYAxis, ApexStroke, ApexMarkers, ApexFill, ApexTheme, ApexTitleSubtitle, ChartComponent, NgApexchartsModule } from "ng-apexcharts";
import { SignUpPopupComponent } from '../sign-up-popup/sign-up-popup.component';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  markers: ApexMarkers;
  fill: ApexFill;
  theme: ApexTheme;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-score-result',
  templateUrl: './score-result.component.html',
  styleUrls: ['./score-result.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgChartsModule,
    NgApexchartsModule,
    SignUpPopupComponent
  ],
  animations: [
    trigger('expandCollapse', [
      state('open', style({
        height: '*',
        opacity: 1,
        paddingTop: '12px',
        paddingBottom: '12px',
        marginTop: '8px'
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
        paddingTop: '0px',
        paddingBottom: '0px',
        marginTop: '0px'
      })),
      transition('open <=> closed', [
        animate('250ms cubic-bezier(.4,0,.2,1)')
      ])
    ])
  ]
})
export class ScoreResultComponent implements OnChanges {
  constructor(private pdfExportService: PdfExportService) {}

  async downloadReport() {
    await this.pdfExportService.exportScoreResultToPdf({
      score: this.score,
      domainScores: this.domainScores,
      recommendations: this.recommendations
    });
  }
  @Input() score: number = 30;
  @Input() domainScores: { 
    name: string; 
    value: number; 
    description?: string; 
    percent?: string; // <-- Change from number to string
    summary?: string; // <-- Add summary to type for type safety
  }[] = [
    {
      name: 'Investment',
      percent: '29%',
      value: 28,
      summary: 'Below-average investment portfolio',
      description: `Your investments require significant attention to improve diversification and contribution levels.
    Your total investments are 0.0x your annual income, which should be increased over time.
    You're currently investing 0.0% of your monthly income, which should be increased.
    Based on your age, your conservative risk profile may be limiting your long-term growth potential.`
    },
    {
      name: 'Debt',
      percent: '23%',
      value: 74,
      summary: 'Good debt management',
      description: `Your debt is generally under control, though there may be opportunities to optimize your debt structure.`
    },
    {
      name: 'Insurance',
      percent: '15%',
      value: 45,
      summary: 'Inadequate insurance coverage',
      description: `Your insurance protection has critical gaps that expose you to significant financial risks. You have no health insurance coverage, exposing you to significant financial risk in case of medical emergencies.`
    }
  ];
  @Input() recommendations: { title: string; priority: string; description: string }[] = [];

  radarChartLabels: string[] = [];
  radarChartData: any = [{ data: [], label: 'Score' }];
  radarChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 100,
        pointLabels: {
          color: '#fff',
          font: { size: 16 }
        },
        grid: { color: '#444' },
        ticks: { color: '#fff', stepSize: 20 }
      }
    }
  };

  openDomainIndex: number | null = 0; // First card open by default
  showSignUpPopup = true; // Set to true when you want to show the popup

  toggleDomain(index: number) {
    this.openDomainIndex = this.openDomainIndex === index ? null : index;
  }

  ngOnChanges() {
    if (this.domainScores && this.domainScores.length) {
      this.radarChartLabels = this.domainScores.map(d => d.name);
      this.radarChartData = [{
        data: this.domainScores.map(d => d.value),
        label: 'Score',
        backgroundColor: 'rgba(0,212,255,0.2)',
        borderColor: '#00d4ff',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#00d4ff',
        pointHoverBackgroundColor: '#00d4ff',
        pointHoverBorderColor: '#fff'
      }];

      // Update ApexChart options
      this.chartOptions = {
        ...this.chartOptions,
        series: [
          {
            name: 'Score',
            data: this.domainScores.map(d => d.value)
          }
        ],
        chart: {
          type: 'radar',
          height: 500
        },
        xaxis: {
          categories: this.domainScores.map(d => d.name),
          labels: {
            show: true,
            style: {
              colors: '#fff', // or any color you want
              fontSize: '16px'
            }
          }
        },
        yaxis: {
          show: true,
          labels: {
            style: {
              colors: '#aaa',
              fontSize: '14px'
            }
          }
        }
      };
    }
  }

  public chartOptions: Partial<ChartOptions> = {
    series: [],
    chart: {
      type: 'radar', // or the chart type you want
      height: 350
    },
    xaxis: {},
    yaxis: {},
    stroke: {},
    markers: {},
    fill: {},
    theme: {},
    dataLabels: {},
    title: {}
  };
}
