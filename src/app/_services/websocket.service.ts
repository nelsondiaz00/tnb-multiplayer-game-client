import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { fromEvent, Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IMatch } from '../_models/interfaces/match.interfaces';
import { IBindInfo } from '../_models/interfaces/bind.info.interface';
import { UserService } from './user.service';
import { teamSide } from '../_models/types/team.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  public socket$: BehaviorSubject<Socket>;
  public newUser$: Observable<IMatch>;
  public turnInfo$: Observable<any>; // Define a specific type if available
  public habilityUsed$: Observable<IMatch>;
  public actualMatch$: Observable<IMatch>;
  private matchDetails$: Observable<IMatch>;
  public activeMatches$: Observable<any>;
  public endMatch$: Observable<any>;
  public amountPlayers$: Observable<any>;
  public lastAttackName$: Observable<string>;
  public failedReason$: Observable<string>;
  private HOST = environment.host;
  private PORT = environment.port;

  constructor(private userService: UserService) {
    console.log(environment.production, ' !!!!!!!!!!!!!');
    const initialSocket = io(`http://${this.HOST}:${this.PORT}`);
    this.socket$ = new BehaviorSubject<Socket>(initialSocket);

    this.newUser$ = this.socket$.pipe(
      switchMap((socket) => fromEvent<IMatch>(socket, 'newUser'))
    );
    this.turnInfo$ = this.socket$.pipe(
      switchMap((socket) => fromEvent<any>(socket, 'turnInfo'))
    );
    this.habilityUsed$ = this.socket$.pipe(
      switchMap((socket) => fromEvent<IMatch>(socket, 'habilityUsed'))
    );
    this.actualMatch$ = this.socket$.pipe(
      switchMap((socket) => fromEvent<IMatch>(socket, 'actualMatch'))
    );
    this.matchDetails$ = this.socket$.pipe(
      switchMap((socket) => fromEvent<IMatch>(socket, 'matchDetails'))
    );
    this.activeMatches$ = this.socket$.pipe(
      switchMap((socket) => fromEvent<any>(socket, 'activeMatches'))
    );
    this.endMatch$ = this.socket$.pipe(
      switchMap((socket) => fromEvent<any>(socket, 'endMatch'))
    );
    this.amountPlayers$ = this.socket$.pipe(
      switchMap((socket) => fromEvent<any>(socket, 'playersAmount'))
    );
    this.lastAttackName$ = this.socket$.pipe(
      switchMap((socket) => fromEvent<any>(socket, 'lastAttackName'))
    );
    this.failedReason$ = this.socket$.pipe(
      switchMap((socket) => fromEvent<any>(socket, 'failedReason'))
    );
  }
  // private initMatch() {
  //   this.socket$.getValue().on('connect', () => {
  //     console.log('Connected to general socket!');
  //   });
  // }

  public createMatchSocket(dataMatch: any): void {
    // this.connectToSocket('3000');
    // this.connectNewSocket();
    this.socket$.getValue().emit('createMatch', dataMatch);
    console.log('Match created!');
  }

  // private connectNewSocket() {
  //   this.socket$
  //     .pipe(switchMap((socket) => fromEvent<IMatch>(socket, 'matchDetails')))
  //     .subscribe((matchReceived: any) => {
  //       const newPort = matchReceived.port;
  //       // newPort = 3001; // quitarrrr!!!
  //       this.connectToSocket(newPort);
  //     });
  // }

  public connectToSocket(port: string): void {
    if (port !== '') {
      const url = `http://${this.HOST}:${port}`;
      const newSocket = io(url);
      this.socket$.next(newSocket);
      console.log('Connected to match socket on url ' + url + '!');
    }
  }

  public selectSideTeam(teamSide: teamSide, idTemp: string): void {
    fetch('./assets/input1.json')
      .then((response) => response.json())
      .then((data) => {
        this.userService.setIdUser(idTemp);
        this.userService.setTeamSide(teamSide);
        const hero = {
          idUser: idTemp,
          type: data.type,
          subtype: data.subtype,
          attributes: data.attributes,
          products: data.products,
          alive: data.alive,
          teamSide: teamSide,
        };
        this.socket$.getValue().emit('bindInfo', hero);
      });
  }

  public getMatch(): void {
    this.socket$.getValue().emit('getMatch');
  }

  public getMatchList(): void {
    this.socket$.getValue().emit('getActiveMatches');
  }

  public getPlayersAmount(port: any): void {
    this.socket$.getValue().emit('getPlayersAmount', port);
  }

  public useHability(
    perpetratorId: string,
    productId: string,
    victimId: string
  ): void {
    console.log(perpetratorId, ' - ', productId, ' - ', victimId);
    this.socket$
      .getValue()
      .emit('useHability', perpetratorId, productId, victimId);
    this.passTurn();
  }

  public startBattle(): void {
    this.socket$.getValue().emit('startBattle', this.userService.getIdUser());
  }

  public passTurn(): void {
    this.socket$.getValue().emit('passTurn');
  }
}
