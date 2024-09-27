import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private soundEnabledSubject = new BehaviorSubject<boolean>(false);
  soundEnabled$ = this.soundEnabledSubject.asObservable();

  toggleSound() {
    this.soundEnabledSubject.next(!this.soundEnabledSubject.value);
  }

  setSound(enabled: boolean) {
    this.soundEnabledSubject.next(enabled);
  }

  isSoundEnabled(): boolean {
    return this.soundEnabledSubject.value;
  }
}
