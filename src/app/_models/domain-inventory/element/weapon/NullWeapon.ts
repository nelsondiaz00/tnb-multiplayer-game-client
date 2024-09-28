import { ElementProps } from "../AbstractElement";
import { AbstractWeapon } from "./AbstractWeapon";

export class NullWeapon extends AbstractWeapon {
    static instance: NullWeapon;

    private constructor(id: string, props: ElementProps){
        super(id, props)
    }

    public static create(): NullWeapon {
        if(!NullWeapon.instance) {
            NullWeapon.instance = new NullWeapon(
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
        return NullWeapon.instance;
    }

    isNull(): boolean {
        return false;
    }
}