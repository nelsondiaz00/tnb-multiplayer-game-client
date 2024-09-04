import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { MatchComponent } from './match/match.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeroComponent, ActionBarComponent, MatchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tnb-multiplayer-client';
}
