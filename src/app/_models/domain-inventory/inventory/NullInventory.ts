import { AbstractInventory, InventoryProps } from "./AbstractInventory";

export class NullInventory extends AbstractInventory {
    static instance: NullInventory;

    private constructor(id: string, props: InventoryProps){
        super(id, props)
    }

    public static create(): NullInventory {
        if(!NullInventory.instance) {
            NullInventory.instance = new NullInventory(
                "no id",
                {
                    armors: [],
                    items: [], 
                    weapons: [],
                    size: -1000
                }
            );
        }
        return NullInventory.instance;
    }

    isNull(): boolean {
        return true;
    }
}