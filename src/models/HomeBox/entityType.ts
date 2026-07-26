export class EntityType {
  public id: string;
  public name: string;
  public description: string;
  public isLocation: boolean;
  public icon: string;
  public createdAt: Date;
  public updatedAt: Date;

  public constructor(
    id: string,
    name: string,
    description: string,
    isLocation: boolean,
    icon: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isLocation = isLocation;
    this.icon = icon;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
