import { AbstractEffect, EffectProps } from "./AbstractEffect";

export default class NullEffect extends AbstractEffect {
    static instance: NullEffect;

    private constructor(props: EffectProps){
        super(props)
    }

    public static create(): NullEffect {
        if (!NullEffect.instance) {
            NullEffect.instance = new NullEffect(
                {
                    value: "no value in database",
                    maxValue: 0,
                    attribute: "no attribute in database",
                    type: -1000,
                    turns: -1000,
                    operator: "no operator in database",
                    heroType: "no hero asigned",
                    heroSubtype: "no hero asigned"
                }
            );
        }
        return NullEffect.instance;
    }

    isNull(): boolean {
        return true;
    }
}