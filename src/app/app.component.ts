import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ChatBotViewComponent } from './chatbot/chat-bot-view/chat-bot-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatBotViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tnb-multiplayer-client';

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
