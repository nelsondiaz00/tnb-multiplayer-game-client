import { Component } from '@angular/core';
import { ChatBotViewComponent } from '../chatbot/chat-bot-view/chat-bot-view.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ChatBotViewComponent, CommonModule, RouterOutlet],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  title = 'tnb-multiplayer-client';

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
