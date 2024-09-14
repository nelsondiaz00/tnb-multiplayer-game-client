import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { MatchComponent } from './match/match.component';
import { StartBattleModalComponent } from './start-battle-modal/start-battle-modal.component';
import { TeamSelectionModalComponent } from './team-selection-modal/team-selection-modal.component';
import { CreateMatchModalComponent } from './create-match-modal/create-match-modal.component';
import { GameViewComponent } from "./game-view/game-view.component";
import { MatchManagementViewComponent } from "./match-management-view/match-management-view.component";
import { EndMatchModalComponent } from "./end-match-modal/end-match-modal.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeroComponent,
    ActionBarComponent,
    MatchComponent,
    StartBattleModalComponent,
    TeamSelectionModalComponent,
    CreateMatchModalComponent,
    GameViewComponent,
    MatchManagementViewComponent,
    EndMatchModalComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tnb-multiplayer-client';
}
