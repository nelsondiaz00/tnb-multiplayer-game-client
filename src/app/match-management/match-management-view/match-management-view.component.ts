import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CreateMatchModalComponent } from '../create-match-modal/create-match-modal.component';
import { MatchListComponent } from '../match-list/match-list.component';
import { GameViewComponent } from '../../game/game-view/game-view.component';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../../_services/websocket.service';

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
  @Output() toggleGameView = new EventEmitter<boolean>();
  constructor(private webSocketService: WebSocketService) {}

  showGameView: boolean = false;
  selectedMatchConfig: any;

  onMatchSelected(match: any): void {
    console.log('entró a conexión nueva de socket!');
    this.webSocketService.connectToSocket(match.port);
    this.selectedMatchConfig = match;
    this.showGameView = true;
    this.toggleGameView.emit(this.showGameView);
  }
}
