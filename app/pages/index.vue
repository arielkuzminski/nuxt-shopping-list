<template>
  <div class="flex flex-col justify-between items-center flex-grow">
    <div class="flex justify-center flex-col items-center">
      <button
        class="bg-transparent text-gray-400 border-gray-400 border-2 rounded-md p-2 flex-grow min-w-20 m-2"
        @click="onDelete"
      >
        Clear completed 🗑
      </button>
      <ul class="p-5">
        <li
          class="text-white flex"
          v-for="item in items || []"
          v-if="items.length"
          :key="item.id"
        >
          <div class="flex mb-2 text-2xl" @click="onItemSelected(item)">
            <label
              class="border-blue-400 border-2 size-8 flex hover:cursor-pointer mr-2 items-center justify-center p-4"
              ><span class="emoji-fill" v-show="item.isCompleted"
                >✔️</span
              ></label
            >
            <span
              :to="{ name: 'users-id', params: { id: item.id } }"
              class="hover:cursor-pointer"
              :class="{ 'line-through': item.isCompleted }"
              >{{ item.name }}</span
            >
          </div>
        </li>
        <p class="text-gray-400" v-else>List is empty</p>
      </ul>
    </div>
    <form class="mb-5 flex items-center justify-center">
      <input
        type="text"
        class="bg-gray-700 rounded-md p-2 mr-1 text-gray-400"
        v-model="item"
        placeholder="Add new product..."
      />
      <button
        type="submit"
        class="bg-gray-700 text-gray-400 size-10 rounded-md text-3xl justify-center align-middle items-center"
        @click.prevent="onSubmit"
      >
        +
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { ItemDTO, FetchItemsResponse, ItemUI } from "../../types/item";

const item = ref(""); // State for the input field
const items = ref<ItemUI[]>([]);

// Fetch items - API returns Item[] directly
const { data } = await useFetch<ItemDTO[]>("/api/getItems");
items.value =
  data.value?.map((item) => ({
    id: item.id,
    name: item.name,
    isCompleted: item.is_completed,
  })) || [];

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

  items.value = response.items.map((item) => ({
    ...item,
    isCompleted: false,
  }));
}

async function onSubmit() {
  const response = await $fetch<FetchItemsResponse>("/api/addItem", {
    method: "POST",
    body: { item: item.value },
  });
  items.value = response.items.map((item) => ({
    ...item,
    isCompleted: false,
  }));
  item.value = ""; // Clear the input field after submission
}
</script>

<style lang="css" scoped>
.emoji-fill {
  color: transparent;
  text-shadow: 0 0 0 #60a5fa;
}
</style>
