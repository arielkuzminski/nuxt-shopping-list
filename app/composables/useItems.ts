import type { ItemDTO, ItemUI } from "~~/types/item";

export function useItems() {
  function mapItems(apiItems: ItemDTO[] = []): ItemUI[] {
    return apiItems.map((item) => ({
      id: item.id,
      name: item.name,
      isCompleted: item.is_completed,
    }));
  }

  return { mapItems };
}
