import { AbstractElement, ElementProps } from "../AbstractElement";


export default abstract class AbstractArmor extends AbstractElement {
    private type: string;

    constructor(id: string, props: ElementProps, type: string){
        super(id, props)
        this.type = type;
    }

    get Type(){
        return this.type;
    }
}