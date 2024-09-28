import { AbstractInventory } from "../inventory/AbstractInventory";
import { AbstractSkill } from "../skill/AbstractSkill";
import { AbstractHero, HeroProps } from "./AbstractHero";
import SpecialAttribute from "./valueObjects/Attribute";
import { BaseStats } from "./valueObjects/BaseStats";

//@refactor?
export class Hero extends AbstractHero {

    public constructor(heroSerial: string, props: HeroProps){
        super(heroSerial, props)
    }

    isNull(): boolean {
        return false;
    }

    public static create(
        heroSerial: string,
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
    
    ): AbstractHero
    {
        return new Hero(heroSerial, {
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
        });
    }

    
}