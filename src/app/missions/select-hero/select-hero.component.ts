import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-hero',
  standalone: true,
  imports: [],
  templateUrl: './select-hero.component.html',
  styleUrl: './select-hero.component.css',
})
export class SelectHeroComponent implements OnInit {
  ngOnInit() {
    localStorage.setItem('currentHeroSelected', JSON.stringify(this.heroes[0]));
  }

  readonly heroes = [
    {
      type: 'wizard',
      subtype: 'fire',
      image: './assets/game-images/heroes/fire.wizard.png',
      owned: true,
    },
    {
      type: 'wizard',
      subtype: 'ice',
      image: './assets/game-images/heroes/ice.wizard.png',
      owned: true,
    },
    {
      type: 'rogue',
      subtype: 'machete',
      image: './assets/game-images/heroes/machete.rogue.png',
      owned: true,
    },
    {
      type: 'rogue',
      subtype: 'poison',
      image: './assets/game-images/heroes/poison.rogue.png',
      owned: false,
    },
    {
      type: 'warrior',
      subtype: 'tank',
      image: './assets/game-images/heroes/tank.warrior.png',
      owned: false,
    },
    {
      type: 'warrior',
      subtype: 'weapon',
      image: './assets/game-images/heroes/weapon.warrior.png',
      owned: false,
    },
  ];

  currentHeroIndex: number = 0;

  get currentHero() {
    return this.heroes[this.currentHeroIndex];
  }

  nextHero() {
    this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroes.length;
    localStorage.setItem(
      'currentHeroSelected',
      JSON.stringify(this.heroes[this.currentHeroIndex])
    );
  }

  prevHero() {
    this.currentHeroIndex =
      (this.currentHeroIndex - 1 + this.heroes.length) % this.heroes.length;
    localStorage.setItem(
      'currentHeroSelected',
      JSON.stringify(this.heroes[this.currentHeroIndex])
    );
  }

  public translateHero(type: string, subtype: string): string {
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

    const translatedType = translations[type]?.[subtype];

    return translatedType || 'Tipo o subtipo desconocido';
  }
}
