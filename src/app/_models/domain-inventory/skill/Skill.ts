import { AbstractCondition } from "../condition/AbstractCondition";
import { AbstractEffect } from "../effect/AbstractEffect";
import { AbstractSkill, SkillProps } from "./AbstractSkill";

export default class Skill extends AbstractSkill {
    static createFromDocument(skill: any) {
        skill
        throw new Error("Method not implemented.");
    }
  
    private constructor(name: string, props: SkillProps){
        super(name, props);
    }
    
    isNull(): boolean {
        return false;
    }

    public static create(
        name: string, 
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
    ): AbstractSkill {
        return new Skill(name, {
            heroSerial,
            heroType,
            subHeroType,
            requiredLevel,
            productDescription,
            dropChance,
            powerCost,
            cooldownTurns,
            effects,
            conditions
        })
    }
}