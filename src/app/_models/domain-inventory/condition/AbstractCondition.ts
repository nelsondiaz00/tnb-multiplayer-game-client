import { ValueObject } from "../ValueObject";

export interface ConditionProps {
    attribute1: string,
    target1: string,
    logicalOperator: string,
    attribute2: string,
    target2: string,
}

export abstract class AbstractCondition extends ValueObject<ConditionProps> {
    constructor(props: ConditionProps) {
        super(props);
    }

    get attribute1(): string {
        return this.props.attribute1;
    }

    set attribute1(value: string) {
        this.props.attribute1 = value;
    }

    get target1(): string {
        return this.props.target1;
    }

    set target1(value: string) {
        this.props.target1 = value;
    }

    get logicalOperator(): string {
        return this.props.logicalOperator;
    }

    set logicalOperator(value: string) {
        this.props.logicalOperator = value;
    }

    get attribute2(): string {
        return this.props.attribute2;
    }

    set attribute2(value: string) {
        this.props.attribute2 = value;
    }

    get target2(): string {
        return this.props.target2;
    }

    set target2(value: string) {
        this.props.target2 = value;
    }
}