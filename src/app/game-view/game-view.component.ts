import { Component, Input } from '@angular/core';
import { TeamSelectionModalComponent } from '../team-selection-modal/team-selection-modal.component';
import { StartBattleModalComponent } from '../start-battle-modal/start-battle-modal.component';
import { MatchComponent } from '../match/match.component';
import { ActionBarComponent } from '../action-bar/action-bar.component';
import { EndMatchModalComponent } from '../end-match-modal/end-match-modal.component';

@Component({
  selector: 'app-game-view',
  standalone: true,
  imports: [
    TeamSelectionModalComponent,
    StartBattleModalComponent,
    MatchComponent,
    ActionBarComponent,
    EndMatchModalComponent,
  ],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.css',
})
export class GameViewComponent {
  @Input() matchConfig: any;
}
