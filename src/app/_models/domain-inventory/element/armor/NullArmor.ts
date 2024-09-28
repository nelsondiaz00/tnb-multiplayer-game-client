import { ElementProps } from "../AbstractElement";
import AbstractArmor from "./AbstractArmor";

export default class NullArmor extends AbstractArmor {
    static instance: NullArmor;

    private constructor(id: string, props: ElementProps, type: string){
        super(id, props, type)
    }

    public static create(): NullArmor {
        if (!NullArmor.instance) {
            NullArmor.instance = new NullArmor(
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
                },
                "no type in database"
            );
        }
        return NullArmor.instance;
    }

    
    isNull(): boolean {
        return true;
    }
}