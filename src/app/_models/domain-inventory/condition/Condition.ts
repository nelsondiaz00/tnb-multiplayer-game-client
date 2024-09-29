import { AbstractCondition, ConditionProps } from "./AbstractCondition";

export default class Condition extends AbstractCondition {

    private constructor(props: ConditionProps) {
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
        attribute1: string,
        target1: string,
        logicalOperator: string,
        attribute2: string,
        target2: string,
    
    ): AbstractCondition {        
        return new Condition({ attribute1, target1, logicalOperator, attribute2, target2 })
    }
}