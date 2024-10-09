import { Component, Input, SimpleChanges } from '@angular/core';
import { ClientInventoryService } from '../../../_services/client-inventory.service';
import { AbstractItem } from '../../../_models/domain-inventory/element/item/AbstractItem';
import AbstractArmor from '../../../_models/domain-inventory/element/armor/AbstractArmor';
import { AbstractWeapon } from '../../../_models/domain-inventory/element/weapon/AbstractWeapon';
import { AbstractPlayer } from '../../../_models/domain-inventory/player/AbstractPlayer';
import { CommonModule } from '@angular/common';
import { AbstractSkill } from '../../../_models/domain-inventory/skill/AbstractSkill';
import axios from 'axios';
import { AbstractEffect } from '../../../_models/domain-inventory/effect/AbstractEffect';
import {
  AbstractHero,
  HeroProps,
} from '../../../_models/domain-inventory/hero/AbstractHero';
import SpecialAttribute, {
  SpecialAttributeProps,
} from '../../../_models/domain-inventory/hero/valueObjects/Attribute';
import { Hero } from '../../../_models/domain-inventory/hero/Hero';
import { evaluate, re } from 'mathjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  @Input() filter: string = 'all';
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 12;
  items: AbstractItem[] = [];
  armors: AbstractArmor[] = [];
  weapons: AbstractWeapon[] = [];
  skills: AbstractSkill[] = [];
  filteredItems: any[] = [];
  heroesSubscription: Subscription = new Subscription();
  heroes: AbstractHero[] = [];

  constructor(private inventoryService: ClientInventoryService) {}

  async ngOnInit(): Promise<void> {
    this.heroesSubscription = this.inventoryService.heroes$.subscribe(
      (heroes) => {
        if (heroes.length > 0) {
          this.heroes = heroes;
        }
      }
    );
    this.inventoryService.player$.subscribe(async (player) => {
      if (player) {
        for (let i = 0; i < player.inventory.armors.length; i++) {
          let armor: AbstractArmor = player.inventory.armors[i];
          armor = (
            (await axios.get(`http://localhost:1803/armor/${armor._id}`))
              .data as { data: AbstractArmor }
          ).data;
          player.inventory.armors[i] = armor;
        }
        this.armors = player.inventory.armors;

        for (let i = 0; i < player.inventory.items.length; i++) {
          let item: AbstractItem = player.inventory.items[i];
          item = (
            (await axios.get(`http://localhost:1803/item/${item._id}`))
              .data as { data: AbstractItem }
          ).data;
          player.inventory.items[i] = item;
        }
        this.items = player.inventory.items;

        for (let i = 0; i < player.inventory.weapons.length; i++) {
          let weapon: AbstractWeapon = player.inventory.weapons[i];
          weapon = (
            (await axios.get(`http://localhost:1803/weapon/${weapon._id}`))
              .data as { data: AbstractWeapon }
          ).data;
          player.inventory.weapons[i] = weapon;
        }
        this.weapons = player.inventory.weapons;

        this.applyFilter();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['filter'] ||
      changes['currentPage'] ||
      changes['itemsPerPage']
    ) {
      this.applyFilter();
    }
  }

  applyFilter(): void {
    let filtered: any[] = [];
    if (this.filter === 'all' || this.filter === 'armors') {
      filtered = filtered.concat(this.armors);
    }
    if (this.filter === 'all' || this.filter === 'items') {
      filtered = filtered.concat(this.items);
    }
    if (this.filter === 'all' || this.filter === 'weapons') {
      filtered = filtered.concat(this.weapons);
    }
    this.filteredItems = filtered;
  }

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    let pagItems = this.filteredItems.slice(start, start + this.itemsPerPage);
    pagItems = this.selectEquipedItems(pagItems);
    return pagItems;
  }

  getImagePath(name: string, type: string): string {
    name = name.trimEnd();
    const newName = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ñ/g, 'n')
      .replace(/\s+/g, '-')
      .toLowerCase();
    return `assets/game-images/${type}/${newName}.png`;
  }

  getItemType(item: any): string {
    if (this.armors.includes(item)) return 'armors';
    if (this.items.includes(item)) return 'items';
    if (this.weapons.includes(item)) return 'weapons';
    return 'unknown';
  }

  cardClick(item: any): void {
    let equipable = true;
    let effectList = item.props.effectList;

    const isItemEquiped = this.isItemEquiped(item);
    if (isItemEquiped) {
      effectList = this.revertEffectsOperator(effectList);
      this.unequipItemsOfHeroInventory(item);
    } else {
      equipable = this.equipItemsInHeroInventory(item);
    }

    if (equipable) {
      const heroResult = this.handleApplyElementEffects(
        effectList,
        this.inventoryService.getHeroeActual()
      );
      if (isItemEquiped) {
        this.revertEffectsOperator(effectList);
      }

      this.inventoryService.setHeroeActual(heroResult);
      this.heroes[this.inventoryService.getActualHeroIndex()] = heroResult;
      this.inventoryService.setHeroes(this.heroes);
    }
  }

  private selectEquipedItems(pagItems: any): any {
    for (let i = 0; i < pagItems.length; i++) {
      const item = pagItems[i];
      pagItems[i].equiped = this.isItemEquiped(item);
    }
    return pagItems;
  }

  private isItemEquiped(item: any): boolean {
    const type = this.getItemType(item);
    let equiped = false;
    switch (type) {
      case 'armors':
        equiped =
          this.inventoryService
            .getHeroeActual()
            .props.inventory?.props.armors.includes(item) === true;
        break;
      case 'items':
        equiped =
          this.inventoryService
            .getHeroeActual()
            .props.inventory?.props.items.includes(item) === true;
        break;
      case 'weapons':
        equiped =
          this.inventoryService
            .getHeroeActual()
            .props.inventory?.props.weapons.includes(item) === true;
        break;
      default:
        console.log('Unknown type card clicked', item);
        break;
    }
    return equiped;
  }

  public handleApplyElementEffects(
    effectList: AbstractEffect[],
    hero: AbstractHero
  ): AbstractHero {
    //declara los tipos requeridos
    type HeroPropertiesKeys = keyof HeroProps;

    // Copia los valores actuales del heroe
    const attributesCopy: HeroProps = { ...hero.props };

    // Recibe la lista de efectos del producto
    const effects = effectList;

    // Aplica cada efecto al heroe
    effects.forEach((effect: AbstractEffect) => {
      // Convierte el nombre del atributo a minuscula y lo utiliza como una key en el heroe
      let keyString = effect.props.attribute.toLowerCase();

      //pequena traduccion si el atributo es distinto a los que se trabaja
      if (keyString === 'life') keyString = 'blood';

      // Si incluye attack o damage se trabaja como atributo especial
      if (keyString.includes('attack') || keyString.includes('damage')) {
        // Crea la key para acceder al atributo
        let key: HeroPropertiesKeys;
        if (keyString.includes('attack')) {
          key = 'attack' as HeroPropertiesKeys;
        } else {
          key = 'damage' as HeroPropertiesKeys;
        }

        // Accede al atributo especial y obtiene sus propiedades
        const specialAttribute: SpecialAttribute = attributesCopy[
          key
        ] as SpecialAttribute;
        const specialAttributeProps: SpecialAttributeProps =
          specialAttribute.props;

        // Selecciona la propiedad del atributo especial, construye la ecuacion del efecto para afectar la propiedad y la resuelve
        if (keyString.includes('min')) {
          const ecuation =
            specialAttributeProps.minValue +
            effect.props.operator +
            effect.props.value;
          specialAttributeProps.minValue = evaluate(ecuation);
        } else {
          if (keyString.includes('max')) {
            const ecuation =
              specialAttributeProps.maxValue +
              effect.props.operator +
              effect.props.value;
            specialAttributeProps.maxValue = evaluate(ecuation);
          } else {
            const ecuation =
              specialAttributeProps.value +
              effect.props.operator +
              effect.props.value;
            specialAttributeProps.value = evaluate(ecuation);
          }
        }
      } else {
        // Crea la key y obtiene el valor del atributo
        const key: HeroPropertiesKeys = keyString as HeroPropertiesKeys;
        const attributeCopy = attributesCopy[key];

        // Si existe y es numerico construye la ecuacion del efecto para afectar el atributo, la resuelve y asigna el resultado
        if (attributeCopy) {
          if (typeof attributeCopy === 'number') {
            const ecuation =
              attributeCopy + effect.props.operator + effect.props.value;
            (attributesCopy[key] as number) = evaluate(ecuation);
          }
        } else {
          // Atributo no existe
          console.warn('Atributo no encontrado!', keyString);
        }
      }
    });

    const {
      groupId,
      subgroupId,
      status,
      name,
      level,
      blood,
      mana,
      defense,
      attack,
      damage,
      skills,
      baseStats,
      inventory,
    } = attributesCopy;

    return Hero.create(
      hero._id,
      groupId,
      subgroupId,
      status,
      name,
      level,
      blood,
      mana,
      defense,
      attack,
      damage,
      skills,
      baseStats,
      inventory
    );
  }

  equipItemsInHeroInventory(item: any): boolean {
    let equipable = true;
    const type = this.getItemType(item);
    switch (type) {
      case 'armors':
        const armors =
          this.inventoryService.getHeroeActual().props.inventory?.props.armors;
        const armorTypeExists = armors?.some(
          (armor) => armor.type === item.type
        );
        if (!armorTypeExists) {
          armors?.push(item);
        } else {
          equipable = false;
          // alert(`Ya existe una armadura del tipo ${item.type} equipada.`);
        }
        break;
      case 'items':
        this.inventoryService
          .getHeroeActual()
          .props.inventory?.props.items.push(item);
        break;
      case 'weapons':
        this.inventoryService
          .getHeroeActual()
          .props.inventory?.props.weapons.push(item);
        break;
      default:
        console.log('Unknown type card clicked', item);
        break;
    }
    return equipable;
  }

  unequipItemsOfHeroInventory(item: any) {
    const type = this.getItemType(item);
    let index;
    switch (type) {
      case 'armors':
        index = this.inventoryService
          .getHeroeActual()
          .props.inventory?.props.armors.indexOf(item);
        if (index && index !== -1) {
          this.inventoryService
            .getHeroeActual()
            .props.inventory?.props.armors.splice(index, 1);
        }
        break;
      case 'items':
        index = this.inventoryService
          .getHeroeActual()
          .props.inventory?.props.items.indexOf(item);
        if (index && index !== -1) {
          this.inventoryService
            .getHeroeActual()
            .props.inventory?.props.items.splice(index, 1);
        }
        break;
      case 'weapons':
        index = this.inventoryService
          .getHeroeActual()
          .props.inventory?.props.weapons.indexOf(item);
        if (index && index !== -1) {
          this.inventoryService
            .getHeroeActual()
            .props.inventory?.props.weapons.splice(index, 1);
        }
        break;
      default:
        console.log('Unknown type card clicked', item);
        break;
    }
  }

  revertEffectsOperator(effectList: any): any {
    const effects = effectList;
    effects.forEach((effect: any) => {
      switch (effect.props.operator) {
        case '+':
          effect.props.operator = '-';
          break;
        case '-':
          effect.props.operator = '+';
          break;
        case '*':
          effect.props.operator = '/';
          break;
        case '/':
          effect.props.operator = '*';
          break;
        default:
          console.warn(`Unexpected operator: ${effect.props.operator}`);
      }
    });
    return effects;
  }
}
