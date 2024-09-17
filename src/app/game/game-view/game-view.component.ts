import { Component, Input, OnInit } from '@angular/core';
import { TeamSelectionModalComponent } from '../team-selection-modal/team-selection-modal.component';
import { StartBattleModalComponent } from '../start-battle-modal/start-battle-modal.component';
import { MatchComponent } from '../match/match.component';
import { ActionBarComponent } from '../action-bar/action-bar.component';
import { EndMatchModalComponent } from '../end-match-modal/end-match-modal.component';
import { AppComponent } from '../../app.component';
import { WebSocketService } from '../../_services/websocket.service';
import { UserService } from '../../_services/user.service';
import { IMatch } from '../../_models/interfaces/match.interfaces';
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
export class GameViewComponent implements OnInit {
  constructor(
    private webSocketService: WebSocketService,
    private userService: UserService
  ) {}

  @Input() matchConfig: any;

  ngOnInit(): void {
    console.log('está acá primero bro');
    this.webSocketService.newUser$.subscribe((matchReceived: IMatch) => {
      this.userService.setOwnerIdUser(matchReceived.owner);
      console.log('está acá primero bro');
    });
  }
}
