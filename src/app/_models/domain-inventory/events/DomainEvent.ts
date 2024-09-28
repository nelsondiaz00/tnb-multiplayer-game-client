import { AggregateRoot } from "../AggregateRoot"
import { DomainEventInterface } from "./DomainEventInterface"

interface IHandlersMap {
  [name: string]: any
}

export class DomainEvents {
  private static handlersMap: IHandlersMap = {}
  private static markedAggregates: AggregateRoot<any>[] = []

  private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
    const domainEvents = aggregate.domainEvents
    domainEvents.forEach((event: DomainEventInterface) => {
      this.dispatch(event)
    })
  }

  private static removeAggregateFromMarkedDispatchList(aggregate: AggregateRoot<any>): void {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate))
    this.markedAggregates.splice(index, 1)
  }

  private static findMarkedAggregateByID(id: string): AggregateRoot<any> | null {
    let found = null
    for (let aggregate of this.markedAggregates) {
      if (aggregate.id === (id)) {
        found = aggregate
      }
    }
    return found
  }

  public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    const aggregateFound = !! this.findMarkedAggregateByID(aggregate.id)
    if (!aggregateFound) {
      this.markedAggregates.push(aggregate)
    }
  }

  public static dispatchEventsForAggregate(id: string): void {
    const aggregate = this.findMarkedAggregateByID(id)
    if (aggregate) {
-     this.dispatchAggregateEvents(aggregate)
      aggregate.clearEvents()
      this.removeAggregateFromMarkedDispatchList(aggregate)
    }
  }

  public static register(callback: (event: DomainEventInterface) => void, eventClassName: string): void {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);
  }

  public static dispatch(event: DomainEventInterface): void {
    const eventClassName: string = event.constructor.name
    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers = this.handlersMap[eventClassName]
      for (let handler of handlers) {
        handler(event)
      }
    }
  }

  public static clearHandlers(): void {
    this.handlersMap = {}
  }

  public static clearMarkedAggregates(): void {
    this.markedAggregates = []
  }
}