export type ItemType = 'PRIMER' | 'SEKUNDER' | 'TERSIER';

export interface CreateItemRequest {
  name: string;
  price: number;
  urgency: number;
  itemType: ItemType;
  categoryId: number | null;
}

export interface Category {
  id: number;
  name: string;
}

export interface Item {
  id: number;
  name: string;
  price: number;
  /** 1 = not urgent, 5 = extremely urgent */
  urgency: number;
  itemType: ItemType;
  category: Category;
  priorityLabel: string;
}

export interface WishlistStatus {
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PURCHASED';
}

export interface WishlistItem {
  id: number;
  date: string;
  status: WishlistStatus['status'];
  item: Item;
}
