import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractPlayer } from '../../../_models/domain-inventory/player/AbstractPlayer';
import { AbstractInventory } from '../../../_models/domain-inventory/inventory/AbstractInventory';
import Inventory from '../../../_models/domain-inventory/inventory/Inventory';
import Player from '../../../_models/domain-inventory/player/Player';
import { AbstractHero } from '../../../_models/domain-inventory/hero/AbstractHero';

@Injectable({
  providedIn: 'root',
})
export class ClientInventoryService {
  private jsonUrl = 'assets/json/input-inventory.json';
  private playerSubject = new BehaviorSubject<AbstractPlayer | null>(null);
  public player$ = this.playerSubject.asObservable();

  constructor(private http: HttpClient) {}

  setPlayer(): void {
    this.getPlayerFromJson().subscribe((player) => {
      this.playerSubject.next(player);
      console.log(player + " ' ??'");
    });
  }

  getPlayer(): AbstractPlayer | null {
    return this.playerSubject.value;
  }

  getPlayerFromJson(): Observable<AbstractPlayer> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map((data) => {
        const playerData = data.player;
        if (!playerData || !playerData.inventory) {
          throw new Error('Invalid data structure');
        }

        const inventory: AbstractInventory = Inventory.create(
          playerData.inventory.id,
          playerData.inventory.armors,
          playerData.inventory.items,
          playerData.inventory.weapons,
          playerData.inventory.size
        );

        const player: AbstractPlayer = Player.create(
          playerData.playerId,
          playerData.name,
          playerData.level,
          inventory,
          playerData.heroList as AbstractHero[]
        );

        console.log(player);

        return player;
      })
    );
  }
}
