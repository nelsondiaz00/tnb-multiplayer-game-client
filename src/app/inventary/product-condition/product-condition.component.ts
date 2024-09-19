import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Option } from '../../_models/interfaces/inventary-contract/Option';
import { CommonModule } from '@angular/common';
import { Condition } from '../../_models/interfaces/inventary-contract/Condition';
import ConditionIndex from '../../_models/interfaces/inventary-contract/ConditionIndex';

@Component({
  selector: 'app-product-condition',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-condition.component.html',
  styleUrl: './product-condition.component.css',
})
export class ProductConditionComponent {
  @Input() condition: Condition = {
    attribute1: '',
    target1: '',
    logicalOperator: '',
    attribute2: '',
    target2: '',
  };
  @Input() index: number = -1;
  @Output() conditionChange = new EventEmitter<ConditionIndex>();
  @Output() conditionDelete = new EventEmitter<number>();

  attributeOptions: Option[];
  targetOptions: Option[];
  operatorOptions: Option[];

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
    this.targetOptions = [
      { value: 'none', label: 'Objetivo' },
      { value: 'hero', label: 'Heroe' },
      { value: 'opponent', label: 'Opontente' },
    ];
    this.operatorOptions = [
      { value: '=', label: '=' },
      { value: '>', label: '>' },
      { value: '<', label: '<' },
    ];
  }

  ngOnInit(): void {}

  onAttributeSelect(target: any) {
    this.condition.attribute1 = target.value;
    this.notifyChange();
  }

  onTargetSelect(target: any) {
    this.condition.target1 = target.value;
    this.notifyChange();
  }

  onOperatorSelect(target: any) {
    this.condition.logicalOperator = target.value;
    this.notifyChange();
  }

  onAttribute2Select(target: any) {
    this.condition.attribute2 = target.value;
    this.notifyChange();
  }

  onTarget2Select(target: any) {
    this.condition.target2 = target.value;
    this.notifyChange();
  }

  notifyChange() {
    this.conditionChange.emit({ index: this.index, condition: this.condition });
  }

  delete() {
    this.conditionDelete.emit(this.index);
  }
}
