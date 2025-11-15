export type LabelType = 'ariel' | 'xfg' | 'baba' | 'wspolna' | null;

export interface LabelConfig {
  id: LabelType;
  name: string;
  color: string;
}

export const LABELS: LabelConfig[] = [
  { id: 'ariel', name: 'Ariel', color: '#FCD34D' }, // yellow
  { id: 'xfg', name: 'XFG', color: '#EF4444' }, // red
  { id: 'baba', name: 'Baba', color: '#F472B6' }, // pink
  { id: 'wspolna', name: 'Wspólna', color: '#10B981' }, // green
];

export interface ItemDTO {
  id: number;
  name: string;
  date_created: string; // ISO string (timestamptz)
  is_completed: boolean;
  date_completed?: string | null;
  label?: LabelType;
}

export interface ItemUI {
  id: number;
  name: string;
  isCompleted: boolean;
  label?: LabelType;
}

export interface AddItemRequest {
  item: string;
  label?: LabelType;
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
