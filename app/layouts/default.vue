<template>
  <div class="container flex flex-col">
    <div class="flex justify-end mr-3">
      <ClientOnly v-if="!colorMode?.forced">
        <button @click="isDark = !isDark" class="text-xl">
          {{ isDark ? "🌙" : "☀️" }}
        </button>
        <template #fallback>
          <div class="size-7" />
        </template>
      </ClientOnly>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>
