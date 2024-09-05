import { Component, Input } from '@angular/core';
import { ITeam } from '../_models/interfaces/team.interface';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, HeroComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent {
  @Input() teamreceived?: ITeam;
  team!: ITeam;

  ngOnChanges() {
    if (this.teamreceived) {
      this.team = this.teamreceived;
    } else {
      console.log('No team received');
    }
  }
}
