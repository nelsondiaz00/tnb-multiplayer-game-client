import { Component, Input, OnChanges } from '@angular/core';
import { IHero } from '../_models/interfaces/hero.interfaces';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements OnChanges {
  @Input() heroreceived!: IHero;
  @Input() ismirrored: boolean = false;
  hero!: IHero;
  maxPower!: number;
  ngOnChanges() {
    if (this.heroreceived) {
      this.hero = this.heroreceived;
      this.maxPower = this.hero.attributes['power'].value;
    }
  }

  getHealthPercentage(): number {
    const healthAttribute = this.hero.attributes['health'];
    const bloodAttribute = this.hero.attributes['blood'];
    if (healthAttribute && bloodAttribute) {
      return (bloodAttribute.value / healthAttribute.value) * 100;
    }
    return 0;
  }

  getPowerPercentage(): number {
    const powerAttribute = this.hero.attributes['power'];
    if (powerAttribute && this.maxPower) {
      return (powerAttribute.value / this.maxPower) * 100;
    }
    return 0;
  }
}
