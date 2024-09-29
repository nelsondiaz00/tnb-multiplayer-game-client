import { AggregateRoot } from "../AggregateRoot";
import AbstractArmor from "../element/armor/AbstractArmor";
import { AbstractItem } from "../element/item/AbstractItem";
import { AbstractWeapon } from "../element/weapon/AbstractWeapon";

export interface InventoryProps {
    armors: AbstractArmor[];
    items: AbstractItem[];
    weapons: AbstractWeapon[];
    size: number;
}

export abstract class AbstractInventory extends AggregateRoot<InventoryProps> {
    constructor(id: string, props: InventoryProps) {
       super(id, props);
    }

    get playerId(): string {
        return this.id;
    }

    get armors(): AbstractArmor[] {
        return this.props.armors;
    }
    
    get items(): AbstractItem[] {
        return this.props.items;
    }
    
    get weapons(): AbstractWeapon[] {
        return this.props.weapons;
    }
    
    get size(): number {
        return this.props.armors.length + this.props.items.length + this.props.weapons.length;
    }    

    abstract isNull(): boolean;
}
