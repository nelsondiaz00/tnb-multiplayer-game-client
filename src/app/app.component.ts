import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatchManagementViewComponent } from './match-management/match-management-view/match-management-view.component';
import { CommonModule } from '@angular/common';
import { InfoUserComponent } from './profile/info-user/info-user.component';
import { ProductCreationComponent } from './inventary/product-creation/product-creation.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatchManagementViewComponent,
    CommonModule,
    InfoUserComponent,
    ProductCreationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tnb-multiplayer-client';
  showGameView = false;
  showInfoUser = false;
  showInventary = false;
  showManagementMatch = true;
  constructor(private cdr: ChangeDetectorRef) {}

  toggleGameView(show: boolean) {
    this.hideViews();
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

  showManagementMatchComponent() {
    this.hideViews();
    this.showManagementMatch = true;
    this.cdr.detectChanges();
  }

  hideViews() {
    this.showGameView = false;
    this.showInfoUser = false;
    this.showInventary = false;
    this.showManagementMatch = false;
    this.cdr.detectChanges();
  }
}
