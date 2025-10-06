<template>
  <div>
    <ul>
      <li class="list" v-for="item in items || []" :key="item.id">
        <NuxtLink
          :to="{ name: 'users-id', params: { id: item.id } }"
          class="item"
          >{{ item.name }}</NuxtLink
        >
        <button class="item-delete" @click="onDelete(item.id)">X</button>
      </li>
    </ul>
  </div>
  <div>
    <form>
      <input type="text" v-model="item" placeholder="Type something..." />
      <button type="submit" @click.prevent="onSubmit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Item, FetchItemsResponse } from "../../types/item";

const item = ref(""); // State for the input field
const items = ref<Item[]>([]);

// Fetch items - API returns Item[] directly
const { data } = await useFetch<Item[]>("/api/getItems");
items.value = data.value || [];

function onItemSelected(itemId: Number) {
  console.log("Item selected", itemId);
}

async function onDelete(itemId: Number) {
  const response = await $fetch<FetchItemsResponse>("/api/deleteItem", {
    method: "DELETE",
    body: { itemId },
  });

  items.value = response.items;
}

async function onSubmit() {
  const response = await $fetch<FetchItemsResponse>("/api/addItem", {
    method: "POST",
    body: { item: item.value },
  });
  items.value = response.items;
  item.value = ""; // Clear the input field after submission
}
</script>

<style scoped>
.list {
  padding: 1rem;
  margin: 1rem;
}

.item {
  border: 1px solid gray;
  color: white;
  background-color: gray;
  padding: 1rem;
  margin: 1rem;
}

.item-delete {
  color: white;
  background-color: red;
  border: none;
}

.item-delete:hover {
  cursor: pointer;
}
</style>
