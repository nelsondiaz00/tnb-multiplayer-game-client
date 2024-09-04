import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { fromEvent, Observable } from 'rxjs';
import { IMatch } from '../_models/interfaces/match.interfaces';
import { IProduct } from '../_models/interfaces/product.interfaces';
import { IHero } from '../_models/interfaces/hero.interfaces';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket;
  public newUser$: Observable<IHero>;
  public turnInfo$: Observable<any>; // Define a specific type if available
  public habilityUsed$: Observable<IMatch>;
  public actualMatch$: Observable<IMatch>;

  constructor(private userService: UserService) {
    this.socket = io('ws://your-websocket-url');
    this.newUser$ = fromEvent<IHero>(this.socket, 'newUser');
    this.turnInfo$ = fromEvent<any>(this.socket, 'turnInfo');
    this.habilityUsed$ = fromEvent<IMatch>(this.socket, 'habilityUsed');
    this.actualMatch$ = fromEvent<IMatch>(this.socket, 'actualMatch');
    this.initSocket();
  }

  private initSocket(): void {
    fetch('./assets/input1.json')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.idUser) {
          this.userService.setIdUser(data.idUser);
          this.userService.setTeamSide(data.teamSide);
        }
        this.socket.on('connect', () => {
          this.socket.emit('bindInfo', data);
        });
      })
      .catch((error) => console.error('Error al cargar el archivo:', error));
  }

  public getMatch(): void {
    this.socket.emit('getMatch');
  }

  public useHability(jsonProductPath: any): void {
    this.socket.emit('useHability', jsonProductPath);
    this.passTurn();
  }

  public startBattle(): void {
    this.socket.emit('startBattle');
  }

  public passTurn(): void {
    this.socket.emit('passTurn');
  }
}
