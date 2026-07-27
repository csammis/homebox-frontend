export class Tag {
  public id: string;
  public parentId: string | undefined;
  public name: string | undefined;
  public description: string | undefined;
  public color: string | undefined;
  public icon: string | undefined;
  public createdAt: Date | undefined;
  public updatedAt: Date | undefined;

  public constructor(id: string) {
    this.id = id;
  }
}
