// src/app/app.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  currentModule: string = 'module-game';

  changeModule(module: string) {
    this.currentModule = module;
  }
}
