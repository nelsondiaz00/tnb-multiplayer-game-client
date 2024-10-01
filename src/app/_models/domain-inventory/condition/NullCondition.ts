import { AbstractCondition, ConditionProps } from "./AbstractCondition";

export default class NullCondition extends AbstractCondition {
    static instance: NullCondition;

    private constructor(props: ConditionProps){
        super(props)
    }

    public static create(): NullCondition {
        if (!NullCondition.instance) {
            NullCondition.instance = new NullCondition(
                {
                    attribute1: "no attribute 1",
                    target1: "no target 1",
                    logicalOperator: "no logical operator",
                    attribute2: "no attribute 2",
                    target2: "no target 2",
                }
            );
        }
        return NullCondition.instance;
    }

    isNull(): boolean {
        return true;
    }
}