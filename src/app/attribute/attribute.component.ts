import { Component, OnInit } from '@angular/core';
import { AttributeService } from './attribute.service';
import { WebSocketService } from '../_services/websocket.service';
import { IAttribute } from '../_models/interfaces/attribute.interfaces';
import { IHero } from '../_models/interfaces/hero.interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attribute',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attribute.component.html',
  styleUrl: './attribute.component.css',
})
export class AttributeComponent implements OnInit {
  attributes: IAttribute[] = [];

  constructor(
    private attributeService: AttributeService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.attributeService.getAttributes().subscribe((data: IAttribute[]) => {
      this.attributes = data;
    });

    this.webSocketService.newUser$.subscribe((newUser: IHero) => {
      this.attributes = Object.values(newUser.attributes);
    });
  }

  setAttributes(attributes: IAttribute[]): void {
    this.attributes = attributes;
  }
}
