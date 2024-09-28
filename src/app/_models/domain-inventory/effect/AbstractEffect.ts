import { ValueObject } from "../ValueObject";

export interface EffectProps {
    value: string,
    maxValue: number,
    attribute: string,
    type: number,
    turns: number,
    operator: string,
    heroType: string,
    heroSubtype: string,
}

export abstract class AbstractEffect extends ValueObject<EffectProps> {
    constructor(props: EffectProps) {
        super(props);
    }

    get value(): string{
        return this.props.value;
    }

    get attribute(): string{
        return this.props.attribute;
    }

    get type(): number {
        return this.props.type;
    }

    get turns(): number {
        return this.props.type;
    }   
    
    get operator(): string {
        return this.props.operator;
    }

    get maxValue(): number {
        return this.props.maxValue;
    }

    get heroType(): string {
        return this.props.heroType;
    }
    get heroSubtype (): string {
        return this.props.heroSubtype;
    }

    abstract isNull(): boolean;
}