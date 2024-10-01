import { ValueObject } from '../../ValueObject';

export interface BaseStatsProps {
  damageProbability: number;
  criticalProbability: number;
  evadeHitProbability: number;
  resistProbability: number;
  escapeProbability: number;
}

export class BaseStats extends ValueObject<BaseStatsProps> {
  private constructor(props: BaseStatsProps) {
    super(props);
  }

  get damageProbability(): number {
    return this.props.damageProbability;
  }

  get criticalProbability(): number {
    return this.props.criticalProbability;
  }

  get evadeHitProbability(): number {
    return this.props.evadeHitProbability;
  }

  get resistProbability(): number {
    return this.props.resistProbability;
  }

  get escapeProbability(): number {
    return this.props.escapeProbability;
  }

  public static create(
    damageProbability: number,
    criticalProbability: number,
    evadeHitProbability: number,
    resistProbability: number,
    escapeProbability: number
  ): BaseStats {
    return new BaseStats({
      damageProbability,
      criticalProbability,
      evadeHitProbability,
      resistProbability,
      escapeProbability,
    });
  }
}
