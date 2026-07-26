export class Tag {
  public id: string;
  public parentId: string;
  public name: string;
  public description: string;
  public color: string;
  public icon: string;
  public createdAt: string;
  public updatedAt: string;

  public constructor(
    id: string,
    parentId: string,
    name: string,
    description: string,
    color: string,
    icon: string,
    createdAt: string,
    updatedAt: string,
  ) {
    this.color = color;
    this.createdAt = createdAt;
    this.description = description;
    this.icon = icon;
    this.id = id;
    this.name = name;
    this.parentId = parentId;
    this.updatedAt = updatedAt;
  }
}
