import { Component } from '@angular/core';
import { HeroInventoryComponent } from '../hero-inventory/hero-inventory.component';
import { HeroResultComponent } from '../hero-result/hero-result.component';
import { ClientInventoryService } from './client-inventory-view.service';
@Component({
  selector: 'app-client-inventory-view',
  standalone: true,
  imports: [HeroInventoryComponent, HeroResultComponent],
  templateUrl: './client-inventory-view.component.html',
  styleUrl: './client-inventory-view.component.css',
})
export class ClientInventoryViewComponent {
  constructor(private inventoryService: ClientInventoryService) {}

  ngOnInit() {
    this.inventoryService.setPlayer();
  }
}
