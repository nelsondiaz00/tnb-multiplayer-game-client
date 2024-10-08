import { Component } from '@angular/core';
import { ClientInventoryService } from '../../../_services/client-inventory.service';
import { AbstractHero } from '../../../_models/domain-inventory/hero/AbstractHero';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { Subscription } from 'rxjs';
import { re } from 'mathjs';
import AbstractArmor from '../../../_models/domain-inventory/element/armor/AbstractArmor';
@Component({
  selector: 'app-hero-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-result.component.html',
  styleUrl: './hero-result.component.css',
})
export class HeroResultComponent {
  actualHero!: AbstractHero;
  currentHeroIndex: number = 0;
  heroesSubscription: Subscription = new Subscription();
  heroes: AbstractHero[] = [];

  constructor(private inventoryService: ClientInventoryService) { }

  async ngOnInit(): Promise<void> {
    this.heroesSubscription = this.inventoryService.heroes$.subscribe(heroes => {
      if (heroes.length > 0) {
        this.heroes = heroes
        this.updateCurrentHero();
      }
    });
    this.inventoryService.player$.subscribe(async (player) => {
      if (player) {
        // for (let i = 0; i < player.heroList.length; i++) {
        //   let hero: AbstractHero = player.heroList[i];

        //   hero = (
        //     (await axios.get(`http://localhost:1803/hero/${hero._id}`))
        //       .data as { data: AbstractHero }
        //   ).data;

        //   player.heroList[i] = hero;
        // }
        this.inventoryService.setHeroes(player.heroList);
        this.actualHero = this.heroes[0];
        this.inventoryService.setHeroeActual(this.actualHero);
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
    this.inventoryService.setHeroeActual(this.actualHero);
  }
  nextHero(): void {
    this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroes.length;
    this.inventoryService.setActualHeroIndex(this.currentHeroIndex);
    this.updateCurrentHero();
  }

  prevHero(): void {
    this.currentHeroIndex =
      (this.currentHeroIndex - 1 + this.heroes.length) % this.heroes.length;
    this.inventoryService.setActualHeroIndex(this.currentHeroIndex);
    this.updateCurrentHero();
  }

  getImagePath(name: string, type: string): string {
    name = name.trimEnd();
    const newName = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ñ/g, 'n')
      .replace(/\s+/g, '-')
      .toLowerCase();
    console.log(`assets/game-images/${type}/${newName}.png`);
    return `assets/game-images/${type}/${newName}.png`;
  }

  getEquipedArmorImage( armorType: string ): string {
    let armorName = ""
    this.inventoryService.getHeroeActual().props.inventory?.props.armors.forEach(armor => {
      if (armor.type === armorType) {
        armorName = armor.props.name;
      }
    })
    if(armorName === ""){
      return ""
    }
    return `url(${this.getImagePath( armorName, 'armors')})`
  }

}
