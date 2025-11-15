<template>
  <div class="container flex flex-col h-full">
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
  set(value: boolean) {
    colorMode.preference = value ? "dark" : "light";
  },
});
</script>
