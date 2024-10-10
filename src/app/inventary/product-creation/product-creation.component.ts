import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductEffectComponent } from '../product-effect/product-effect.component';
import { Option } from '../../_models/interfaces/inventary-contract/Option';
import { Effect } from '../../_models/interfaces/inventary-contract/Effect';
import EffectIndex from '../../_models/interfaces/inventary-contract/EffectIndex';
import { ProductConditionComponent } from '../product-condition/product-condition.component';
import ConditionIndex from '../../_models/interfaces/inventary-contract/ConditionIndex';
import { Condition } from '../../_models/interfaces/inventary-contract/Condition';
import { Product } from '../../_models/interfaces/inventary-contract/Product';

@Component({
  selector: 'app-product-creation',
  standalone: true,
  imports: [CommonModule, ProductEffectComponent, ProductConditionComponent],
  templateUrl: './product-creation.component.html',
  styleUrl: './product-creation.component.css',
})
export class ProductCreationComponent {
  productOptions: Option[];
  typeOptions: Option[];
  subtypeOptions: Option[];
  levelOptions: Option[];

  effects: Effect[];
  conditions: Condition[];

  product: Product;

  constructor() {
    this.effects = [];
    this.conditions = [];
    this.product = {
      productType: 'none',
      heroType: 'none',
      subHeroType: 'none',
      requiredLevel: 0,
      productName: '',
      productDescription: '',
      dropChance: 0,
      powerCost: 0,
      cooldownTurns: 0,
      effects: this.effects,
      conditions: this.conditions,
    };
    this.productOptions = [
      { value: 'none', label: 'Tipo Producto' },
      { value: 'weapon', label: 'Arma' },
      { value: 'item', label: 'Item' },
      { value: 'hability', label: 'Habilidad' },
      { value: 'armor', label: 'Armadura' },
    ];
    this.typeOptions = [
      { value: 'none', label: 'Tipo Héroe' },
      { value: 'warrior', label: 'Guerrero' },
      { value: 'wizard', label: 'Mago' },
      { value: 'rogue', label: 'Picaro' },
    ];
    this.subtypeOptions = [{ value: 'none', label: 'Subtipo Héroe' }];
    this.levelOptions = [
      { value: '0', label: 'Nivel Necesario' },
      ...Array.from({ length: 9 }, (_, i) => ({
        value: i.toString(),
        label: i.toString(),
      })),
    ];
  }

  ngOnInit(): void {}

  handleEffectChange(effectIndex: EffectIndex) {
    this.effects[effectIndex.index] = effectIndex.effect;
  }

  handleEffectDelete(effectIndex: number) {
    this.effects.splice(effectIndex, 1);
  }

  handleConditionChange(conditionIndex: ConditionIndex) {
    this.conditions[conditionIndex.index] = conditionIndex.condition;
  }

  handleConditionDelete(conditionIndex: number) {
    this.conditions.splice(conditionIndex, 1);
  }

  addEffect() {
    this.effects.push({
      attribute: 'none',
      mathOperator: '+',
      turns: 1,
      target: 'none',
      value: 0,
      valueMax: 0,
      herotype: 'none',
      heroSubtype: 'none',
    });
  }

  addCondition() {
    this.conditions.push({
      attribute1: 'none',
      target1: 'none',
      logicalOperator: '=',
      attribute2: 'none',
      target2: 'none',
    });
  }

  onProductTypeSelect(target: any) {
    this.product.productType = target.value;
  }

  onHeroTypeSelect(target: any) {
    if (target) {
      if (target.value) {
        if (target.value === 'warrior') {
          this.subtypeOptions = [
            { value: 'none', label: 'Subtipo Héroe' },
            { value: 'tank', label: 'Tanque' },
            { value: 'weapon', label: 'Armas' },
          ];
        } else if (target.value === 'wizard') {
          this.subtypeOptions = [
            { value: 'none', label: 'Subtipo Héroe' },
            { value: 'ice', label: 'Hielo' },
            { value: 'fire', label: 'Fuego' },
          ];
        } else if (target.value === 'rogue') {
          this.subtypeOptions = [
            { value: 'none', label: 'Subtipo Héroe' },
            { value: 'poison', label: 'Veneno' },
            { value: 'machete', label: 'Machete' },
          ];
        }
        this.product.heroType = target.value;
      }
    }
  }

  onHeroSubtypeSelect(target: any) {
    this.product.subHeroType = target.value;
  }

  onLevelSelect(target: any) {
    this.product.requiredLevel = parseInt(target.value);
  }

  onNameInput(target: any) {
    this.product.productName = target.value;
  }

  onDescriptionInput(target: any) {
    this.product.productDescription = target.value;
  }

  onDropInput(target: any) {
    this.product.dropChance = parseFloat(target.value);
  }

  onPowerInput(target: any) {
    this.product.powerCost = parseInt(target.value);
  }

  onCooldownInput(target: any) {
    this.product.cooldownTurns = parseInt(target.value);
  }

  handleSubmmit() {
    // console.log('Product', this.product);
  }
}
