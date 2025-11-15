import type { ItemDTO, ItemUI, FetchItemsResponse, LabelType } from '~/types/item';

export function useTodos() {
  const items = ref<ItemUI[]>([]);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  /**
   * Map API items to UI items
   */
  function mapItems(apiItems: ItemDTO[] = []): ItemUI[] {
    return apiItems.map((item) => ({
      id: item.id,
      name: item.name,
      isCompleted: item.is_completed,
      label: item.label,
    }));
  }

  /**
   * Fetch all items from the API
   */
  async function fetchItems(): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const data = await $fetch<ItemDTO[]>('/api/getItems');
      items.value = mapItems(data);
    } catch (e) {
      error.value = e as Error;
      console.error('Error fetching items:', e);
    } finally {
      loading.value = false;
    }
  }

  /**
   * Add a new item
   */
  async function addItem(name: string, label: LabelType = null): Promise<void> {
    if (!name.trim()) return;

    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<FetchItemsResponse>('/api/addItem', {
        method: 'POST',
        body: { item: name, label },
      });

      items.value = mapItems(response.items || []);
    } catch (e) {
      error.value = e as Error;
      console.error('Error adding item:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Toggle item completion status
   */
  async function toggleItem(item: ItemUI): Promise<void> {
    const previousState = item.isCompleted;

    // Optimistic update
    item.isCompleted = !previousState;

    try {
      await $fetch('/api/completeItem', {
        method: 'PUT',
        body: { item },
      });
    } catch (e) {
      // Rollback on error
      item.isCompleted = previousState;
      error.value = e as Error;
      console.error('Error toggling item:', e);
      throw e;
    }
  }

  /**
   * Delete completed items
   */
  async function deleteCompletedItems(): Promise<void> {
    const completedIds = items.value
      .filter((item) => item.isCompleted)
      .map((item) => item.id);

    if (completedIds.length === 0) return;

    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<FetchItemsResponse>('/api/deleteItem', {
        method: 'DELETE',
        body: { itemIds: completedIds },
      });

      items.value = mapItems(response.items || []);
    } catch (e) {
      error.value = e as Error;
      console.error('Error deleting items:', e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Computed: Get all completed item IDs
   */
  const completedIds = computed(() =>
    items.value.filter((item) => item.isCompleted).map((item) => item.id)
  );

  /**
   * Computed: Check if there are any completed items
   */
  const hasCompletedItems = computed(() => completedIds.value.length > 0);

  return {
    // State (items is writable for initial data loading)
    items,
    loading: readonly(loading),
    error: readonly(error),

    // Computed
    completedIds,
    hasCompletedItems,

    // Methods
    fetchItems,
    addItem,
    toggleItem,
    deleteCompletedItems,
  } as const;
}
