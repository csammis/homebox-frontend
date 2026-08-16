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
