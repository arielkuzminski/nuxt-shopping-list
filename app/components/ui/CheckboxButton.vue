<template>
  <label
    class="dark:border-blue-400 border-2 size-8 flex hover:cursor-pointer items-center justify-center p-4 transition-colors"
    :class="{ 'bg-blue-50 dark:bg-blue-900': checked }"
    @click.stop="handleClick"
  >
    <span class="emoji-fill" v-show="checked">✔️</span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  checked: boolean;
}

interface Emits {
  (e: 'update:checked', value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function handleClick() {
  emit('update:checked', !props.checked);
}
</script>

<style scoped>
.emoji-fill {
  color: transparent;
  text-shadow: 0 0 0 #60a5fa;
}
</style>
