import { ValueObject } from "../../ValueObject";

export interface SpecialAttributeProps{
    value: number;
    minValue: number;
    maxValue: number;
}

export default class SpecialAttribute extends ValueObject<SpecialAttributeProps>{
    constructor(props: SpecialAttributeProps){
        super(props)
    }

    get value(): number {
        return this.props.value;
    }
    
    get minValue(): number {
        return this.props.minValue;
    }
    
    get maxValue(): number {
        return this.props.maxValue;
    }    

    public static create(value: number, minValue: number, maxValue: number): SpecialAttribute {
        return new SpecialAttribute({value, minValue, maxValue})
    }
}