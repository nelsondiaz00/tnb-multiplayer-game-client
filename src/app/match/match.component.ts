import { Component, Input } from '@angular/core';
import { TeamComponent } from '../team/team.component';
import { IMatch } from '../_models/interfaces/match.interfaces';
import { MatchService } from '../_services/match.service';
import { WebSocketService } from '../_services/websocket.service';
import { CommonModule } from '@angular/common';
import { teamSide } from '../_models/types/team.type';
import { ITeam } from '../_models/interfaces/team.interface';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [TeamComponent, CommonModule],
  templateUrl: './match.component.html',
  styleUrl: './match.component.css',
})
export class MatchComponent {
  @Input() matchConfig: any;

  match: IMatch = {
    idMatch: '',
    teams: new Map<teamSide, ITeam>(),
    size: 0,
  };
  // sec of turn time left
  counter: number = 180;
  intervalId: any;
  private isFirstTeamAssigned = false;

  constructor(
    private matchService: MatchService,
    private webSocketService: WebSocketService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    console.log(this.matchConfig, ' esto desde match');
    this.webSocketService.newUser$.subscribe((matchReceived: IMatch) => {
      console.log('??? llegó o no');
      this.match = this.matchService.reconstructMatch(matchReceived);
    });

    this.webSocketService.turnInfo$.subscribe((turnInfo) => {
      this.startCounter();
      this.userService.setCurrentIdUser(turnInfo.idUser);
    });

    this.webSocketService.actualMatch$.subscribe((matchReceived: IMatch) => {
      console.log(matchReceived);
      this.match = this.matchService.reconstructMatch(matchReceived);
    });
  }

  getAmountPlayersForTeam(): number {
    if (!this.isFirstTeamAssigned) {
      this.isFirstTeamAssigned = true;
      console.log('Assigning amountBlue:', this.matchConfig.amountBlue);
      return this.matchConfig.amountBlue;
    } else {
      console.log('Assigning amountRed:', this.matchConfig.amountRed);
      return this.matchConfig.amountRed;
    }
  }

  startCounter() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.counter = 180;
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
    console.log(Array.from(this.match.teams.keys()), ' keys');
    return Array.from(this.match.teams.keys());
  }
}
