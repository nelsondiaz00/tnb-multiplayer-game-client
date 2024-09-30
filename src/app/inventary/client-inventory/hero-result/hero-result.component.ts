import { Component } from '@angular/core';
import { ClientInventoryService } from '../../../_services/client-inventory.service';
import { AbstractHero } from '../../../_models/domain-inventory/hero/AbstractHero';
import { CommonModule } from '@angular/common';
import axios from 'axios';
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

  async ngOnInit(): Promise<void> {
    this.inventoryService.player$.subscribe(async (player) => {
      if (player) {
        for (let i = 0; i < player.heroList.length; i++) {
          let hero: AbstractHero = player.heroList[i];

          hero = (
            (await axios.get(`http://localhost:1803/hero/${hero._id}`))
              .data as { data: AbstractHero }
          ).data;

          player.heroList[i] = hero;
        }
        this.heroes = player.heroList;
        this.actualHero = this.heroes[0];
      }
    });
  }

  public translateHero(type: string, subtype: string): string {
    if (!type || !subtype) {
      return 'TIPO O SUBTIPO DESCONOCIDO';
    }

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
    const upperType = type.toUpperCase();
    const upperSubtype = subtype.toUpperCase();

    const translatedType =
      '/assets/game-images/heroes/' +
      translations[upperType]?.[upperSubtype] +
      '.png';

    return translatedType || 'TIPO O SUBTIPO DESCONOCIDO';
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
