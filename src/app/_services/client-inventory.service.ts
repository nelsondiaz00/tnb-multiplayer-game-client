import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractPlayer } from '../_models/domain-inventory/player/AbstractPlayer';
import { AbstractInventory } from '../_models/domain-inventory/inventory/AbstractInventory';
import Inventory from '../_models/domain-inventory/inventory/Inventory';
import Player from '../_models/domain-inventory/player/Player';
import { AbstractHero } from '../_models/domain-inventory/hero/AbstractHero';
import axios from 'axios';
import NullPlayer from '../_models/domain-inventory/player/NullPlayer';
import { NullHero } from '../_models/domain-inventory/hero/NullHero';

@Injectable({
  providedIn: 'root',
})
export class ClientInventoryService {
  private playerSubject = new BehaviorSubject<AbstractPlayer | null>(null);
  public player$ = this.playerSubject.asObservable();
  public heroeActual: AbstractHero = NullHero.create();
  public actualHeroIndex: number = 0;
  private heroesSubject = new BehaviorSubject<AbstractHero[]>([]);
  public heroes$ = this.heroesSubject.asObservable();

  async setPlayer(): Promise<void> {
    const playerObservable = await this.getPlayerFromApi();
    playerObservable.subscribe((player) => {
      this.playerSubject.next(player);
      // console.log(player);
    });
  }

  getPlayer(): AbstractPlayer | null {
    return this.playerSubject.value;
  }

  async getPlayerFromApi(): Promise<Observable<AbstractPlayer>> {
    let player: AbstractPlayer = NullPlayer.create();

    const id = '67061760b6520aa3bf635210';

    const response = await axios.post(
      (this.getInventoryDomain()+'/player/getPlayer'),
      { id }
    );

    if (response.data) {
      const playerData: AbstractPlayer = (
        response.data as { data: AbstractPlayer }
      ).data;

      if (!playerData || !playerData.props.inventory) {
        throw new Error('Invalid data structure');
      }

      const inventory: AbstractInventory = Inventory.create(
        playerData.props.inventory.id,
        playerData.props.inventory.props.armors,
        playerData.props.inventory.props.items,
        playerData.props.inventory.props.weapons,
        playerData.props.inventory.props.size
      );

      player = Player.create(
        id,
        playerData.props.name,
        playerData.props.level,
        inventory,
        playerData.props.heroList as AbstractHero[]
      );
    }

    return new BehaviorSubject<AbstractPlayer>(player).asObservable();
  }

  setHeroeActual(hero: AbstractHero): void {
    this.heroeActual = hero;
  }

  getHeroeActual(): AbstractHero {
    return this.heroeActual;
  }

  setActualHeroIndex(index: number): void {
    this.actualHeroIndex = index;
  }

  getActualHeroIndex(): number {
    return this.actualHeroIndex;
  }

  setHeroes(heroes: AbstractHero[]): void {
    this.heroesSubject.next(heroes);
  }

  getHeroes(): Observable<AbstractHero[]> {
    return this.heroes$;
  }

  getInventoryDomain(): string{
    return 'http://localhost:1803'
  }
}
