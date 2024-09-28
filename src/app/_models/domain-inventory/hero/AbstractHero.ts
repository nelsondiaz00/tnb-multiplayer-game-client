import { AggregateRoot } from "../AggregateRoot";
import { AbstractInventory } from "../inventory/AbstractInventory";
import { AbstractSkill } from "../skill/AbstractSkill";
import { BaseStats } from "./valueObjects/BaseStats";
import SpecialAttribute from "./valueObjects/Attribute";

export interface HeroProps {
    groupId: string,
    subgroupId: string,
    status: number,
    name: string,
    level: number,
    blood: number,
    mana: number,
    defense: number,
    attack: SpecialAttribute,
    damage: SpecialAttribute,
    skills: AbstractSkill[],
    baseStats: BaseStats,
    inventory?: AbstractInventory
}

export abstract class AbstractHero extends AggregateRoot<HeroProps>{

    
    constructor(heroSerial: string, props: HeroProps){
        super(heroSerial, props);
    }

    get groupId(): string {
        return this.props.groupId;
    }
    
    get subgroupId(): string {
        return this.props.subgroupId;
    }
    
    get status(): number {
        return this.props.status;
    }
    
    get name(): string {
        return this.props.name;
    }

    get defense(): number {
        return this.props.defense;
    }
    
    get level(): number {
        return this.props.level;
    }
    
    get blood(): number {
        return this.props.blood;
    }
    
    get mana(): number {
        return this.props.mana;
    }
    
    get attack(): SpecialAttribute {
        return this.props.attack;
    }
    
    get damage(): SpecialAttribute {
        return this.props.damage;
    }
    
    get skills(): AbstractSkill[] {
        return this.props.skills;
    }
    
    get baseStats(): BaseStats {
        return this.props.baseStats;
    }
    
    get inventory(): AbstractInventory | undefined {
        return this.props.inventory;
    }

    abstract isNull(): boolean;

}