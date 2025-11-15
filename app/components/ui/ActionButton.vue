<template>
  <button
    class="bg-transparent dark:text-gray-400 dark:border-gray-400 border-2 rounded-md p-2 min-w-20 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  disabled?: boolean;
}

interface Emits {
  (e: 'click', event: MouseEvent): void;
}

withDefaults(defineProps<Props>(), {
  label: '',
  disabled: false,
});

const emit = defineEmits<Emits>();

function handleClick(event: MouseEvent) {
  emit('click', event);
}
</script>
