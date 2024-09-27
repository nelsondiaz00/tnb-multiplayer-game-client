import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TeamSelectionModalComponent } from '../team-selection-modal/team-selection-modal.component';
import { StartBattleModalComponent } from '../start-battle-modal/start-battle-modal.component';
import { MatchComponent } from '../match/match.component';
import { ActionBarComponent } from '../action-bar/action-bar.component';
import { EndMatchModalComponent } from '../end-match-modal/end-match-modal.component';
import { WebSocketService } from '../../_services/websocket.service';
import { UserService } from '../../_services/user.service';
import { IMatch } from '../../_models/interfaces/match.interfaces';
import { Router } from '@angular/router';
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
  matchConfig: any;

  constructor(
    private webSocketService: WebSocketService,
    private userService: UserService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.matchConfig = navigation.extras.state['matchConfig'];
    }
  }

  @Output() matchEnded = new EventEmitter<void>();

  ngOnInit(): void {
    console.log('está acá primero bro');
    this.webSocketService.newUser$.subscribe((matchReceived: IMatch) => {
      this.userService.setOwnerIdUser(matchReceived.owner);
      console.log('está acá primero bro');
    });
  }
  onMatchEnded() {
    this.router.navigate(['match-management-view']);
  }
}
