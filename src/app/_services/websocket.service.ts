import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { fromEvent, Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IMatch } from '../_models/interfaces/match.interfaces';
import { IBindInfo } from '../_models/interfaces/bind.info.interface';
import { UserService } from './user.service';
import { teamSide } from '../_models/types/team.type';
import { environment } from '../../environments/environment';
import { IHero } from '../_models/interfaces/hero.interfaces';
import { BetWinners } from '../_models/interfaces/bet.winners';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  public socket$: BehaviorSubject<Socket>;
  public newUser$: Observable<IMatch>;
  public turnInfo$: Observable<any>;
  public habilityUsed$: Observable<IMatch>;
  public actualMatch$: Observable<IMatch>;
  public activeMatches$: Observable<any>;
  public endMatch$: Observable<any>;
  public amountPlayers$: Observable<any>;
  public lastAttackName$: Observable<string>;
  public failedReason$: Observable<string>;
  public betWinners$: Observable<BetWinners>;
  public creditsSignal$: Observable<any>;
  private HOST = environment.MULTIPLAYER_HOST;
  private PORT = environment.MULTIPLAYER_PORT;

  constructor(private userService: UserService) {
    //   console.log(environment.production, ' !!!!!!!!!!!!!');
    const initialSocket = io(`http://${this.HOST}:${this.PORT}`);
    console.log(`http://${this.HOST}:${this.PORT}`);
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
    this.betWinners$ = this.socket$.pipe(
      switchMap((socket) => fromEvent<any>(socket, 'betWinners'))
    );

    this.creditsSignal$ = this.socket$.pipe(
      switchMap((socket) => fromEvent<any>(socket, 'creditsSignal'))
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
    // console.log('Match created!');
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
      // console.log('Connected to match socket on url ' + url + '!');
    }
  }

  public connectMainSocket(): void {
    if (this.HOST !== '' && this.PORT !== 0) {
      const url = `http://${this.HOST}:${this.PORT}`;
      const newSocket = io(url);
      this.socket$.next(newSocket);
      // console.log('Connected to match socket on url ' + url + '!');
    }
  }

  public selectSideTeam(teamSide: teamSide): void {
    const heroSelected = this.userService.getHeroSelected();
    if (heroSelected !== null) {
      this.userService.setIdUser(heroSelected.idUser);
      this.userService.setTeamSide(teamSide);
      const hero: IHero = {
        idUser: heroSelected.idUser,
        nameUser: heroSelected.nameUser,
        idHero: 'idHero',
        type: heroSelected.type,
        subtype: heroSelected.subtype,
        attributes: heroSelected.attributes,
        products: heroSelected.products,
        alive: heroSelected.alive,
        teamSide: teamSide,
      };
      // console.log(hero, ' hero');
      this.socket$.getValue().emit('bindInfo', hero);
    }
    //onsole.log('???');
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
    // console.log(perpetratorId, ' - ', productId, ' - ', victimId);
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
