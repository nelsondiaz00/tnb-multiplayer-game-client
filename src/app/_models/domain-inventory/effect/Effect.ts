import { AbstractEffect, EffectProps } from "./AbstractEffect";

export default class Effect extends AbstractEffect {

    private constructor(props: EffectProps) {
        super(props);
    }

    isNull(): boolean {
        return false;
    }

    /**
     * Factory method para crear instancias y aplicar reglas de validación
     * @param EffectAttributes
     */
    public static create(
        value: string, 
        attribute: string, 
        type: number, 
        turns: number,
        operator: string,
        heroType: string,
        heroSubtype: string,
        maxValue: number,
    
    ): AbstractEffect {        
        return new Effect({ value, maxValue, attribute, type, turns, operator, heroType, heroSubtype })
    }
}