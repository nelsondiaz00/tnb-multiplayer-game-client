import { Routes } from '@angular/router';
import { GameViewComponent } from './game/game-view/game-view.component';
import { MatchListComponent } from './match-management/match-list/match-list.component';

export const routes: Routes = [
  { path: 'match-list', component: MatchListComponent },
  { path: 'game-view', component: GameViewComponent },
];
export class AppRoutingModule {}
