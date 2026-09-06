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

export async function getAllowedTagNames(): Promise<string[]> {
  const response = await fetch("/api/tagnames");
  return (await response.json()) as string[];
}

export async function getTagByName(name: string): Promise<Tag> {
  const response = await fetch("/api/tags/" + name);
  return (await response.json()) as Tag;
}
