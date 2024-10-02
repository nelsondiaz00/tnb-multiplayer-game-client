import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { fromEvent, Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { teamSide } from '../_models/types/team.type';
import { environment } from '../../environments/environment';
import { IHero } from '../_models/interfaces/hero.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  public socket$: BehaviorSubject<Socket>;
  public activeMissions$: Observable<any>;
  public missionPort$: Observable<any>;
  public endMatch$: Observable<any>;
  private HOST = environment.MISSION_HOST;
  private PORT = environment.MISSION_PORT;

  constructor(private userService: UserService) {
    console.log(`http://${this.HOST}:${this.PORT}`);
    const initialSocket = io(`http://${this.HOST}:${this.PORT}`);
    this.socket$ = new BehaviorSubject<Socket>(initialSocket);

    this.activeMissions$ = this.socket$.pipe(
      switchMap((socket) => fromEvent<any>(socket, 'activeMissions'))
    );
    this.endMatch$ = this.socket$.pipe(
      switchMap((socket) => fromEvent<any>(socket, 'endMatch'))
    );
    this.missionPort$ = this.socket$.pipe(
      switchMap((socket) => fromEvent<any>(socket, 'missionPort'))
    );
  }

  public startMissionModule(dataMission: any): void {
    this.socket$.getValue().emit('initMissionModule', dataMission);
    console.log('Mission module started!');
  }

  public connectToSocket(port: string): void {
    if (port !== '') {
      const url = `http://${this.HOST}:${port}`;
      const newSocket = io(url);
      this.socket$.next(newSocket);
      console.log('Connected to mission socket on url ' + url + '!');
    }
  }

  public connectMainSocket(): void {
    if (this.HOST !== '' && this.PORT !== 0) {
      const url = `http://${this.HOST}:${this.PORT}`;
      const newSocket = io(url);
      this.socket$.next(newSocket);
      console.log('Connected to mission main socket on url ' + url + '!');
    }
  }

  // public startMission(missionId: string): void {
  //   this.socket$.getValue().emit('startMission', this.getInfoHero(), missionId);
  //   console.log('Hero', this.getInfoHero());
  // }

  public async startMission(missionId: string): Promise<IHero | null> {
    const heroData = localStorage.getItem('currentHeroSelected');

    if (heroData) {
      const extraDataHero = JSON.parse(heroData);

      try {
        fetch('./assets/json/input-weapon.json')
          .then((response) => response.json())
          .then((data) => {
            const user: string = JSON.parse(
              localStorage.getItem('loggedUser') || '{}'
            ).user;
            const hero: IHero = {
              idUser: user,
              nameUser: 'nameHero',
              idHero: 'idHero',
              type: extraDataHero.type,
              subtype: extraDataHero.subtype,
              attributes: data.attributes,
              products: data.products,
              alive: data.alive,
              teamSide: 'blue',
            };
            this.socket$.getValue().emit('startMission', hero, missionId);
          });
      } catch (error) {
        console.error('Error fetching hero data:', error);
        return null; // Or handle error accordingly
      }
    }

    return null; // If no hero data in localStorage
  }

  public getActiveMissions(): void {
    console.log('obtener misiones!!');
    this.socket$.getValue().emit('getActiveMissions');
  }
}
