import { Component } from '@angular/core';
import { WebSocketService } from '../_services/websocket.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-start-battle-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-battle-modal.component.html',
  styleUrl: './start-battle-modal.component.css',
})
export class StartBattleModalComponent {
  isVisible: boolean = true;
  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService.turnInfo$.subscribe((turnInfo) => {
      this.isVisible = false;
    });
  }

  startBattle() {
    this.webSocketService.startBattle();
    console.log('Battle started');
    this.isVisible = false;
  }
}
