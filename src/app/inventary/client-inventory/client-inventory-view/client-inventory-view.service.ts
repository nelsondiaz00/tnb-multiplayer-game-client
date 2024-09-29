import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractPlayer } from '../../../_models/domain-inventory/player/AbstractPlayer';
import { AbstractInventory } from '../../../_models/domain-inventory/inventory/AbstractInventory';
import Inventory from '../../../_models/domain-inventory/inventory/Inventory';
import Player from '../../../_models/domain-inventory/player/Player';
import { AbstractHero } from '../../../_models/domain-inventory/hero/AbstractHero';
import axios from 'axios';
import NullPlayer from '../../../_models/domain-inventory/player/NullPlayer';

@Injectable({
  providedIn: 'root',
})
export class ClientInventoryService {
  private jsonUrl = 'assets/json/input-inventory.json';
  private playerSubject = new BehaviorSubject<AbstractPlayer | null>(null);
  public player$ = this.playerSubject.asObservable();

  constructor(private http: HttpClient) { }

  async setPlayer(): Promise<void> {
    const playerObservable = await this.getPlayerFromApi();
    playerObservable.subscribe((player) => {
      this.playerSubject.next(player);
      console.log(player + " ' ??'");
    });
  }

  getPlayer(): AbstractPlayer | null {
    return this.playerSubject.value;
  }

  async getPlayerFromApi(): Promise<Observable<AbstractPlayer>> {

    let player: AbstractPlayer = NullPlayer.create();

    const response = await axios.post("http://localhost:1803/player/getPlayer", { "id": "66f88ce65033b7f4bab66a44" })

    if (response.data) {

      const playerData: AbstractPlayer = (response.data as {data: AbstractPlayer}).data;

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
        playerData.id,
        playerData.props.name,
        playerData.props.level,
        inventory,
        playerData.props.heroList as AbstractHero[]
      );

    }

    return new BehaviorSubject<AbstractPlayer>(player).asObservable();
  }
}
