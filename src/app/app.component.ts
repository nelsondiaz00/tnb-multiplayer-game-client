import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ChatBotViewComponent } from './chatbot/chat-bot-view/chat-bot-view.component';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { SoundControlComponent } from "./sound-control/sound-control.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatBotViewComponent, CommonModule, SoundControlComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tnb-multiplayer-client';
  showHeader = true;
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        this.showHeader = ![
          '/game-view',
          '/sign-in',
          '/sign-up',
          '/landing',
        ].includes(url);
      });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
