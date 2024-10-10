import { Component } from '@angular/core';
import { HeroData } from './CreateHeroRequest';
import { HeroModel } from './hero.service';

@Component({
  selector: 'HeroForm',
  standalone: true,
  templateUrl: './HeroForm.component.html',
  styleUrl: './HeroForm.component.css',
})
export class HeroForm {
  private readonly heroModel: HeroModel;

  constructor() {
    this.heroModel = new HeroModel();

    document
      .getElementById('hero-form')
      ?.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        const data = this.getData();

        // this.heroModel.registerHero(data);
      });
  }

  getData = (): HeroData => {
    // const idGroup = (this.getElement('') as HTMLSelectElement).value;
    // const idSupgroup = (this.getElement('') as HTMLSelectElement).value;

    // ATRIBUTES
    // const criticalDamage = this.getElement('');
    // const evadeHit = this.getElement('');
    // const fromResist = this.getElement('');
    // const toResist = this.getElement('');

    // const criticalDamagePercent = this.getElement('');
    // const evadeHitPercent = this.getElement('');
    // const resistHitPercent = this.getElement('');
    // const escapeHitPercent = this.getElement('');
    // const noDamagePercent = this.getElement('');

    return {
      idGroup: '',
      idSupgroup: '',
      status: 1,
      heroName: 'newHero',
      heroLevel: 0,
      heroBlood: 1000,
      heroMana: 1000,
      heroDefense: 1000,
      heroAttack: {
        value: 0,
        minValue: 0,
        maxValue: 0,
      },
      heroDamage: {
        value: 0,
        minValue: 0,
        maxValue: 0,
      },
      heroSkills: [],
      baseStats: {
        damageProbability: 0,
        criticalProbability: 0,
        evadeHitProbability: 0,
        resistProbability: 0,
        escapeProbability: 0,
      },
    };
  };
}
