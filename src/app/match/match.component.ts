import { Component } from '@angular/core';
import { TeamComponent } from '../team/team.component';
import { IMatch } from '../_models/interfaces/match.interfaces';
import { MatchService } from './match.service';
import { WebSocketService } from '../_services/websocket.service';
import { CommonModule } from '@angular/common';
import { teamSide } from '../_models/types/team.type';
import { ITeam } from '../_models/interfaces/team.interface';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [TeamComponent, CommonModule],
  templateUrl: './match.component.html',
  styleUrl: './match.component.css',
})
export class MatchComponent {
  match: IMatch = {
    idMatch: '',
    teams: new Map<teamSide, ITeam>(),
    size: 0,
  };
  // sec of turn time left
  counter: number = 5;
  intervalId: any;

  constructor(
    private matchService: MatchService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.matchService.getMatch().subscribe((data: IMatch) => {
      // Ensure that teams is a Map with correct key type
      if (data.teams instanceof Map) {
        this.match = data;
      } else {
        this.match.teams = new Map<teamSide, ITeam>(
          Object.entries(data.teams).map(([key, value]) => [
            key as teamSide,
            value as ITeam,
          ])
        );
      }
      // console.log(this.match);
      this.startCounter();
    });
  }

  startCounter() {
    this.intervalId = setInterval(() => {
      if (this.counter > 0) {
        this.counter--;
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getTeamKeys(): teamSide[] {
    return Array.from(this.match.teams.keys());
  }
}
