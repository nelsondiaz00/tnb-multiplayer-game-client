import { Component } from '@angular/core';
import { CreateMatchModalComponent } from '../create-match-modal/create-match-modal.component';
import { MatchListComponent } from '../match-list/match-list.component';
import { GameViewComponent } from '../game-view/game-view.component';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../_services/websocket.service';

@Component({
  selector: 'app-match-management-view',
  standalone: true,
  imports: [
    CommonModule,
    CreateMatchModalComponent,
    MatchListComponent,
    GameViewComponent,
  ],
  templateUrl: './match-management-view.component.html',
  styleUrl: './match-management-view.component.css',
})
export class MatchManagementViewComponent {
  constructor(private webSocketService: WebSocketService) {}

  showGameView: boolean = false;
  selectedMatchConfig: any;

  onMatchSelected(match: any): void {
    console.log(match, ' mamatch');
    this.webSocketService.connectCreatedSocket(match.port);
    this.selectedMatchConfig = match;
    this.showGameView = true;
  }
}
