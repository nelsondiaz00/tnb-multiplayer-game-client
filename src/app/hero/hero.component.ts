import { Component, Input } from '@angular/core';
import { IHero } from '../_models/interfaces/hero.interfaces';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  @Input() heroReceived!: IHero;
  hero!: IHero;

  ngOnChanges() {
    if (this.heroReceived) {
      this.hero = this.heroReceived;
    }
  }
}
