import { Entity } from "./entity";
import { Tag } from "./tag";

export class Entities {
  public items: Entity[];
  public page: number;
  public pageSize: number;
  public total: number;
  public totalCost: number;

  public constructor(
    items: Entity[],
    page: number,
    pageSize: number,
    total: number,
    totalCost: number,
  ) {
    this.items = items;
    this.page = page;
    this.pageSize = pageSize;
    this.total = total;
    this.totalCost = totalCost;
  }
}

export async function getEntitiesByTag(tag: Tag): Promise<Entities> {
  const response = await fetch("/api/entities/" + tag.id);
  return (await response.json()) as Entities;
}
