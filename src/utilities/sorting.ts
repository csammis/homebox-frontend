import type { Entity } from "../models/HomeBox/entity";

export class SortOption {
  value: number;
  name: string;

  public constructor(value: number, name: string) {
    this.value = value;
    this.name = name;
  }
}

export const SortOptions: SortOption[] = [
  new SortOption(0, "Sort by name A to Z"),
  new SortOption(1, "Sort by name Z to A"),
  new SortOption(2, "Sort by price low to high"),
  new SortOption(3, "Sort by price high to low"),
];

export function sortItemsByOption(items: Entity[], sort: SortOption): Entity[] {
  items.sort((a: Entity, b: Entity) => {
    switch (sort.value) {
      case 0:
        return a.name.localeCompare(b.name);
      case 1:
        return b.name.localeCompare(a.name);
      case 2:
        return a.purchasePrice - b.purchasePrice;
      case 3:
      default:
        return b.purchasePrice - a.purchasePrice;
    }
  });
  return items;
}
