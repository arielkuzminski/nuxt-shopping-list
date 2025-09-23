export interface Item {
  id: number;
  name: string;
}

export interface AddItemRequest {
  item: string;
}

export interface AddItemResponse {
  success: boolean;
  items: Item[];
}
