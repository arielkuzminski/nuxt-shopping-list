export interface Item {
  id: number;
  name: string;
}

export interface ItemUI {
  id: number;
  name: string;
  selected: boolean;
}

export interface AddItemRequest {
  item: string;
}

export interface DeleteItemRequest {
  itemIds: number[];
}

export interface FetchItemsResponse {
  success: boolean;
  items: Item[];
}
