import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateMatchModalComponent } from '../create-match-modal/create-match-modal.component';
import { WebSocketService } from '../../_services/websocket.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-match-list',
  standalone: true,
  imports: [CreateMatchModalComponent, CommonModule],
  templateUrl: './match-list.component.html',
  styleUrl: './match-list.component.css',
})
export class MatchListComponent implements OnInit, OnChanges {
  @Output() matchSelected = new EventEmitter<any>();
  @Input() refreshTrigger: boolean = false;
  matchList: any[] = [];

  constructor(
    private dialog: MatDialog,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.webSocketService.getMatchList();
    this.webSocketService.activeMatches$.subscribe((activeMatches: any) => {
      this.matchList = Array.from(activeMatches).map((match: any) => ({
        port: match.port,
        amountRed: match.amountRed,
        amountBlue: match.amountBlue,
        name: `Match on port ${match.port}`,
        state: true,
      }));
    });
    // console.log(
    //   'llegó una nueva lista de marches !!!!!!!!!!!! ' +
    //     this.webSocketService.socket$.getValue()
    // );
    // this.webSocketService.getPlayersAmount(3001);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshTrigger']) {
      this.refreshMatchList();
    }
  }

  refreshMatchList(): void {
    console.log('refreshing match list');
    this.webSocketService.getMatchList();
  }

  onMatchClick(match: any): void {
    console.log('wtf hermanito wtf - ', match.port);
    //this.webSocketService.connectToSocket(match.port);

    this.webSocketService.amountPlayers$.subscribe((usersAmount) => {
      console.log(
        'SISODSIDOSIDS, ' +
          usersAmount +
          ' -- ' +
          match.amountBlue +
          match.amountRed
      );
      if (
        usersAmount !== undefined &&
        usersAmount < match.amountBlue + match.amountRed
      ) {
        // console.log('SISODSIDOSIDS, ' + usersAmount);
        this.matchSelected.emit(match);
      }
    });
    // this.matchSelected.emit(match);
    // Llama a la función para obtener la cantidad de jugadores
    this.webSocketService.getPlayersAmount(match.port);

    // this.webSocketService.getMatchUsers();
  }

  openCreateMatchModal(): void {
    this.dialog.open(CreateMatchModalComponent, {});
  }

  public suscriptionMatchList(): void {
    console.log('Getting match list');
  }

  public getMatchList(): any[] {
    return this.matchList;
  }
}
