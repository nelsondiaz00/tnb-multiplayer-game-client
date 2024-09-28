const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity
}

export abstract class Entity<TId> {
  protected readonly _id: string
  public readonly props: TId

  constructor(id: string, props: TId) {
    this._id = id;
    this.props = props
  }

  public equals(object: Entity<TId>): boolean {
    if (object == null) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return object._id === this._id;
  }
  
  get id(): string {
    return this._id
  }
}