import { Component } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductConditionComponent } from '../../product-condition/product-condition.component';
import { ClientInventoryService } from '../client-inventory-view/client-inventory-view.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-hero-inventory',
  standalone: true,
  imports: [ProductListComponent, ProductConditionComponent, CommonModule],
  templateUrl: './hero-inventory.component.html',
  styleUrls: ['./hero-inventory.component.css'],
})
export class HeroInventoryComponent {
  filter: string = 'all';
  currentPage: number = 1;
  itemsPerPage: number = 12;

  constructor(private inventoryService: ClientInventoryService) {}

  setFilter(filter: string): void {
    this.filter = filter;
    this.currentPage = 1; 
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  get totalPages(): number {
    const totalItems =
      (this.filter === 'all' || this.filter === 'armors'
        ? this.inventoryService.getPlayer()?.props.inventory.armors?.length ?? 0
        : 0) +
      (this.filter === 'all' || this.filter === 'items'
        ? this.inventoryService.getPlayer()?.props.inventory.items?.length ?? 0
        : 0) +
      (this.filter === 'all' || this.filter === 'weapons'
        ? this.inventoryService.getPlayer()?.props.inventory.weapons?.length ??
          0
        : 0);
    return Math.ceil(totalItems / this.itemsPerPage);
  }
}
