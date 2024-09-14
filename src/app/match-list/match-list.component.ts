import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateMatchModalComponent } from '../create-match-modal/create-match-modal.component';
import { WebSocketService } from '../_services/websocket.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-match-list',
  standalone: true,
  imports: [CreateMatchModalComponent, CommonModule],
  templateUrl: './match-list.component.html',
  styleUrl: './match-list.component.css',
})
export class MatchListComponent implements OnInit {
  @Output() matchSelected = new EventEmitter<any>();
  matchList: any[] = [];

  constructor(
    private dialog: MatDialog,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.suscriptionMatchList();
    this.webSocketService.getMatchList();
    console.log(this.matchList);
  }

  onMatchClick(match: any): void {
    this.webSocketService.matchUsersCount$.subscribe((users) => {
      console.log(match.amountBlue + match.amountRed);
      console.log(users);
      console.log(users === match.amountBlue + match.amountRed);
      // if (users !== match.amountBlue + match.amountRed) {
      //   this.matchSelected.emit(match);
      // }
      return users;
    });
    // if(usersCount !== match.amountRed + match.amountBlue){

    // }
    this.matchSelected.emit(match);
    // this.webSocketService.getMatchUsers();
  }

  openCreateMatchModal(): void {
    this.dialog.open(CreateMatchModalComponent, {});
  }

  public suscriptionMatchList(): void {
    console.log('Getting match list');
    this.webSocketService.activeMatches$.subscribe(
      (activeMatches: Set<any>) => {
        this.matchList = Array.from(activeMatches).map((match) => ({
          port: match.port,
          amountRed: match.amountRed,
          amountBlue: match.amountBlue,
          name: `Match on port ${match.port}`,
          state: true,
        }));
      }
    );
  }

  public getMatchList(): any[] {
    return this.matchList;
  }
}
