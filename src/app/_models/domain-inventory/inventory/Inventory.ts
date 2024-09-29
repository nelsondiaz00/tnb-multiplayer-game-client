import { AbstractInventory } from "./AbstractInventory";
import AbstractArmor from "../element/armor/AbstractArmor";
import { AbstractItem } from "../element/item/AbstractItem";
import { AbstractWeapon } from "../element/weapon/AbstractWeapon";

// Ahora el constructor y el método estático aceptan playerId
export default class Inventory extends AbstractInventory {
    private constructor(id: string, armors: AbstractArmor[], items: AbstractItem[], weapons: AbstractWeapon[], size: number) {
        super(id, { armors, items, weapons, size });
    }

    isNull(): boolean {
        return false;
    }

    public static create(
        id: string,
        armors: AbstractArmor[],
        items: AbstractItem[],
        weapons: AbstractWeapon[],
        size: number
    ): Inventory {
        return new Inventory(id, armors, items, weapons, size);
    }
}
