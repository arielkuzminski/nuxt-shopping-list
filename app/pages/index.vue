<template>
  <div class="flex flex-col h-full">
    <!-- Top Section: Clear completed button -->
    <div class="flex justify-center items-center py-2">
      <button
        class="bg-transparent dark:text-gray-400 dark:border-gray-400 border-2 rounded-md p-2 min-w-20"
        @click="onDelete"
      >
        Clear completed 🗑
      </button>
    </div>

    <!-- Middle Section: Scrollable list -->
    <div class="flex-1 min-h-0 overflow-y-auto flex justify-center scrollable-container">
      <ul class="p-5">
        <li
          class="dark:text-white flex"
          v-for="item in items || []"
          v-if="items.length"
          :key="item.id"
        >
          <div class="flex mb-2 text-2xl">
            <label
              class="dark:border-blue-400 border-2 size-8 flex hover:cursor-pointer mr-2 items-center justify-center p-4"
              @click.stop="onItemSelected(item)"
              ><span class="emoji-fill" v-show="item.isCompleted"
                >✔️</span
              ></label
            >
            <span
              :to="{ name: 'users-id', params: { id: item.id } }"
              :class="{ 'line-through': item.isCompleted }"
              >{{ item.name }}</span
            >
          </div>
        </li>
        <p class="dark:text-gray-400" v-else>List is empty</p>
      </ul>
    </div>

    <!-- Bottom Section: Add item form -->
    <form class="flex items-center justify-center py-2">
      <input
        type="text"
        class="dark:bg-gray-700 rounded-md p-2 mr-2 border-2 border-solid dark:text-gray-400 dark:border-gray-400"
        v-model="item"
        placeholder="Add new product..."
      />
      <button
        type="submit"
        class="dark:bg-gray-700 dark:text-gray-400 size-11 rounded-md text-3xl justify-center align-middle items-center border-2 border-solid dark:border-gray-400"
        @click.prevent="onSubmit"
      >
        +
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { ItemDTO, FetchItemsResponse, ItemUI } from "../../types/item";

const { mapItems } = useItems();

const item = ref(""); // State for the input field
const items = ref<ItemUI[]>([]);

// Fetch items - API returns Item[] directly
const { data } = await useFetch<ItemDTO[]>("/api/getItems");

items.value = mapItems(data.value || []);

const selectedIDs = computed(() => {
  return items.value.filter((item) => item.isCompleted).map((item) => item.id);
});

async function onItemSelected(item: ItemUI) {
  if (item.isCompleted) {
    item.isCompleted = false;
  } else {
    item.isCompleted = true;
  }
  await $fetch("/api/completeItem", {
    method: "PUT",
    body: {
      item,
    },
  });
}

async function onDelete() {
  if (!selectedIDs.value.length) return;
  const response = await $fetch<FetchItemsResponse>("/api/deleteItem", {
    method: "DELETE",
    body: {
      itemIds: [...selectedIDs.value],
    },
  });

  items.value = mapItems(response.items || []);
}

async function onSubmit() {
  const response = await $fetch<FetchItemsResponse>("/api/addItem", {
    method: "POST",
    body: { item: item.value },
  });
  items.value = mapItems(response.items || []);
  item.value = "";
  // Clear the input field after submission
}
</script>

<style lang="css" scoped>
.emoji-fill {
  color: transparent;
  text-shadow: 0 0 0 #60a5fa;
}

.scrollable-container {
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
}
</style>
