export interface Item {
  id: number;
  name: string;
}

export interface AddItemRequest {
  item: string;
}

export interface DeleteItemRequest {
  itemId: number;
}

export interface FetchItemsResponse {
  success: boolean;
  items: Item[];
}
