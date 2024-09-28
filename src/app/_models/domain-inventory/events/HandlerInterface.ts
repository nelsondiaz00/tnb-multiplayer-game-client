import { DomainEventInterface } from "./DomainEventInterface";

export interface HandlerInterface<T extends DomainEventInterface> {
  setupSubscriptions(): void;
}