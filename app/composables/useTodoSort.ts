import type { ItemUI } from '~/types/item';

export function useTodoSort(items: Ref<ItemUI[]>) {
  const isSortedByLabel = ref(false);

  const { getLabelOrder } = useLabels();

  const displayedItems = computed(() => {
    if (!isSortedByLabel.value) {
      return items.value;
    }

    const labelOrder = getLabelOrder();

    return [...items.value].sort((a, b) => {
      // Items without labels go to the end
      if (!a.label && !b.label) return 0;
      if (!a.label) return 1;
      if (!b.label) return -1;

      // Sort by label order
      return labelOrder.indexOf(a.label) - labelOrder.indexOf(b.label);
    });
  });

  function toggleSort() {
    isSortedByLabel.value = !isSortedByLabel.value;
  }

  return {
    isSortedByLabel: readonly(isSortedByLabel),
    displayedItems,
    toggleSort,
  } as const;
}
