import { Component, EventEmitter, Output } from '@angular/core';
import { WebSocketService } from '../../_services/websocket.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-end-match-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './end-match-modal.component.html',
  styleUrl: './end-match-modal.component.css',
})
export class EndMatchModalComponent {
  @Output() matchEnded = new EventEmitter<void>();
  isVisible: boolean = false;
  constructor(private webSocketService: WebSocketService) {}
  ngOnInit(): void {
    this.webSocketService.endMatch$.subscribe(() => {
      this.isVisible = true;
    });
  }

  onEndMatchClick() {
    this.matchEnded.emit();
  }
  // endBattle() {
  //   this.webSocketService.startBattle();
  //   console.log('Battle ended');
  //   this.isVisible = true;
  // }
}
