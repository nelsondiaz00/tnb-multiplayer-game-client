import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private idUser: string | null = null;
  private teamSide: string | null = null;
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
