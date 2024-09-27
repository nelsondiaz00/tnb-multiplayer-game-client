import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmitterService {
  battleStarted = new EventEmitter<void>();

  startBattle() {
    this.battleStarted.emit();
  }
}
