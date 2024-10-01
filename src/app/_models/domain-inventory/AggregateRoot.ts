import { Entity } from './Entity';
import { DomainEvents } from './events/DomainEvent';
import { DomainEventInterface } from './events/DomainEventInterface';

export abstract class AggregateRoot<T> extends Entity<T> {
  protected _domainEvents: DomainEventInterface[] = [];

  override get id(): string {
    return this._id;
  }

  get domainEvents(): DomainEventInterface[] {
    return this._domainEvents;
  }

  public addDomainEvent(domainEvent: DomainEventInterface): void {
    this._domainEvents.push(domainEvent);
    DomainEvents.markAggregateForDispatch(this);
    this.logDomainEventAdded(domainEvent);
  }

  public dispatchDomainEvents() {
    DomainEvents.dispatchEventsForAggregate(this.id);
    this.clearEvents();
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  protected logDomainEventAdded(domainEvent: DomainEventInterface): void {
    console.info(`[Domain Event Created]:`, domainEvent);
  }
}
