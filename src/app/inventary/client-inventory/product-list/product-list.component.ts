import { Component, Input } from '@angular/core';
import { ClientInventoryService } from '../client-inventory-view/client-inventory-view.service';
import { AbstractItem } from '../../../_models/domain-inventory/element/item/AbstractItem';
import AbstractArmor from '../../../_models/domain-inventory/element/armor/AbstractArmor';
import { AbstractWeapon } from '../../../_models/domain-inventory/element/weapon/AbstractWeapon';
import { AbstractPlayer } from '../../../_models/domain-inventory/player/AbstractPlayer';
import { CommonModule } from '@angular/common';
import { AbstractSkill } from '../../../_models/domain-inventory/skill/AbstractSkill';
import axios from 'axios';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  items: AbstractItem[] = [];
  armors: AbstractArmor[] = [];
  weapons: AbstractWeapon[] = [];
  skills: AbstractSkill[] = [];
  isItems: boolean = true;
  isArmors: boolean = true;
  isWeapons: boolean = true;
  @Input() filter: string = 'all';
  constructor(private inventoryService: ClientInventoryService) {}

  ngOnChanges(): void {
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.filter === 'all') {
      this.isItems = true;
      this.isArmors = true;
      this.isWeapons = true;
    } else if (this.filter === 'items') {
      this.isItems = true;
      this.isArmors = false;
      this.isWeapons = false;
    } else if (this.filter === 'armors') {
      this.isItems = false;
      this.isArmors = true;
      this.isWeapons = false;
    } else if (this.filter === 'weapons') {
      this.isItems = false;
      this.isArmors = false;
      this.isWeapons = true;
    }
  }

  getImagePath(
    name: string,
    type: 'armors' | 'weapons' | 'items' | 'spells'
  ): string {
    const newName = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ñ/g, 'n')
      .replace(/\s+/g, '-')
      .toLowerCase();
    // console.log(`assets/game-images/${type}/${newName}.png`);

    return `assets/game-images/${type}/${newName}.png`;
  }

  async ngOnInit(): Promise<void> {
    this.inventoryService.player$.subscribe(async (player) => {
      if (player) {
        for (let i = 0; i < player.inventory.armors.length; i++) {
          let armor: AbstractArmor = player.inventory.armors[i];

          armor = (
            (await axios.get(`http://localhost:1803/armor/${armor._id}`))
              .data as { data: AbstractArmor }
          ).data;

          player.inventory.armors[i] = armor;
        }
        this.armors = player.inventory.armors;

        for (let i = 0; i < player.inventory.items.length; i++) {
          let item: AbstractItem = player.inventory.items[i];

          item = (
            (await axios.get(`http://localhost:1803/item/${item._id}`))
              .data as { data: AbstractItem }
          ).data;

          player.inventory.items[i] = item;
        }
        this.items = player.inventory.items;

        for (let i = 0; i < player.inventory.weapons.length; i++) {
          let weapon: AbstractWeapon = player.inventory.weapons[i];

          // console.log(weapon._id);

          weapon = (
            (await axios.get(`http://localhost:1803/weapon/${weapon._id}`))
              .data as { data: AbstractWeapon }
          ).data;

          player.inventory.weapons[i] = weapon;
        }
        this.weapons = player.inventory.weapons;
      }
    });
  }
}
