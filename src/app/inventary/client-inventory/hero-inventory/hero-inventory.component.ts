import { Component } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductConditionComponent } from '../../product-condition/product-condition.component';

@Component({
  selector: 'app-hero-inventory',
  standalone: true,
  imports: [ProductListComponent, ProductConditionComponent],
  templateUrl: './hero-inventory.component.html',
  styleUrls: ['./hero-inventory.component.css'],
})
export class HeroInventoryComponent {
  filter: string = 'all';

  setFilter(filter: string): void {
    this.filter = filter;
  }
}
