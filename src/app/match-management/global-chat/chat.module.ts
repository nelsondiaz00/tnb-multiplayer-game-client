import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlobalChatComponent } from './global-chat.component'; // Asegúrate de que la ruta sea correcta

@NgModule({
  declarations: [
    GlobalChatComponent // Asegúrate de que el componente esté declarado aquí
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    GlobalChatComponent // Exporta el componente para que se pueda usar en otros módulos
  ]
})
export class ChatModule { }
