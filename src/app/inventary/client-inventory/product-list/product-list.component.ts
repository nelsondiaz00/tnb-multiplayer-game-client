import { Component, Input, SimpleChanges } from '@angular/core';
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
  @Input() filter: string = 'all';
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 12;
  items: AbstractItem[] = [];
  armors: AbstractArmor[] = [];
  weapons: AbstractWeapon[] = [];
  skills: AbstractSkill[] = [];
  filteredItems: any[] = [];

  constructor(private inventoryService: ClientInventoryService) {}

  async ngOnInit(): Promise<void> {
    this.inventoryService.player$.subscribe(async (player) => {
      if (player) {
        for (let i = 0; i < player.inventory.armors.length; i++) {
          let armor: AbstractArmor = player.inventory.armors[i];
          armor = (
            (await axios.get(`http://localhost:1803/armor/${armor._id}`)).data as { data: AbstractArmor }
          ).data;
          player.inventory.armors[i] = armor;
        }
        this.armors = player.inventory.armors;

        for (let i = 0; i < player.inventory.items.length; i++) {
          let item: AbstractItem = player.inventory.items[i];
          item = (
            (await axios.get(`http://localhost:1803/item/${item._id}`)).data as { data: AbstractItem }
          ).data;
          player.inventory.items[i] = item;
        }
        this.items = player.inventory.items;

        for (let i = 0; i < player.inventory.weapons.length; i++) {
          let weapon: AbstractWeapon = player.inventory.weapons[i];
          weapon = (
            (await axios.get(`http://localhost:1803/weapon/${weapon._id}`)).data as { data: AbstractWeapon }
          ).data;
          player.inventory.weapons[i] = weapon;
        }
        this.weapons = player.inventory.weapons;

        this.applyFilter();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter'] || changes['currentPage'] || changes['itemsPerPage']) {
      this.applyFilter();
    }
  }

  applyFilter(): void {
    let filtered: any[] = [];
    if (this.filter === 'all' || this.filter === 'armors') {
      filtered = filtered.concat(this.armors);
    }
    if (this.filter === 'all' || this.filter === 'items') {
      filtered = filtered.concat(this.items);
    }
    if (this.filter === 'all' || this.filter === 'weapons') {
      filtered = filtered.concat(this.weapons);
    }
    this.filteredItems = filtered;
  }

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredItems.slice(start, start + this.itemsPerPage);
  }

  getImagePath(name: string, type: string): string {
    const newName = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ñ/g, 'n')
      .replace(/\s+/g, '-')
      .toLowerCase();
    return `assets/game-images/${type}/${newName}.png`;
  }

  getItemType(item: any): string {
    if (this.armors.includes(item)) return 'armors';
    if (this.items.includes(item)) return 'items';
    if (this.weapons.includes(item)) return 'weapons';
    return 'unknown';
  }
}
