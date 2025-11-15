<template>
  <div class="flex flex-col h-full">
    <!-- Top Section: Action buttons -->
    <div class="flex justify-center items-center py-2 gap-2">
      <ActionButton
        :disabled="!hasCompletedItems || loading"
        @click="handleDeleteCompleted"
      >
        Clear completed 🗑
      </ActionButton>
      <ActionButton @click="toggleSort">
        {{ isSortedByLabel ? 'Unsort' : 'Sort by label' }}
      </ActionButton>
    </div>

    <!-- Middle Section: Scrollable list -->
    <div class="flex-1 min-h-0 overflow-y-auto flex justify-center scrollable-container">
      <ul class="p-5">
        <li
          v-if="displayedItems.length"
          v-for="item in displayedItems"
          :key="item.id"
          class="dark:text-white"
        >
          <TodoItem :item="item" @toggle="handleToggleItem" />
        </li>
        <p v-else class="dark:text-gray-400">
          {{ loading ? 'Loading...' : 'List is empty' }}
        </p>
      </ul>
    </div>

    <!-- Bottom Section: Add item form -->
    <AddItemForm
      :disabled="loading"
      @submit="handleAddItem"
    />
  </div>
</template>

<script setup lang="ts">
import ActionButton from '~/components/ui/ActionButton.vue';
import TodoItem from '~/components/todo/TodoItem.vue';
import AddItemForm from '~/components/todo/AddItemForm.vue';
import type { ItemDTO, ItemUI } from '~/types/item';

// Composables
const todoManager = useTodos();
const { items, loading, hasCompletedItems, fetchItems, addItem, toggleItem, deleteCompletedItems } = todoManager;

// Sorting
const { displayedItems, isSortedByLabel, toggleSort } = useTodoSort(items as Ref<ItemUI[]>);

// Initial data fetch
const { data } = await useFetch<ItemDTO[]>('/api/getItems');
if (data.value) {
  // Initialize items from server
  items.value = data.value.map(item => ({
    id: item.id,
    name: item.name,
    isCompleted: item.is_completed,
    label: item.label,
  }));
}

/**
 * Handle adding a new item
 */
async function handleAddItem({ item, label }: { item: string; label: any }) {
  try {
    await addItem(item, label);
  } catch (e) {
    console.error('Failed to add item:', e);
  }
}

/**
 * Handle toggling item completion
 */
async function handleToggleItem(item: ItemUI) {
  try {
    await toggleItem(item);
  } catch (e) {
    console.error('Failed to toggle item:', e);
  }
}

/**
 * Handle deleting completed items
 */
async function handleDeleteCompleted() {
  try {
    await deleteCompletedItems();
  } catch (e) {
    console.error('Failed to delete completed items:', e);
  }
}
</script>

<style lang="css" scoped>
.scrollable-container {
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
}
</style>
