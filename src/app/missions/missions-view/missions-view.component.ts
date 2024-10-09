import { Component, OnInit } from '@angular/core';
import { SelectHeroComponent } from '../../match-management/select-hero/select-hero.component';
import { MissionListComponent } from '../mission-list/mission-list.component';
import { MissionService } from '../../_services/missions.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-missions-view',
  standalone: true,
  imports: [SelectHeroComponent, MissionListComponent],
  templateUrl: './missions-view.component.html',
  styleUrl: './missions-view.component.css',
})
export class MissionsViewComponent implements OnInit {
  constructor(private missionService: MissionService) {}

  ngOnInit(): void {
    this.missionService.connectMainSocket();
    this.missionService.missionPort$.subscribe((data) => {
      this.missionService.connectToSocket(data.port);
      this.missionService.getActiveMissions();
    });
    const user: string = JSON.parse(
      localStorage.getItem('loggedUser') || '{}'
    ).user;
    if (user) {
      this.missionService.startMissionModule({ user });
    } else {
      console.error('No user data found in localStorage');
    }
  }
}
