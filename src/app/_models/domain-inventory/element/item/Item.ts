import { AbstractCondition } from "../../condition/AbstractCondition";
import { AbstractEffect } from "../../effect/AbstractEffect";
import { ElementProps } from "../AbstractElement";
import { AbstractItem } from "./AbstractItem";

export default class Item extends AbstractItem {
    private constructor(id: string, props: ElementProps) {
        super(id, props)
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
        heroType: string,
        subheroType: string,
        cost: number,
        heroLevel: number,
        powerCost: number,
        coolDownTurns: number,
        conditions: AbstractCondition[]
    ): AbstractItem {
        return new Item(id, {name, status, effectList, drop, heroType, subheroType, cost, heroLevel, powerCost, coolDownTurns, conditions});
    }

}