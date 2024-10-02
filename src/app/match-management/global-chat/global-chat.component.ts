import { Component } from '@angular/core';

@Component({
  selector: 'app-global-chat',
  templateUrl: './global-chat.component.html',
  styleUrls: ['./global-chat.component.css']
})
export class GlobalChatComponent {
  messages: { sender: string; text: string }[] = [];
  newMessage: string = '';

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement; // Aserción de tipo
    this.newMessage = input.value; // Obtén el valor del input
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({ sender: 'Yo', text: this.newMessage });
      this.newMessage = ''; // Limpia el campo de entrada
    }
  }
}
