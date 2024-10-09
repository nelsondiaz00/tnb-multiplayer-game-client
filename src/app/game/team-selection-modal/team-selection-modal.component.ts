import { Component } from '@angular/core';
import { WebSocketService } from '../../_services/websocket.service';
import { CommonModule } from '@angular/common';
import { teamSide } from '../../_models/types/team.type';
import { UserService } from '../../_services/user.service';
@Component({
  selector: 'app-team-selection-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-selection-modal.component.html',
  styleUrl: './team-selection-modal.component.css',
})
export class TeamSelectionModalComponent {
  constructor(
    private webSocketService: WebSocketService,
    private userService: UserService
  ) {}

  isVisible: boolean = true;

  joinTeam(teamSide: teamSide): void {
    this.webSocketService.selectSideTeam(teamSide);
    this.isVisible = false;
  }

  // connectSocket(port: string): void {

  // }
}
