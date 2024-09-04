import { Component } from '@angular/core';
import { TeamComponent } from '../team/team.component';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [TeamComponent],
  templateUrl: './match.component.html',
  styleUrl: './match.component.css',
})
export class MatchComponent {}
