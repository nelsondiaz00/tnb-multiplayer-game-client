import { AbstractHero } from "../hero/AbstractHero";
import { AbstractInventory } from "../inventory/AbstractInventory";
import { AbstractPlayer, PlayerProps } from "./AbstractPlayer";

export default class Player extends AbstractPlayer {
    
    private constructor(playerId: string, props: PlayerProps){
        super(playerId ,props)
    }

    isNull(): boolean {
        return false;
    }

    public static create(
        playerId: string, 
        name: string,
        level: number,
        inventory: AbstractInventory,
        heroList: AbstractHero[]
    ): AbstractPlayer{
        return new Player(playerId, {name, level, inventory, heroList});
    }
}