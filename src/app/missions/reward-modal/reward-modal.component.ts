import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../_models/interfaces/product.interfaces';
import { CommonModule } from '@angular/common';
import { IMission } from '../../_models/interfaces/mission.interface';

@Component({
  selector: 'app-reward-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reward-modal.component.html',
  styleUrl: './reward-modal.component.css',
})
export class RewardModalComponent {
  @Input() rewards: IProduct[] | null = null;
  @Input() mission: IMission | null = null;
  @Input() showModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();

  closeModal() {
    this.showModal = false;
    this.closeModalEvent.emit();
  }
}
