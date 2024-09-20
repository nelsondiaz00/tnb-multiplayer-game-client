import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  Renderer2,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { getChatbotResponse } from '../../_services/http.service';

@Component({
  selector: 'app-chat-bot-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-bot-view.component.html',
  styleUrl: './chat-bot-view.component.css',
})
export class ChatBotViewComponent implements OnInit, AfterViewInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @ViewChild('userInput') userInput!: ElementRef;
  showChatBot = false;
  messages: { sender: string; text: string }[] = [];

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.showChatBot && this.messages.length > 0) {
      this.renderMessages();
    }
  }

  showChatBotWindow() {
    this.showChatBot = !this.showChatBot;
    if (this.showChatBot) {
      setTimeout(() => {
        this.renderMessages();
        this.cdr.detectChanges(); // Forzar la detección de cambios
      });
    }
  }

  async sendMessage() {
    const message = this.userInput.nativeElement.value.trim();
    if (message === '') return;

    this.addMessage('Tú', message);
    this.renderer.setProperty(this.userInput.nativeElement, 'value', '');

    await this.handleUserInput(message);
  }

  async handleUserInput(userInput: string) {
    try {
      const response = await getChatbotResponse(userInput);
      console.log('Chatbot', response);
      this.addMessage('Chatbot', response);
    } catch (error) {
      console.error('Error handling user input:', error);
    }
  }

  private addMessage(sender: string, message: string) {
    this.messages.push({ sender, text: message });
    if (this.showChatBot) {
      this.renderMessages();
    }
  }

  private renderMessages() {
    if (!this.chatContainer) return;
    this.renderer.setProperty(
      this.chatContainer.nativeElement,
      'innerHTML',
      ''
    );
    this.messages.forEach((msg) => {
      const messageElement = this.renderer.createElement('p');
      const strong = this.renderer.createElement('strong');
      const text = this.renderer.createText(`${msg.sender}: `);

      this.renderer.appendChild(strong, text);
      this.renderer.appendChild(messageElement, strong);
      this.renderer.appendChild(
        messageElement,
        this.renderer.createText(msg.text)
      );
      this.renderer.appendChild(
        this.chatContainer.nativeElement,
        messageElement
      );
    });
  }
}
