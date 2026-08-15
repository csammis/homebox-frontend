export class Field {
  public id: string;
  public type: string;
  public name: string;
  public textValue: string;
  public numberValue: number;
  public booleanValue: boolean;

  public constructor(
    id: string,
    type: string,
    name: string,
    textValue: string,
    numberValue: number,
    booleanValue: boolean,
  ) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.textValue = textValue;
    this.numberValue = numberValue;
    this.booleanValue = booleanValue;
  }
}
