import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../_models/interfaces/product.interfaces';
import { CommonModule } from '@angular/common';
import { IMission } from '../../_models/interfaces/mission.interface';
import { ClientInventoryService } from '../../_services/client-inventory.service';
import { UserService } from '../../_services/user.service';
import { AbstractSkill } from '../../_models/domain-inventory/skill/AbstractSkill';
import AbstractArmor from '../../_models/domain-inventory/element/armor/AbstractArmor';
import { AbstractHero } from '../../_models/domain-inventory/hero/AbstractHero';

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

  constructor(
    private inventoryService: ClientInventoryService,
    private userService: UserService
  ) {}

  closeModal() {
    this.showModal = false;
    this.inventoryService.setPlayer()
    const player = this.inventoryService.getPlayer()
    const heroActualMultiplayer =  this.userService.getHeroSelected()
    const heroes = player?.props.heroList
    let heroActual = null
    if(heroes && heroActualMultiplayer){
      heroActualMultiplayer.idHero
      heroes.map((hero) => {
        if((hero.props.name+hero.props.subgroupId) === heroActualMultiplayer.idHero){
          heroActual = hero
        }
      })
    }
    const inventory = player?.props.inventory
    if(heroActual && inventory){
      if(this.rewards){
        const newRewards = this.mapReward(this.rewards)
        const skill = newRewards[0] as AbstractSkill
        if(skill){
          (heroActual as AbstractHero).props.skills.push(skill)
        }
        const armor = newRewards[1] as AbstractArmor
        if(armor){
          inventory.props.armors.push(armor)
        }
      }
    }
    this.updatePlayer()
    this.closeModalEvent.emit();
  }

  async updatePlayer(): Promise<void> {
    const player = this.inventoryService.getPlayer();
    const response = await axios.post(
      'http://localhost:1803/player/update',
      { player }
    );
    
    if (response && response.data) {
      console.log('actualizado', response.data);
    }
  }

  mapReward(re: any[]): any[] {
    //TODO
    return [re[0] as AbstractSkill, re[1] as AbstractArmor]
  }
}
