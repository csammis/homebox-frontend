import type { Entity } from "./entity";

export class Thumbnail {
  public id: string;
  public title: string;

  public constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }
}

export class Attachment {
  public id: string;
  public type: string;
  public primary: boolean;
  public title: string;
  public thumbnail: Thumbnail | undefined;

  public constructor(
    id: string,
    type: string,
    primary: boolean,
    title: string,
    thumbnail: Thumbnail | undefined,
  ) {
    this.id = id;
    this.type = type;
    this.primary = primary;
    this.title = title;
    this.thumbnail = thumbnail;
  }
}

export async function downloadAttachmentById(
  entity: Entity,
  id: string,
): Promise<string> {
  const response = await fetch(
    "/api/entities/" + entity.id + "/attachments/" + id,
  );
  return URL.createObjectURL(await response.blob());
}

export async function downloadAttachmentFromEntity(
  entity: Entity,
  attachment: Attachment,
): Promise<string> {
  if (attachment.type == "photo") {
    return downloadAttachmentById(entity, attachment.id);
  }
  return "";
}

export async function downloadAttachmentThumbnailFromEntity(
  entity: Entity,
  attachment: Attachment,
): Promise<string> {
  if (attachment.type == "photo" && attachment.thumbnail) {
    return downloadAttachmentById(entity, attachment.thumbnail.id);
  }
  return "";
}
