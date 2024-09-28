import { Component } from '@angular/core';
import { ClientInventoryService } from '../client-inventory-view/client-inventory-view.service';
import { AbstractHero } from '../../../_models/domain-inventory/hero/AbstractHero';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-hero-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-result.component.html',
  styleUrl: './hero-result.component.css',
})
export class HeroResultComponent {
  heroes: AbstractHero[] = [];
  actualHero!: AbstractHero;
  currentHeroIndex: number = 0;

  constructor(private inventoryService: ClientInventoryService) {}

  ngOnInit(): void {
    this.inventoryService.player$.subscribe((player) => {
      if (player) {
        this.heroes = player.heroList;
        this.actualHero = this.heroes[0];
      }
    });
  }

  public translateHero(type: string, subtype: string): string {
    const translations: { [key: string]: { [key: string]: string } } = {
      MAGO: {
        FUEGO: 'fire.wizard',
        HIELO: 'ice.wizard',
      },
      PICARO: {
        MACHETE: 'machete.rogue',
        VENENO: 'poison.rogue',
      },
      GUERRERO: {
        TANQUE: 'tank.warrior',
        ARMAS: 'weapon.warrior',
      },
    };

    const translatedType =
      '/assets/game-images/heroes/' + translations[type]?.[subtype] + '.png';
    console.log(translatedType, ' ???');
    return translatedType || 'Tipo o subtipo desconocido';
  }
  updateCurrentHero(): void {
    this.actualHero = this.heroes[this.currentHeroIndex];
  }
  nextHero(): void {
    this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroes.length;
    this.updateCurrentHero();
  }

  prevHero(): void {
    this.currentHeroIndex =
      (this.currentHeroIndex - 1 + this.heroes.length) % this.heroes.length;
    this.updateCurrentHero();
  }
}
