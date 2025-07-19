export interface Item {
  itemId: number;
  itemName: string;
}

export interface Category {
  categoryId: number;
  categoryName: string;
  icon: string;
  items: Item[];
}
