import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BeginJourneyComponent } from './begin-journey/begin-journey.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from "ng-apexcharts";
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { VisionComponent } from './vision/vision.component';
import { FourPillarsComponent } from './four-pillars/four-pillars.component';
import { AiIntelligenceComponent } from './ai-intelligence/ai-intelligence.component';
import { WealthScoreComponent } from './wealth-score/wealth-score.component';
import { FooterComponent } from './footer/footer.component';
import { SignUpPopupComponent } from "./sign-up-popup/sign-up-popup.component";

@NgModule({
  declarations: [
  AppComponent,
  HeaderComponent,
  HomeComponent,
  AboutComponent,
  VisionComponent,
  FourPillarsComponent,
  AiIntelligenceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    WealthScoreComponent,
    FooterComponent,
    BeginJourneyComponent,
    NgApexchartsModule,
    SignUpPopupComponent,
    HttpClientModule
],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
