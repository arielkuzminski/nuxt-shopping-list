export interface ItemDTO {
  id: number;
  name: string;
  date_created: string; // ISO string (timestamptz)
  is_completed: boolean;
  date_completed?: string | null;
}

export interface ItemUI {
  id: number;
  name: string;
  isCompleted: boolean;
}

export interface AddItemRequest {
  item: string;
}

export interface DeleteItemRequest {
  itemIds: number[];
}

export interface CompleteItemRequest {
  item: ItemUI;
}

export interface FetchItemsResponse {
  success: boolean;
  items: ItemDTO[];
}
