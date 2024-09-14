import { Component, Input } from '@angular/core';
import { ITeam } from '../_models/interfaces/team.interface';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { IHero } from '../_models/interfaces/hero.interfaces';
@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, HeroComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent {
  @Input() teamreceived?: ITeam;
  @Input() amountPlayers?: number;
  team!: ITeam;
  players: (IHero | null)[] = [];
  ngOnChanges() {
    if (this.teamreceived) {
      console.log(this.amountPlayers, ' color');
      this.team = this.teamreceived;
      // Rellenar el array con héroes existentes y null para los espacios vacíos
      this.players = [...this.team.players];
      while (this.players.length < (this.amountPlayers ?? 0)) {
        this.players.push(null); // Espacios vacíos se llenan con null
      }
    } else {
      console.log('No team received');
    }
  }
  trackByHeroId(index: number, player: IHero | null): string | number {
    return player ? player.idUser : index;
  }
}
