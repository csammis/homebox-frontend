import { Tag } from "./tag";
import { EntityType } from "./entityType";

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
  public image: string | undefined;
  public thumbnail: string | undefined;
  public soldAt: Date | undefined;

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
    image: string | undefined,
    thumbnail: string | undefined,
    soldAt: Date | undefined,
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
    this.image = image;
    this.thumbnail = thumbnail;
    this.soldAt = soldAt;
  }
}
