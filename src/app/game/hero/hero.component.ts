import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IHero } from '../../_models/interfaces/hero.interfaces';
import { CommonModule } from '@angular/common';
import { UserService } from '../../_services/user.service';
import { teamSide } from '../../_models/types/team.type';
import { WebSocketService } from '../../_services/websocket.service';
import { SoundService } from '../../_services/sound.service';
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
  healthDifference: number | null = null;
  failedReason: string = '';
  perpetratorId?: string;
  victimId?: string;
  reasonFailed: string = 'Golpe fallado';

  constructor(
    public userService: UserService,
    private webSocketService: WebSocketService,
    private soundService: SoundService
  ) {}

  ngOnInit(): void {
    this.webSocketService.turnInfo$.subscribe((turnInfo) => {
      this.userService.setHeroComponent(this);
      this.hero.idUser;
      if (turnInfo.idUser.includes('_')) {
        this.userService.setCurrentNameUser('IA');
        console.log('IA');
      } else {
        console.log(this.hero.idUser);
        console.log(this.userService.getIdUser());      
        if (this.hero.idUser === this.userService.getIdUser()) {
          const userJson = localStorage.getItem('loggedUser');
          console.log(userJson);
          //this.userService.getCurrentNameUser()
          if(userJson){
            const user = JSON.parse(userJson)
            if(user){
              console.log(user.user);
              this.hero.nameUser = user.user;
              this.userService.setCurrentNameUser(user.user);
            }
          }else{
            this.userService.setCurrentNameUser(this.hero.nameUser);
          }
        }
      }
     // console.log(this.hero);
      this.resetTargeted();
    });
    this.webSocketService.lastAttackName$.subscribe((lastAttackName: any) => {
      this.perpetratorId = lastAttackName.perpetratorId;
      this.victimId = lastAttackName.victimId;
      if (
        this.perpetratorId &&
        this.userService.getCurrentIdUser() !== this.userService.getIdUser()
      ) {
        // console.log('entró o qué???');
        this.triggerUseHabilityAnimation();
      }
    });
    this.webSocketService.failedReason$.subscribe((reason: string) => {
      if (this.victimId === this.hero.idUser) {
        this.reasonFailed = reason;
        this.healthDifference = 0;
        setTimeout(() => {
          this.healthDifference = null;
        }, 2000);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['heroreceived']) {
      const previousHero = changes['heroreceived'].previousValue;
      const currentHero = changes['heroreceived'].currentValue;

      if (
        previousHero &&
        previousHero.attributes['blood'].value !==
          currentHero.attributes['blood'].value
      ) {
        const previousBlood = previousHero.attributes['blood'].value;
        const currentBlood = currentHero.attributes['blood'].value;
        this.healthDifference = previousBlood - currentBlood;
        this.healthDifference = parseFloat(this.healthDifference.toFixed(1));
        // console.log(this.healthDifference, ' diferencia de vida');
        this.triggerHeroBeatenAnimation();

        setTimeout(() => {
          this.healthDifference = null;
        }, 1000);
      }
      this.hero = { ...this.heroreceived };
      this.maxPower = this.hero.attributes['power'].value;
    }
  }

  getHealthDifferenceClass(): string {
    if (this.healthDifference !== null) {
      if (this.healthDifference === 0) {
        return 'health-difference-white';
      } else if (this.healthDifference < 3) {
        return 'health-difference-green';
      } else if (this.healthDifference >= 3 && this.healthDifference < 5) {
        return 'health-difference-yellow';
      } else {
        return 'health-difference-orange';
      }
    }

    return '';
  }

  triggerHeroBeatenAnimation() {
    const healthContainer = document.querySelector(
      `.health-bar-main-container[data-id-user="${this.hero.idUser}"]`
    );

    const heroElement = document.querySelector(
      `.hero-image[data-id-user="${this.hero.idUser}"]`
    );

    if (healthContainer) {
      const healthElement = healthContainer.querySelector('.health-bar');
      if (healthElement) {
        healthElement.classList.add('health-change-animation');
        setTimeout(() => {
          healthElement.classList.remove('health-change-animation');
        }, 1000);
      }
    }
    if (heroElement) {
      heroElement.classList.add('hero-move-back-animation');
      this.playSound();
      setTimeout(() => {
        heroElement.classList.remove('hero-move-back-animation');
      }, 800);
    }
  }

  private playSound(): void {
    if (this.soundService.isSoundEnabled()) {
      const audio = new Audio('assets/sounds/beaten-sound.mp3');
      audio.play().catch((error) => {
        console.error('Error playing sound:', error);
      });
    }
  }

  triggerUseHabilityAnimation() {
    const heroElement = document.querySelector(
      `.hero-image[data-id-user="${this.perpetratorId}"]`
    );

    if (heroElement) {
      heroElement.classList.add('use-hability-animation');
      heroElement.classList.add('shake');
      setTimeout(() => {
        heroElement.classList.remove('use-hability-animation');
        heroElement.classList.remove('shake');
      }, 1000);
    }
  }

  activateHability(): void {
    this.isShaking = true;
    setTimeout(() => {
      this.isShaking = false;
    }, 500);
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
    if (powerAttribute) {
      return (
        (powerAttribute.value / this.hero.attributes['power'].valueConstant) *
        100
      );
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
    const healthPercentage = this.getHealthPercentage();
    if (healthPercentage > 60) {
      return 'health-bar-green';
    } else if (healthPercentage > 40) {
      return 'health-bar-yellow';
    } else {
      return 'health-bar-red';
    }
  }

  isCurrentUser(): boolean {
    return this.hero.idUser === this.userService.getCurrentIdUser();
  }
}
