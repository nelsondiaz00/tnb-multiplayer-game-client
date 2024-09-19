import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Option } from '../../_models/interfaces/inventary-contract/Option';
import { CommonModule } from '@angular/common';
import { Effect } from '../../_models/interfaces/inventary-contract/Effect';
import EffectIndex from '../../_models/interfaces/inventary-contract/EffectIndex';

@Component({
  selector: 'app-product-effect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-effect.component.html',
  styleUrl: './product-effect.component.css',
})
export class ProductEffectComponent {
  @Input() effect: Effect = {
    attribute: 'none',
    mathOperator: '+',
    turns: 1,
    target: 'none',
    value: 0,
    valueMax: 0,
    herotype: 'none',
    heroSubtype: 'none',
  };
  @Input() index: number = -1;
  @Output() effectChange = new EventEmitter<EffectIndex>();
  @Output() effectDelete = new EventEmitter<number>();

  attributeOptions: Option[];
  operatorOptions: Option[];
  targetOptions: Option[];
  typeOptions: Option[];
  subtypeOptions: Option[];

  constructor() {
    this.attributeOptions = [
      { value: 'none', label: 'Atributo' },
      { value: 'health', label: 'Vida' },
      { value: 'defense', label: 'Defensa' },
      { value: 'power', label: 'Poder' },
      { value: 'attack', label: 'Ataque' },
      { value: 'damage', label: 'Daño' },
      { value: 'critical', label: 'Crítico' },
      { value: 'level', label: 'Nivel' },
      { value: 'experience', label: 'Experiencia' },
    ];
    this.operatorOptions = [
      { value: '+', label: '+' },
      { value: '-', label: '-' },
      { value: '*', label: '×' },
      { value: '/', label: '÷' },
    ];
    this.targetOptions = [
      { value: 'none', label: 'Objetivo' },
      { value: 'hero', label: 'Heroe' },
      { value: 'opponent', label: 'Opontente' },
      { value: 'ally', label: 'Aliado' },
    ];
    this.typeOptions = [
      { value: 'none', label: 'Tipo Héroe' },
      { value: 'warrior', label: 'Guerrero' },
      { value: 'wizard', label: 'Mago' },
      { value: 'rogue', label: 'Picaro' },
      { value: 'any', label: 'Cualquiera' },
    ];
    this.subtypeOptions = [{ value: 'none', label: 'Subtipo Héroe' }];
  }

  ngOnInit(): void {}

  onAttributeSelect(target: any) {
    this.effect.attribute = target.value;
    this.notifyChange();
  }

  onOperatorSelect(target: any) {
    this.effect.mathOperator = target.value;
    this.notifyChange();
  }

  onValueChange(target: any) {
    this.effect.value = target.value;
    this.effect.valueMax = target.value;
    this.notifyChange();
  }

  onValueMaxChange(target: any) {
    this.effect.valueMax = target.value;
    this.notifyChange();
  }

  onTurnsChange(target: any) {
    this.effect.turns = target.value;
    this.notifyChange();
  }

  onTargetSelect(target: any) {
    this.effect.target = target.value;
    this.notifyChange();
  }

  onTypeSelect(target: any) {
    if (target) {
      if (target.value) {
        this.effect.herotype = target.value;
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
        } else if (target.value === 'any') {
          this.subtypeOptions = [{ value: 'any', label: 'Cualquiera' }];
          this.effect.heroSubtype = 'any';
        }
      }
    }
    this.notifyChange();
  }

  onSubtypeSelect(target: any) {
    this.effect.heroSubtype = target.value;
    this.notifyChange();
  }

  notifyChange() {
    this.effectChange.emit({ index: this.index, effect: this.effect });
  }

  delete() {
    this.effectDelete.emit(this.index);
  }
}
