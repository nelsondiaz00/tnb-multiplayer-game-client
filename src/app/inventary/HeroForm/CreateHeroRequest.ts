interface SpecialAttribute{
    value: number;
    minValue: number;
    maxValue: number;
}

interface EffectProps {
    value: string,
    attribute: string,
    type: number,
    turns: number,
    operator: string,
}

interface SkillProps {
        cost: number,
        heroSerial: string,
        type: string,
        baseEffects: EffectProps[],
        specialEffects: EffectProps[],
}

interface BaseStats {
    damageProbability: number,
    criticalProbability: number,
    evadeHitProbability: number,
    resistProbability: number,  
    escapeProbability: number
}

export interface HeroData {
    idGroup: string,
    idSupgroup: string,
    status: number,
    heroName: string,
    heroLevel: number,
    heroBlood: number,
    heroMana: number,
    heroDefense: number,
    heroAttack: SpecialAttribute,
    heroDamage: SpecialAttribute,
    heroSkills: SkillProps[],
    baseStats: BaseStats,
}