import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../_services/user.service';
import { WebSocketService } from '../../_services/websocket.service';
@Component({
  selector: 'app-start-battle-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-battle-modal.component.html',
  styleUrl: './start-battle-modal.component.css',
})
export class StartBattleModalComponent {
  isVisible: boolean = true;
  constructor(
    private userService: UserService,
    private webSocketService: WebSocketService
  ) {}

  checkVisibility(): boolean {
    return this.userService.getIdUser() === this.userService.getOwnerIdUser();
  }

  startBattle() {
    console.log('Battle started');
    this.webSocketService.startBattle();
    this.isVisible = false;
  }
}