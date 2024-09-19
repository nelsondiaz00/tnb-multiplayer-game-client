import { Condition } from "./Condition";
import { Effect } from "./Effect";

export interface Product {
    productType: string,
    armorType?: string,
    heroType: string,
    subHeroType: string,
    requiredLevel: number,
    productName: string,
    productDescription: string,
    dropChance: number,
    powerCost: number,
    cooldownTurns: number,
    effects: Effect[],
    conditions: Condition[]
}