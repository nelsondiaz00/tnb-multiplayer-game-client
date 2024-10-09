import { Component, OnInit } from '@angular/core';

import httpService from '../../_services/http.service';
import { IHero } from '../../_models/interfaces/hero.interfaces';
import { UserService } from '../../_services/user.service';

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
    private userService: UserService
  ) {}
  ngOnInit() {
    this.httpService.getHeroesFromPlayer().then((heroes) => {
      this.heroList = heroes;
      this.currentHeroSelected = this.heroList[0];
      this.userService.setHeroSelected(this.heroList[0]);
    });
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

  // readonly heroes = [
  //   {
  //     type: 'wizard',
  //     subtype: 'fire',
  //     image: './assets/game-images/heroes/fire.wizard.png',
  //     owned: true,
  //   },
  //   {
  //     type: 'wizard',
  //     subtype: 'ice',
  //     image: './assets/game-images/heroes/ice.wizard.png',
  //     owned: true,
  //   },
  //   {
  //     type: 'rogue',
  //     subtype: 'machete',
  //     image: './assets/game-images/heroes/machete.rogue.png',
  //     owned: true,
  //   },
  //   {
  //     type: 'rogue',
  //     subtype: 'poison',
  //     image: './assets/game-images/heroes/poison.rogue.png',
  //     owned: false,
  //   },
  //   {
  //     type: 'warrior',
  //     subtype: 'tank',
  //     image: './assets/game-images/heroes/tank.warrior.png',
  //     owned: false,
  //   },
  //   {
  //     type: 'warrior',
  //     subtype: 'weapon',
  //     image: './assets/game-images/heroes/weapon.warrior.png',
  //     owned: false,
  //   },
  // ];

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
