import { BeginJourneyComponent } from './begin-journey/begin-journey.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VisionComponent } from './vision/vision.component';
import { FourPillarsComponent } from './four-pillars/four-pillars.component';
import { AiIntelligenceComponent } from './ai-intelligence/ai-intelligence.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'vision', component: VisionComponent },
  { path: 'four-pillars', component: FourPillarsComponent },
  { path: 'ai-intelligence', component: AiIntelligenceComponent },
  { path: 'begin-journey', component: BeginJourneyComponent },
  { path: 'auth/callback', component: AuthCallbackComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' } // Wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
