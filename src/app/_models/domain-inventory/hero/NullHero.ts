import { NullInventory } from "../inventory/NullInventory";
import { AbstractHero, HeroProps } from "./AbstractHero";
import SpecialAttribute from "./valueObjects/Attribute";
import { BaseStats } from "./valueObjects/BaseStats";

export class NullHero extends AbstractHero {
    static instance: NullHero;

    private constructor(heroSerial: string, props: HeroProps){
        super(heroSerial, props)
    }

    public static create(): NullHero {
        if(!NullHero.instance) {
            NullHero.instance = new NullHero(
                "no hero serial in database",
                {
                    groupId: "No group id in database",
                    subgroupId: "No subgroup id in database",
                    status: -1000,
                    name: "No name in database",
                    level: -1000,
                    blood: -1000,
                    mana: -1000,
                    defense: -1000,
                    attack: SpecialAttribute.create(-1000, -1000, -1000),
                    damage: SpecialAttribute.create(-1000, -1000, -1000),
                    skills: [],
                    baseStats: BaseStats.create(-1000, -1000, -1000, -1000, -1000),
                    inventory: NullInventory.create()
                }
            );
        }
        return NullHero.instance;
    }

    isNull(): boolean {
        return true;
    }
}