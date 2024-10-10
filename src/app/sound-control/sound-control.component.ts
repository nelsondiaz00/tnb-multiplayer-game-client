import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { EmitterService } from '../_services/emitter.service';
import { Subscription } from 'rxjs';
import { SoundService } from '../_services/sound.service';

@Component({
  selector: 'app-sound-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sound-control.component.html',
  styleUrls: ['./sound-control.component.css'],
})
export class SoundControlComponent implements OnInit, OnDestroy, AfterViewInit {
  isActive = false;
  currentAudioSource = '';
  private subscription: Subscription = new Subscription();
  @ViewChild('backgroundMusic') backgroundMusic!: ElementRef<HTMLAudioElement>;

  constructor(
    private router: Router,
    private emitterService: EmitterService,
    private soundService: SoundService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        this.setAudioSource(url);
      });
  }

  ngOnInit() {
    this.subscription.add(
      this.emitterService.battleStarted.subscribe(() => {
        this.setAudioSource('/start-battle');
      })
    );

    this.soundService.soundEnabled$.subscribe((enabled) => {
      this.isActive = enabled;
      if (!this.isActive) {
        this.pauseAudio();
      } else {
        this.playAudio();
      }
    });
  }

  ngAfterViewInit() {
    if (this.isActive && this.currentAudioSource) {
      this.playAudio();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleSound() {
    this.soundService.toggleSound();
  }

  private playAudio() {
    if (this.backgroundMusic?.nativeElement?.src) {
      const audio = this.backgroundMusic.nativeElement;
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  }

  private pauseAudio() {
    if (this.backgroundMusic?.nativeElement) {
      const audio = this.backgroundMusic.nativeElement;
      audio.pause();
      audio.currentTime = 0;
    }
  }

  private setAudioSource(url: string) {
    let audioSource = '';
    // console.log(url);
    switch (url) {
      case '/game-view':
        audioSource = 'assets/sounds/game-view-general-sound.mp3';
        break;
      case '/start-battle':
        audioSource = 'assets/sounds/game-view-sound.mp3';
        break;
      case '/sign-in':
        audioSource = 'assets/sounds/landing-sound.mp3';
        break;
      case '/sign-up':
        audioSource = 'assets/sounds/landing-sound.mp3';
        break;
      case '/landing':
        audioSource = 'assets/sounds/landing-sound.mp3';
        break;
      case '/match-management-view':
        audioSource = 'assets/sounds/match-management-view-sound.mp3';
        break;
      default:
        audioSource = '';
        break;
    }

    if (audioSource && audioSource !== this.currentAudioSource) {
      this.backgroundMusic.nativeElement.src = audioSource;
      this.currentAudioSource = audioSource;
      if (this.isActive) {
        this.playAudio();
      }
    }
  }
}
