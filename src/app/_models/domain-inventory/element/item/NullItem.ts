import { ElementProps } from "../AbstractElement";
import { AbstractItem } from "./AbstractItem";

export class NullItem extends AbstractItem {
    static instance: NullItem;

    private constructor(id: string, props: ElementProps) {
        super(id, props)
    }

    public static create(): NullItem {
        if (!NullItem.instance) {
            NullItem.instance = new NullItem(
                "no id",
                {
                    name: '',
                    status: 'inactive',
                    effectList: [],
                    drop: -1000,
                    heroType: 'none',
                    subheroType: 'none',
                    cost:  -1000,
                    heroLevel:  -1000,
                    powerCost:  -1000,
                    coolDownTurns:  -1000,
                    conditions: []
                }
            );
        }
        return NullItem.instance;
    }

    isNull(): boolean {
        return true;
    }
}