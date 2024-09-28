import { AbstractInventory } from "../../inventory/AbstractInventory";

export default class HeroGuards{
    
    //valida que en el inventario del héroe existan menos de 12 elementos
    public static validateInsertElements(heroInventory: AbstractInventory): boolean{
        if(heroInventory.size <= 12){
            return true
        }
        return false
    }
}