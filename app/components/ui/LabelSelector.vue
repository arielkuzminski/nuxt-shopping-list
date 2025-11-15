<template>
  <div class="flex gap-2 items-center">
    <span class="dark:text-gray-400 text-sm">{{ label }}:</span>
    <button
      v-for="labelConfig in labels"
      :key="labelConfig.id"
      type="button"
      class="px-3 py-1 rounded text-sm font-semibold border-2 transition-all"
      :class="modelValue === labelConfig.id ? 'border-white' : 'border-transparent'"
      :style="{ backgroundColor: labelConfig.color, color: '#000' }"
      @click="toggleLabel(labelConfig.id)"
    >
      {{ labelConfig.name }}
    </button>
    <button
      v-if="modelValue && showClear"
      type="button"
      class="dark:text-gray-400 text-sm underline hover:text-white transition-colors"
      @click="clearSelection"
    >
      Clear
    </button>
  </div>
</template>

<script setup lang="ts">
import type { LabelType } from '~/types/item';

interface Props {
  modelValue: LabelType;
  label?: string;
  showClear?: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: LabelType): void;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Label (optional)',
  showClear: true,
});

const emit = defineEmits<Emits>();

const { LABELS: labels } = useLabels();

function toggleLabel(labelId: Exclude<LabelType, null>) {
  if (props.modelValue === labelId) {
    emit('update:modelValue', null);
  } else {
    emit('update:modelValue', labelId);
  }
}

function clearSelection() {
  emit('update:modelValue', null);
}
</script>
