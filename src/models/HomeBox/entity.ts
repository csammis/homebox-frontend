import { Tag } from "./tag";
import { EntityType } from "./entityType";
import { Field } from "./field";

export class Entity {
  public id: string;
  public assetId: string;
  public name: string;
  public description: string;
  public quantity: number;
  public insured: boolean;
  public archived: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public purchasePrice: number;
  public parent: Entity;
  public entityType: EntityType;
  public tags: Tag[];
  public imageId: string | undefined;
  public thumbnailId: string | undefined;
  public soldAt: Date | undefined;
  public fields: Field[] | undefined;

  public constructor(
    id: string,
    assetId: string,
    name: string,
    description: string,
    quantity: number,
    insured: boolean,
    archived: boolean,
    createdAt: Date,
    updatedAt: Date,
    purchasePrice: number,
    parent: Entity,
    entityType: EntityType,
    tags: Tag[],
    imageId: string | undefined,
    thumbnailId: string | undefined,
    soldAt: Date | undefined,
    fields: Field[] | undefined,
  ) {
    this.id = id;
    this.assetId = assetId;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.insured = insured;
    this.archived = archived;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.purchasePrice = purchasePrice;
    this.parent = parent;
    this.entityType = entityType;
    this.tags = tags;
    this.imageId = imageId;
    this.thumbnailId = thumbnailId;
    this.soldAt = soldAt;
    this.fields = fields;
  }
}

export async function getEntityImage(entity: Entity): Promise<string> {
  if (entity.imageId) {
    const response = await fetch(
      "/api/entities/" + entity.id + "/attachments/" + entity.imageId,
    );
    return URL.createObjectURL(await response.blob());
  }
  return "";
}

export async function getEntity(id: string): Promise<Entity> {
  const response = await fetch("/api/entity/" + id);
  return (await response.json()) as Entity;
}
