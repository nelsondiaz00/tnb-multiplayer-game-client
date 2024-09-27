import { Routes } from '@angular/router';
import { GameViewComponent } from './game/game-view/game-view.component';
import { MatchManagementViewComponent } from './match-management/match-management-view/match-management-view.component';
import { InfoUserComponent } from './profile/info-user/info-user.component';
import { SignInComponent } from './profile/sign-in/sign-in.component';
import { SignUpComponent } from './profile/sign-up/sign-up.component';
import { HeroInventoryComponent } from './inventary/hero-inventory/hero-inventory.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
  { path: 'match-management-view', component: MatchManagementViewComponent },
  { path: 'game-view', component: GameViewComponent },
  { path: 'profile', component: InfoUserComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'hero-inventory', component: HeroInventoryComponent },
  { path: 'landing', component: LandingComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
];
export class AppRoutingModule {}
