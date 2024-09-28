import { AggregateRoot } from '../AggregateRoot';
import { AbstractHero } from '../hero/AbstractHero';
import { AbstractInventory } from '../inventory/AbstractInventory';

export interface PlayerProps {
  name: string;
  level: number;
  inventory: AbstractInventory;
  heroList: AbstractHero[];
}

export abstract class AbstractPlayer extends AggregateRoot<PlayerProps> {
  constructor(playerId: string, props: PlayerProps) {
    super(playerId, props);
  }

  get name(): string {
    return this.props.name;
  }

  get level(): number {
    return this.props.level;
  }

  get inventory(): AbstractInventory {
    return this.props.inventory;
  }

  get heroList(): AbstractHero[] {
    return this.props.heroList;
  }

  abstract isNull(): boolean;
}
