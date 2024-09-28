import { AbstractCondition } from "../../condition/AbstractCondition";
import { AbstractEffect } from "../../effect/AbstractEffect";
import { ElementProps } from "../AbstractElement";
import AbstractArmor from "./AbstractArmor";

export default class Armor extends AbstractArmor {
    private constructor(id: string, props: ElementProps, type: string){
        super(id, props, type)
    }
    
    isNull(): boolean {
        return false;
    }

    /**
     * Factory method para crear instancias y aplicar reglas de validación
     * @param string
     * @param ElementProps
     */
    public static create(
        id: string, 
        name: string,
        status: string,
        effectList: AbstractEffect[],
        drop: number, 
        type: string,
        heroType: string,
        subheroType: string,
        cost: number,
        heroLevel: number,
        powerCost: number,
        coolDownTurns: number,
        conditions: AbstractCondition[]
    ): AbstractArmor    
    {
        return new Armor(id, {name, status, effectList, drop, heroType, subheroType, cost, heroLevel, powerCost, coolDownTurns, conditions}, type);
    }
}