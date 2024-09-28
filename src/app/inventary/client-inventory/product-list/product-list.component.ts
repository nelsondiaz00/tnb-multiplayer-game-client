import { Component, Input } from '@angular/core';
import { ClientInventoryService } from '../client-inventory-view/client-inventory-view.service';
import { AbstractItem } from '../../../_models/domain-inventory/element/item/AbstractItem';
import AbstractArmor from '../../../_models/domain-inventory/element/armor/AbstractArmor';
import { AbstractWeapon } from '../../../_models/domain-inventory/element/weapon/AbstractWeapon';
import { AbstractPlayer } from '../../../_models/domain-inventory/player/AbstractPlayer';
import { CommonModule } from '@angular/common';
import { AbstractSkill } from '../../../_models/domain-inventory/skill/AbstractSkill';
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

  ngOnInit(): void {
    this.inventoryService.player$.subscribe((player) => {
      if (player) {
        this.items = player.inventory.items;
        this.armors = player.inventory.armors;
        this.weapons = player.inventory.weapons;
      }
    });
  }
}
