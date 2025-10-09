<template>
  <div
    class="bg-slate-500 flex flex-col justify-between items-center flex-grow"
  >
    <ul class="p-5">
      <li
        class="text-white flex"
        v-for="item in items || []"
        v-if="items.length"
        :key="item.id"
      >
        <div class="flex mb-2" @click="onItemSelected(item)">
          <label
            class="border-green-400 border-2 h-7 w-7 flex hover:cursor-pointer mr-2"
            ><span v-show="item.selected">✔️</span></label
          >
          <NuxtLink
            :to="{ name: 'users-id', params: { id: item.id } }"
            class="item"
            >{{ item.name }}</NuxtLink
          >
        </div>
        <button class="" @click="onDelete(item.id)">🗑️</button>
      </li>
      <p v-else>List is empty</p>
    </ul>
    <form>
      <input
        type="text"
        class="bg-gray-700 rounded-md p-2 mr-1 mb-5 text-gray-400"
        v-model="item"
        placeholder="Add new product..."
      />
      <button
        type="submit"
        class="bg-gray-700 rounded-md p-2 text-gray-400"
        @click.prevent="onSubmit"
      >
        ➕
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Item, FetchItemsResponse, ItemUI } from "../../types/item";

const item = ref(""); // State for the input field
const items = ref<ItemUI[]>([]);

// Fetch items - API returns Item[] directly
const { data } = await useFetch<Item[]>("/api/getItems");
items.value =
  data.value?.map((item) => ({
    ...item,
    selected: false,
  })) || [];

function onItemSelected(item: ItemUI) {
  console.log("Item selected", item.id);
  if (item.selected) {
    item.selected = false;
  } else {
    item.selected = true;
  }
}

async function onDelete(itemId: Number) {
  const response = await $fetch<FetchItemsResponse>("/api/deleteItem", {
    method: "DELETE",
    body: { itemId },
  });

  items.value = response.items.map((item) => ({
    ...item,
    selected: false,
  }));
}

async function onSubmit() {
  const response = await $fetch<FetchItemsResponse>("/api/addItem", {
    method: "POST",
    body: { item: item.value },
  });
  items.value = response.items.map((item) => ({
    ...item,
    selected: false,
  }));
  item.value = ""; // Clear the input field after submission
}
</script>
