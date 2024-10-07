import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CreateMatchModalComponent } from '../create-match-modal/create-match-modal.component';
import { MatchListComponent } from '../match-list/match-list.component';
import { GameViewComponent } from '../../game/game-view/game-view.component';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../../_services/websocket.service';
import { SelectHeroComponent } from '../select-hero/select-hero.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-management-view',
  standalone: true,
  imports: [
    CommonModule,
    CreateMatchModalComponent,
    MatchListComponent,
    GameViewComponent,
    SelectHeroComponent,
  ],
  templateUrl: './match-management-view.component.html',
  styleUrl: './match-management-view.component.css',
})
export class MatchManagementViewComponent {
  @Output() toggleGameView = new EventEmitter<boolean>();
  @Output() showHeader = new EventEmitter<boolean>();
  constructor(
    private webSocketService: WebSocketService,
    private router: Router
  ) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  selectedMatchConfig: any;

  onMatchSelected(match: any): void {
    console.log('entró a conexión nueva de socket!');
    this.webSocketService.connectToSocket(match.port);
    this.selectedMatchConfig = match;
    this.router.navigate(['game-view'], {
      state: { matchConfig: this.selectedMatchConfig },
    });
  }

}
