import { Injectable } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private idUser: string | null = null;
  private teamSide: string | null = null;
  private targetEnemy: string | null = null;
  private currentIdUser: string | null = null;
  private heroComponent: HeroComponent | null = null;

  setHeroComponent(heroComponent: HeroComponent): void {
    if (heroComponent.hero.idUser === this.currentIdUser) {
      this.heroComponent = heroComponent;
    }
  }

  getHeroComponent(): HeroComponent | null {
    return this.heroComponent;
  }

  setCurrentIdUser(id: string): void {
    console.log('setCurrentIdUser!!: ', id);
    this.currentIdUser = id;
  }
  getCurrentIdUser(): string | null {
    return this.currentIdUser;
  }

  setTargetEnemy(target: string | null): void {
    this.targetEnemy = target;
  }
  getTargetEnemy(): string | null {
    return this.targetEnemy;
  }

  setIdUser(id: string): void {
    this.idUser = id;
  }

  getIdUser(): string | null {
    return this.idUser;
  }

  setTeamSide(side: string): void {
    this.teamSide = side;
  }

  getTeamSide(): string | null {
    return this.teamSide;
  }
}
