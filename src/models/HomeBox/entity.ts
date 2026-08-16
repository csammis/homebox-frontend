import { Tag } from "./tag";
import { EntityType } from "./entityType";
import { Field } from "./field";
import type { Attachment } from "./attachment";

export class Entity {
  public id: string;
  public assetId: string;
  public name: string;
  public description: string;
  public quantity: number;
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
  public attachments: Attachment[] | undefined;

  public constructor(
    id: string,
    assetId: string,
    name: string,
    description: string,
    quantity: number,
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
    attachments: Attachment[] | undefined,
  ) {
    this.id = id;
    this.assetId = assetId;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
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
    this.attachments = attachments;
  }
}

//! Fetch the thumbnail for the entity using as many fallbacks before fetching the main huge image as possible:
//!  If the entity has a thumbnailId, fetch that
//!  If the entity has a list of attachments, try to find the primary.
//!   If the primary has a thumbnail, fetch that, otherwise fetch the primary
//!  If the entity has an imageId (the big one), fetch that
//!  Otherwise bail
export async function getEntityThumbnail(entity: Entity): Promise<string> {
  let idToFetch = "";
  if (entity.thumbnailId) {
    idToFetch = entity.thumbnailId;
  } else if (entity.attachments) {
    entity.attachments.forEach((element) => {
      if (element.primary) {
        if (element.thumbnail?.id) {
          idToFetch = element.thumbnail.id;
        } else {
          idToFetch = element.id;
        }
      }
    });
  } else if (entity.imageId) {
    idToFetch = entity.imageId;
  }

  if (idToFetch.length > 0) {
    const response = await fetch(
      "/api/entities/" + entity.id + "/attachments/" + idToFetch,
    );
    return URL.createObjectURL(await response.blob());
  }
  return "";
}

export async function getEntity(id: string): Promise<Entity> {
  const response = await fetch("/api/entity/" + id);
  return (await response.json()) as Entity;
}
