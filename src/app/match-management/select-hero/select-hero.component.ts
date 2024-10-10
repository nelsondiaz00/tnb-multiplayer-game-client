import { Component, OnInit } from '@angular/core';

import httpService from '../../_services/http.service';
import { IHero } from '../../_models/interfaces/hero.interfaces';
import { UserService } from '../../_services/user.service';
import { ClientInventoryService } from '../../_services/client-inventory.service';

@Component({
  selector: 'app-select-hero',
  standalone: true,
  imports: [],
  templateUrl: './select-hero.component.html',
  styleUrl: './select-hero.component.css',
})
export class SelectHeroComponent implements OnInit {
  heroList: IHero[] = [];
  currentHeroSelected: IHero | null = null;

  constructor(
    private httpService: httpService,
    private userService: UserService,
    private inventoryService: ClientInventoryService
  ) {}
  ngOnInit() {
    this.httpService.getHeroesFromPlayer().then((heroes) => {
      this.heroList = heroes;
     // console.log(this.heroList);
      this.currentHeroSelected = this.heroList[0];
      this.userService.setHeroSelected(this.heroList[0]);
    });
    this.inventoryService.setPlayer();
  }

  getHeroImageUrl(): string {
    if (this.currentHeroSelected?.subtype && this.currentHeroSelected?.type) {
      return (
        './assets/game-images/heroes/' +
        this.currentHeroSelected.subtype +
        '.' +
        this.currentHeroSelected.type +
        '.png'
      );
    }
    return './assets/game-images/heroes/ice.wizard.png';
  }

  currentHeroIndex: number = 0;

  getCurrentHero(): IHero {
    return this.heroList[this.currentHeroIndex];
  }

  nextHero() {
    this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroList.length;
    this.currentHeroSelected = this.heroList[this.currentHeroIndex];
    this.userService.setHeroSelected(this.currentHeroSelected);
    // localStorage.setItem(
    //   'currentHeroSelected',
    //   JSON.stringify(this.heroes[this.currentHeroIndex])
    // );
  }

  prevHero() {
    this.currentHeroIndex =
      (this.currentHeroIndex - 1 + this.heroList.length) % this.heroList.length;
    this.currentHeroSelected = this.heroList[this.currentHeroIndex];
    this.userService.setHeroSelected(this.currentHeroSelected);
  }

  public translateHero(type?: string, subtype?: string): string {
    const translations: { [key: string]: { [key: string]: string } } = {
      wizard: {
        fire: 'Mago de Fuego',
        ice: 'Mago de Hielo',
      },
      rogue: {
        machete: 'Pícaro Machete',
        poison: 'Pícaro Veneno',
      },
      warrior: {
        tank: 'Guerrero Tanque',
        weapon: 'Guerrero Armas',
      },
    };

    // Verifica si type y subtype son válidos
    if (type && subtype && translations[type]) {
      return translations[type][subtype] || 'Subtipo desconocido';
    }

    return 'Tipo o subtipo desconocido';
  }
}
