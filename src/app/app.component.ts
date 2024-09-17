import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatchManagementViewComponent } from './match-management/match-management-view/match-management-view.component';
import { CommonModule } from '@angular/common';
import { InfoUserComponent } from "./profile/info-user/info-user.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatchManagementViewComponent, CommonModule, InfoUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tnb-multiplayer-client';
  showGameView = false;
  showInfoUser = false;

  constructor(private cdr: ChangeDetectorRef) {}

  toggleGameView(show: boolean) {
    this.showGameView = show;
    this.cdr.detectChanges();
  }

  showInfoUserComponent() {
    this.showInfoUser = true;
    this.cdr.detectChanges();
  }
}
