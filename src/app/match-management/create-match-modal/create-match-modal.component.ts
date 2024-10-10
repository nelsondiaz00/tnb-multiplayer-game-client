import { Component, ViewChild } from '@angular/core';
import { WebSocketService } from '../../_services/websocket.service';
import { AlertComponent } from '../alert/alert.component';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-create-match-modal',
  standalone: true,
  imports: [AlertComponent],
  templateUrl: './create-match-modal.component.html',
  styleUrl: './create-match-modal.component.css',
})
export class CreateMatchModalComponent {
  @ViewChild(AlertComponent) alertComponent?: AlertComponent;
  password?: string;
  isBetDisabled: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CreateMatchModalComponent>,
    private webSocketService: WebSocketService
  ) {}

  onSubmit() {
    const gameMode = document.querySelector(
      'input[name="game-mode"]:checked'
    ) as HTMLInputElement;
    const betOption = document.querySelector(
      'input[name="bet-option"]:checked'
    ) as HTMLInputElement;
    const betInput = document.getElementById('bet') as HTMLInputElement;

    if (!gameMode || !betOption) {
      this.showAlert(
        'Por favor, selecciona todas las opciones antes de crear la partida.'
      );
      return;
    }

    const gameConfig = {
      id: this.generateRandomId(),
      mode: gameMode ? gameMode.value : '0',
      bet: betInput.value === '' ? '0' : betInput.value,
    };
    // console.log(gameConfig, ' game config');

    //const betValue = betInput ? parseInt(betInput.value) : 0;
    this.createMatch(
      parseInt(gameConfig.mode),
      parseInt(gameConfig.mode),
      parseInt(gameConfig.bet)
    );
    this.closeModal();
    // this.createMatch(parseInt(gameConfig.mode), parseInt(gameConfig.mode),);
  }

  showAlert(message: string) {
    if (this.alertComponent) {
      this.alertComponent.message = message;
      this.alertComponent.show = true;
    }
  }

  onBetOptionChange() {
    const betNoOption = document.getElementById('bet-no') as HTMLInputElement;
    this.isBetDisabled = betNoOption.checked;
  }

  generateRandomId() {
    return Math.random().toString(36).substr(2, 9);
  }
  closeModal(): void {
    this.dialogRef.close();
  }

  private createMatch(amountRed: number, amountBlue: number, bet?: number) {
    const dataMatch = {
      amountRed: amountRed,
      amountBlue: amountBlue,
      amountBet: bet,
    };
    this.webSocketService.createMatchSocket(dataMatch);
  }
}
