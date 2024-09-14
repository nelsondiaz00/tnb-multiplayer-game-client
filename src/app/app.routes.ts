import { Routes } from '@angular/router';
import { GameViewComponent } from './game-view/game-view.component';
import { MatchListComponent } from './match-list/match-list.component';

export const routes: Routes = [
  { path: 'match-list', component: MatchListComponent },
  { path: 'game-view', component: GameViewComponent },
];
export class AppRoutingModule {}
