import { Component, OnInit, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabilityService } from './hability.service';
import { IProduct } from '../_models/interfaces/product.interfaces';

@Component({
  selector: 'app-hability',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hability.component.html',
  styleUrls: ['./hability.component.css'],
})
export class HabilityComponent implements OnInit {
  habilities: IProduct[] = [];

  @HostBinding('style.--scale-factor') scaleFactor: number = 1;

  constructor(private habilityService: HabilityService) {}

  ngOnInit(): void {
    this.habilityService.getHabilities().subscribe((data: IProduct[]) => {
      this.habilities = data;
      this.updateScaleFactor();
    });
  }

  getRows() {
    const rows = [];
    for (let i = 0; i < this.habilities.length; i += 4) {
      rows.push(this.habilities.slice(i, i + 4));
    }
    return rows;
  }

  private updateScaleFactor(): void {
    const numRows = Math.ceil(this.habilities.length / 4);
    this.scaleFactor = 1 - Math.min(numRows - 1, 10) * 0.15; // Reduce un 5% por cada fila adicional, hasta un 50% máximo
  }
}
