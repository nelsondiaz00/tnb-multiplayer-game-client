import { Component, OnInit, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabilityService } from './hability.service';
import { IProduct } from '../_models/interfaces/product.interfaces';
import { WebSocketService } from '../_services/websocket.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-hability',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hability.component.html',
  styleUrls: ['./hability.component.css'],
})
export class HabilityComponent implements OnInit {
  habilities: IProduct[] = [];

  @HostBinding('style.--scale-factor') scaleFactor: number = 1;

  constructor(
    private habilityService: HabilityService,
    private webSocketService: WebSocketService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.habilityService.getHabilities().subscribe((data: IProduct[]) => {
      this.habilities = data;
      this.updateScaleFactor();
    });
  }

  getRows() {
    const rows = [];
    for (let i = 0; i < this.habilities.length; i += 4) {
      rows.push(this.habilities.slice(i, i + 4));
    }
    return rows;
  }

  private updateScaleFactor(): void {
    const numRows = Math.ceil(this.habilities.length / 4);
    this.scaleFactor = 1 - Math.min(numRows - 1, 10) * 0.15;
  }

  useHability(idHability: string): void {
    const heroComponent = this.userService.getHeroComponent();
    // console.log(heroComponent, ' ahora si wtf');
    const idUser = this.userService.getIdUser();
    const targetEnemy = this.userService.getTargetEnemy();
    const currentIdUser = this.userService.getCurrentIdUser();

    if (
      idUser !== null &&
      currentIdUser !== null &&
      targetEnemy !== null &&
      idUser === currentIdUser
    ) {
      if (heroComponent) {
        console.log('activating hability');
        heroComponent.activateHability();
        // Introduce a delay to ensure the animation runs before the WebSocket call
        setTimeout(() => {
          this.webSocketService.useHability(idUser, idHability, targetEnemy);
        }, 500); // Ajusta el tiempo según la duración de la animación
      } else {
        this.webSocketService.useHability(idUser, idHability, targetEnemy);
      }
    }
  }
}
