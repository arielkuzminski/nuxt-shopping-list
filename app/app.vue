<template>
  <div>
    <div>
      <ul>
        <li v-for="item in items || []" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>

    <div>
      <form>
        <input type="text" v-model="item" placeholder="Type something..." />
        <button type="submit" @click.prevent="onSubmit">Submit</button>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Item, AddItemResponse } from "../types/item";

const item = ref(""); // State for the input field
const items = ref<Item[]>([]);

// Fetch items - API returns Item[] directly
const { data } = await useFetch<Item[]>("/api/getItems");
items.value = data.value || [];

async function onSubmit() {
  const response = await $fetch<AddItemResponse>("/api/addItem", {
    method: "POST",
    body: { item: item.value },
  });
  items.value = response.items;
  item.value = ""; // Clear the input field after submission
}
</script>
