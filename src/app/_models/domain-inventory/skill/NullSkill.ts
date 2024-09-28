import { AbstractSkill, SkillProps } from "./AbstractSkill";

export class NullSkill extends AbstractSkill {
    static instance: NullSkill;

    private constructor(name: string, props: SkillProps){
        super(name, props)
    }

    isNull(): boolean {
        return true;
    }

    public static create(): NullSkill {
        if(!NullSkill.instance) {
            NullSkill.instance = new NullSkill(
                "no name in database",
                {
                    heroSerial: "No serial in database",
                    heroType: "No heroType in database",
                    subHeroType: "No subHeroType in database",
                    requiredLevel: -1000,
                    productDescription: "No productDescription in database",
                    dropChance: -1000,
                    powerCost: -1000,
                    cooldownTurns: -1000,
                    effects: [],
                    conditions: []
                }
            );
        }
        return NullSkill.instance;
    }
}