import { Entity } from '../Entity';
import { AbstractCondition } from '../condition/AbstractCondition';
import { AbstractEffect } from '../effect/AbstractEffect';

export interface ElementProps {
  name: string;
  status: string;
  effectList: AbstractEffect[];
  drop: number;
  heroType: string;
  subheroType: string;
  cost: number;
  heroLevel: number;
  powerCost: number;
  coolDownTurns: number;
  conditions: AbstractCondition[];
}

export abstract class AbstractElement extends Entity<ElementProps> {
  constructor(id: string, props: ElementProps) {
    super(id, props);
  }

  get name(): string {
    return this.props.name;
  }

  get status(): string {
    return this.props.status;
  }

  get effectList(): AbstractEffect[] {
    return this.props.effectList;
  }

  get drop(): number {
    return this.props.drop;
  }

  get heroType(): string {
    return this.props.heroType;
  }

  set heroType(value: string) {
    this.props.heroType = value;
  }

  get subheroType(): string {
    return this.props.subheroType;
  }

  set subheroType(value: string) {
    this.props.subheroType = value;
  }

  get cost(): number {
    return this.props.cost;
  }

  set cost(value: number) {
    this.props.cost = value;
  }

  get heroLevel(): number {
    return this.props.heroLevel;
  }

  set heroLevel(value: number) {
    this.props.heroLevel = value;
  }

  get powerCost(): number {
    return this.props.powerCost;
  }

  set powerCost(value: number) {
    this.props.powerCost = value;
  }

  get coolDownTurns(): number {
    return this.props.coolDownTurns;
  }

  set coolDownTurns(value: number) {
    this.props.coolDownTurns = value;
  }

  get conditions(): AbstractCondition[] {
    return this.props.conditions;
  }

  set conditions(value: AbstractCondition[]) {
    this.props.conditions = value;
  }

  abstract isNull(): boolean;
}
