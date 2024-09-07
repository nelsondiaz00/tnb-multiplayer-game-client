import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { fromEvent, Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IMatch } from '../_models/interfaces/match.interfaces';
import { IBindInfo } from '../_models/interfaces/bind.info.interface';
import { UserService } from './user.service';
import { teamSide } from '../_models/types/team.type';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: BehaviorSubject<Socket>;
  public newUser$: Observable<IMatch>;
  public turnInfo$: Observable<any>; // Define a specific type if available
  public habilityUsed$: Observable<IMatch>;
  public actualMatch$: Observable<IMatch>;
  private matchDetails$: Observable<IMatch>;

  constructor(private userService: UserService) {
    const initialSocket = io('http://localhost:3000');
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

    this.initMatch();
  }

  private connectToSocket(url: string): void {
    const newSocket = io(url);
    this.socket$.next(newSocket);
    console.log('Connected to match socket on url ' + url + '!');
  }

  public initMatch() {
    this.socket$.getValue().on('connect', () => {
      console.log('Connected to general socket!');
    });
    this.createMatchSocket();
    this.connectNewSocket();
  }

  private createMatchSocket() {
    const dataMatch = {
      amountRed: 2,
      amountBlue: 2,
    };

    this.socket$.getValue().emit('createMatch', dataMatch);
  }

  private connectNewSocket() {
    this.socket$
      .pipe(switchMap((socket) => fromEvent<IMatch>(socket, 'matchDetails')))
      .subscribe((matchReceived: any) => {
        const newPort = matchReceived.port;
        const newUrl = `http://localhost:${newPort}`;
        this.connectToSocket(newUrl);
      });
  }

  public connectCreatedSocket(port: any) {
    const newUrl = `http://localhost:${port}`;
    this.connectToSocket(newUrl);
  }

  private initSocket() {
    // Initialize general socket connection
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
    this.socket$.getValue().emit('startBattle');
  }

  public passTurn(): void {
    this.socket$.getValue().emit('passTurn');
  }
}
