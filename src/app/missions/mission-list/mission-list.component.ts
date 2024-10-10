import { Component } from '@angular/core';
import { MissionService } from '../../_services/missions.service';
import { IMission } from '../../_models/interfaces/mission.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../_models/interfaces/product.interfaces';
import { RewardModalComponent } from '../reward-modal/reward-modal.component';
@Component({
  selector: 'app-mission-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RewardModalComponent],
  templateUrl: './mission-list.component.html',
  styleUrl: './mission-list.component.css',
})
export class MissionListComponent {
  missions: IMission[] = [];
  selectedMission: IMission | null = null;
  remainingTime: number = 0;
  private intervalId: any;
  rewardInfo: IProduct[] | null = null;
  showRewardModal: boolean = false;
  missionReward: IMission | null = null;
  showRewardModals: boolean[] = [];
  rewardInfos: { rewards: IProduct[]; mission: IMission }[] = [];
  constructor(private missionService: MissionService) {}

  ngOnInit(): void {
    this.missionService.activeMissions$.subscribe((missionList: IMission[]) => {
      this.missions = missionList;
      this.selectedMission = this.missions[0] || null;
      this.updateRemainingTime();
      console.log('Misiones actualizadas:', missionList);
    });

    this.missionService.updatedMission$.subscribe((newMission: IMission) => {
      const foundMission = this.missions.find(
        (mission) => mission.missionId === newMission.missionId
      );
      if (foundMission) {
        foundMission.chronometer = newMission.chronometer;
        foundMission.active = newMission.active;
        foundMission.time = newMission.time;
      } else {
        this.selectedMission = null;
      }
      console.log('new mission: ', newMission);
      if (foundMission?.missionId === this.selectedMission?.missionId) {
        this.updateRemainingTime();
      }
    });

    this.missionService.missionReward$.subscribe((rewardInfo: any) => {
      const { reward, mission } = rewardInfo;
      this.rewardInfos.push({ rewards: reward, mission });
      this.showRewardModals.push(true);
      console.log('llegaron recompensas');
    });

    console.log('Mission list component initialized!');
  }

  onMissionSelect(): void {
    console.log('Mission selected!');
    if (this.selectedMission) {
      this.missionService.getMission(this.selectedMission.missionId);
    }
  }

  startMission(mission: IMission) {
    console.log('Starting mission: ', mission);
    this.missionService.startMission(mission.missionId);
  }

  private updateRemainingTime(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    if (this.selectedMission) {
      this.remainingTime =
        this.selectedMission.time - this.selectedMission.chronometer;
      // console.log(this.selectedMission.chronometer, ' chrono');
      this.intervalId = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
        } else {
          clearInterval(this.intervalId);
        }
      }, 1000);
    }
  }

  handleCloseModal(index: number): void {
    this.showRewardModal = false;
    this.rewardInfo = null;
    this.showRewardModals[index] = false;
  }
}
