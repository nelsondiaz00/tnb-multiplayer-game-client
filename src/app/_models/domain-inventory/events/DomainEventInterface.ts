export interface DomainEventInterface  {
    dateTimeOccurred: Date,
    aggregateId: string,
    eventType: string,
    meta: any
}