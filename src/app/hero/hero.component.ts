import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IHero } from '../_models/interfaces/hero.interfaces';
import { CommonModule } from '@angular/common';
import { UserService } from '../_services/user.service';
import { teamSide } from '../_models/types/team.type';
import { WebSocketService } from '../_services/websocket.service';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements OnChanges {
  @Input() heroreceived!: IHero;
  @Input() ismirrored: boolean = false;
  @Input() teamside!: teamSide;
  hero!: IHero;
  maxPower!: number;
  isShaking: boolean = false;

  constructor(
    public userService: UserService,
    private webSocketService: WebSocketService
  ) {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['heroreceived']) {
      const previousHero = changes['heroreceived'].previousValue;
      const currentHero = changes['heroreceived'].currentValue;

      if (
        previousHero &&
        previousHero.attributes['blood'].value !==
          currentHero.attributes['blood'].value
      ) {
        this.triggerHealthBarAnimation();
      }

      this.hero = { ...this.heroreceived };
      this.maxPower = this.hero.attributes['power'].value;
    }
  }

  triggerHealthBarAnimation() {
    const healthElement = document.querySelector('.health-bar');
    if (healthElement) {
      healthElement.classList.add('health-change-animation');
      setTimeout(() => {
        healthElement.classList.remove('health-change-animation');
      }, 1000); // Duración de la animación
    }
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['heroreceived']) {
  //     this.hero = { ...this.heroreceived };
  //   }
  // }

  ngOnInit(): void {
    this.webSocketService.turnInfo$.subscribe(() => {
      this.userService.setHeroComponent(this);
      this.resetTargeted();
    });
    //console.log(this.userService.getIdUser(), ' iduser');
    //console.log(this, ' NOMAAAAAAAAAAAAAAAAAAAAAAAAAAAS');
    // this.userService.setHeroComponent(this);
  }

  activateHability(): void {
    console.log(this.userService.getIdUser(), ' iduser');
    this.isShaking = true;
    setTimeout(() => {
      this.isShaking = false;
    }, 500); // Duración de la animación de "shake"
  }

  getHealthPercentage(): number {
    const healthAttribute = this.hero.attributes['health'];
    const bloodAttribute = this.hero.attributes['blood'];
    if (healthAttribute && bloodAttribute) {
      return (bloodAttribute.value / healthAttribute.value) * 100;
    }
    return 0;
  }

  getPowerPercentage(): number {
    const powerAttribute = this.hero.attributes['power'];
    if (powerAttribute && this.maxPower) {
      return (powerAttribute.value / this.maxPower) * 100;
    }
    return 0;
  }
  setTargetEnemy(): void {
    const userTeamSide = this.userService.getTeamSide();
    const idUser = this.userService.getIdUser();
    const currentIdUser = this.userService.getCurrentIdUser();

    if (this.teamside !== userTeamSide && idUser === currentIdUser) {
      this.userService.setTargetEnemy(this.hero.idUser);
    }
  }

  isTargeted(): boolean {
    const idUser = this.userService.getIdUser();
    const currentIdUser = this.userService.getCurrentIdUser();
    return (
      this.userService.getTargetEnemy() === this.hero.idUser &&
      idUser === currentIdUser
    );
  }
  resetTargeted(): void {
    this.userService.setTargetEnemy(null);
  }

  getHealthBarClass(): string {
    const idUser = this.userService.getIdUser();
    const userTeamSide = this.userService.getTeamSide();

    if (this.hero.idUser === idUser) {
      return 'green';
    } else if (this.teamside === userTeamSide) {
      return 'blue';
    } else {
      return 'red';
    }
  }

  isCurrentUser(): boolean {
    return this.hero.idUser === this.userService.getCurrentIdUser();
  }

  // canInteract(): boolean {
  //   const idUser = this.userService.getIdUser();
  //   const currentIdUser = this.userService.getCurrentIdUser();
  //   console.log(
  //     'canInteract',
  //     idUser,
  //     ' --- ',
  //     currentIdUser,
  //     ' -- ',
  //     this.userService.getTeamSide()
  //   );
  //   return (
  //     idUser !== null && currentIdUser !== null && idUser === currentIdUser
  //   );
  // }
}
