import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatchManagementViewComponent } from './match-management/match-management-view/match-management-view.component';
import { CommonModule } from '@angular/common';
import { InfoUserComponent } from './profile/info-user/info-user.component';
import { ProductCreationComponent } from './inventary/product-creation/product-creation.component';
import { SignInComponent } from './profile/sign-in/sign-in.component';
import { SignUpComponent } from './profile/sign-up/sign-up.component';
import { HeroInventoryComponent } from './inventary/hero-inventory/hero-inventory.component';
import { LandingComponent } from './landing/landing.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatchManagementViewComponent,
    CommonModule,
    InfoUserComponent,
    ProductCreationComponent,
    SignInComponent,
    SignUpComponent,
    HeroInventoryComponent,
    LandingComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tnb-multiplayer-client';
  showGameView = false;
  showInfoUser = false;
  showInventary = false;
  showManagementMatch = false;
  showHeader = false;
  showSignIn = false;
  showRegister = false;
  showLanding = true;

  constructor(private cdr: ChangeDetectorRef) {}

  toggleGameView(show: boolean) {
    this.showHeader = false;
    this.showGameView = show;
    this.cdr.detectChanges();
  }

  showInfoUserComponent() {
    this.hideViews();
    this.showInfoUser = true;
    this.cdr.detectChanges();
  }

  showInventaryComponent() {
    this.hideViews();
    this.showInventary = true;
    this.cdr.detectChanges();
  }

  // showHeaderComponent() {
  //   this.hideViews();
  //   this.showHeader = true;
  //   this.cdr.detectChanges();
  // }

  showManagementMatchComponent() {
    this.hideViews();
    this.showHeader = true;
    this.showManagementMatch = true;
    this.cdr.detectChanges();
  }

  showSignInComponent() {
    this.hideViews();
    this.showSignIn = true;
    this.cdr.detectChanges();
  }

  showRegisterComponent() {
    console.log('showRegisterComponent');
    this.hideViews();
    this.showRegister = true;
    this.cdr.detectChanges();
  }

  showLandingComponent(){
    this.hideViews();
    this.showLanding = true;
    this.cdr.detectChanges();
  }

  hideViews() {
    this.showGameView = false;
    this.showInfoUser = false;
    this.showInventary = false;
    this.showManagementMatch = false;
    this.showSignIn = false;
    this.showRegister = false;
    this.showLanding = false;
    this.cdr.detectChanges();
  }
}
