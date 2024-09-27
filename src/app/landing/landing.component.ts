import { AfterViewInit, Component } from '@angular/core';
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
export class LandingComponent implements AfterViewInit {
  title = 'tnb-multiplayer-client';

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  ngAfterViewInit() {
    const audioElement = document.getElementById(
      'background-music'
    ) as HTMLAudioElement;
    audioElement.volume = 1;

    const playAudio = () => {
      console.log('Mouse clicked, attempting to play audio.');
      audioElement
        .play()
        .then(() => {
          console.log('Audio is playing.');
        })
        .catch((error) => {
          console.log(
            'Autoplay prevention: User interaction is required to play the audio.'
          );
        });
      window.removeEventListener('click', playAudio);
    };

    window.addEventListener('click', playAudio);
  }
}
