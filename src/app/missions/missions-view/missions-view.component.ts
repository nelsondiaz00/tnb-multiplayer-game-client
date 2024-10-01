import { Component } from '@angular/core';
import { SelectHeroComponent } from "../../match-management/select-hero/select-hero.component";
import { MissionListComponent } from "../mission-list/mission-list.component";

@Component({
  selector: 'app-missions-view',
  standalone: true,
  imports: [SelectHeroComponent, MissionListComponent],
  templateUrl: './missions-view.component.html',
  styleUrl: './missions-view.component.css'
})
export class MissionsViewComponent {

}
