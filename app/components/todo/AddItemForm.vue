<template>
  <form class="flex flex-col items-center justify-center py-2 gap-2" @submit.prevent="handleSubmit">
    <!-- Label selector -->
    <LabelSelector v-model="selectedLabel" />

    <!-- Input and submit -->
    <div class="flex items-center">
      <input
        ref="inputRef"
        v-model="itemName"
        type="text"
        class="dark:bg-gray-700 rounded-md p-2 mr-2 border-2 border-solid dark:text-gray-400 dark:border-gray-400"
        :placeholder="placeholder"
        :disabled="disabled"
      />
      <button
        type="submit"
        class="dark:bg-gray-700 dark:text-gray-400 size-11 rounded-md text-3xl justify-center align-middle items-center border-2 border-solid dark:border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="disabled || !itemName.trim()"
      >
        +
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import LabelSelector from '~/components/ui/LabelSelector.vue';
import type { LabelType } from '~/types/item';

interface Props {
  placeholder?: string;
  disabled?: boolean;
}

interface Emits {
  (e: 'submit', data: { item: string; label: LabelType }): void;
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Add new product...',
  disabled: false,
});

const emit = defineEmits<Emits>();

const itemName = ref('');
const selectedLabel = ref<LabelType>(null);
const inputRef = ref<HTMLInputElement | null>(null);

function handleSubmit() {
  const trimmedName = itemName.value.trim();

  if (!trimmedName) return;

  emit('submit', {
    item: trimmedName,
    label: selectedLabel.value,
  });

  // Reset form
  itemName.value = '';
  selectedLabel.value = null;

  // Focus back on input
  nextTick(() => {
    inputRef.value?.focus();
  });
}

// Expose focus method for parent components
defineExpose({
  focus: () => inputRef.value?.focus(),
});
</script>
