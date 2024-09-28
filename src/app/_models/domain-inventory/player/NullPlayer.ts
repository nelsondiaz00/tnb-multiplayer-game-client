import { NullInventory } from "../inventory/NullInventory";
import { AbstractPlayer, PlayerProps } from "./AbstractPlayer";

export default class NullPlayer extends AbstractPlayer {
    static instance: NullPlayer;

    private constructor(id: string, props: PlayerProps){
        super(id, props);
    }

    public static create(): NullPlayer {
        if(!NullPlayer.instance) {
            NullPlayer.instance = new NullPlayer(
                "no id",
                {
                    name: "no name", 
                    level: -1000,
                    inventory: NullInventory.create(),
                    heroList: []
                }
            );
        }
        return NullPlayer.instance;
    }

    isNull(): boolean {
        return true;
    }
}