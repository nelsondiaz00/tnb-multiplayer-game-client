import { Component, OnInit } from '@angular/core';
import { AttributeService } from './attribute.service';
import { WebSocketService } from '../../_services/websocket.service';
import { IAttribute } from '../../_models/interfaces/attribute.interfaces';
import { IHero } from '../../_models/interfaces/hero.interfaces';
import { CommonModule } from '@angular/common';
import { UserService } from '../../_services/user.service';
import { IMatch } from '../../_models/interfaces/match.interfaces';
import { MatchService } from '../../_services/match.service';
@Component({
  selector: 'app-attribute',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attribute.component.html',
  styleUrl: './attribute.component.css',
})
export class AttributeComponent implements OnInit {
  attributes: IAttribute[] = [];

  translationDictionary: { [key: string]: string } = {
    power: 'poder',
    health: 'vida',
    attack: 'ataque',
    damage: 'daño',
    critical: 'crítico',
    defense: 'defensa',
    level: 'nivel',
    experience: 'experiencia',
    blood: 'sangre',
  };

  constructor(
    private webSocketService: WebSocketService,
    private userService: UserService,
    private matchService: MatchService
  ) {}

  ngOnInit(): void {
    this.webSocketService.newUser$.subscribe((matchReceived: IMatch) => {
      let match: IMatch = this.matchService.reconstructMatch(matchReceived);
      // console.log(match, ' match ', this.userService.getIdUser());
      let heroAttributes: IAttribute[] = [];

      for (const team of match.teams.values()) {
        const hero = team.players.find(
          (player) => player.idUser === this.userService.getIdUser()
        );

        if (hero) {
          heroAttributes = Object.values(hero.attributes);
          break;
        }
      }

      this.attributes = heroAttributes;
      // console.log(this.attributes, ' attributes');
    });

    this.webSocketService.actualMatch$.subscribe((matchReceived: IMatch) => {
      let match: IMatch = this.matchService.reconstructMatch(matchReceived);
      //console.log(match, ' match ', this.userService.getIdUser());
      let heroAttributes: IAttribute[] = [];

      for (const team of match.teams.values()) {
        const hero = team.players.find(
          (player) => player.idUser === this.userService.getIdUser()
        );

        if (hero) {
          heroAttributes = Object.values(hero.attributes);
          break;
        }
      }

      this.attributes = heroAttributes;
      // console.log(this.attributes, ' attributes');
      // console.log('------------------------------------');
    });
  }

  setAttributes(attributes: IAttribute[]): void {
    this.attributes = attributes;
  }

  translateAttributeName(name: string): string {
    return this.translationDictionary[name] || name;
  }
}
