import { Component } from '@angular/core';
import { MissionService } from '../../_services/missions.service';
import { IMission } from '../../_models/interfaces/mission.interface';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-mission-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mission-list.component.html',
  styleUrl: './mission-list.component.css',
})
export class MissionListComponent {
  missions: IMission[] = [];
  constructor(private missionService: MissionService) {}

  ngOnInit(): void {
    this.missionService.activeMissions$.subscribe((missionList: IMission[]) => {
      this.missions = missionList;
      // console.log('Mission list updated!');
    });
    console.log('Mission list component initialized!');
  }

  startMission(mission: IMission) {
    console.log('Starting mission: ', mission);
    this.missionService.startMission(mission.missionId);
  }
}
