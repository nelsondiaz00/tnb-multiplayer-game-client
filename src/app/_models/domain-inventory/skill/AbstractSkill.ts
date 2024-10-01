import { AggregateRoot } from "../AggregateRoot";
import { AbstractCondition } from "../condition/AbstractCondition";
import { AbstractEffect } from "../effect/AbstractEffect";

export interface SkillProps {
    heroSerial: string,
    heroType: string,
    subHeroType: string,
    requiredLevel: number,
    productDescription: string,
    dropChance: number,
    powerCost: number,
    cooldownTurns: number,
    effects: AbstractEffect[],
    conditions: AbstractCondition[]
}

export abstract class AbstractSkill extends AggregateRoot<SkillProps> {
    constructor(private _name: string, props: SkillProps) {
        super(_name, props)
    }

    get name(): String{
        return this._name;
    }

    get heroSerial(): string {
        return this.props.heroSerial;
    }

    get heroType(): string {
        return this.props.heroType;
    }    
    
    get subHeroType(): string {
        return this.props.subHeroType;
    }    
    
    get requiredLevel(): number {
        return this.props.requiredLevel;
    }    
    
    get productDescription(): string {
        return this.props.productDescription;
    }    
    
    get dropChance(): number {
        return this.props.dropChance;
    }    
    
    get powerCost(): number {
        return this.props.powerCost;
    }    
    
    get cooldownTurns(): number {
        return this.props.cooldownTurns;
    }

    get effects(): AbstractEffect[] {
        return this.props.effects;
    }

    get conditions(): AbstractCondition[] {
        return this.props.conditions;
    }

    abstract isNull(): boolean;
}