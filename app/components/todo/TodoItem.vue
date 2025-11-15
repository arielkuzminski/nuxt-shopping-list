<template>
  <div class="flex mb-2 text-2xl items-center">
    <CheckboxButton
      :checked="item.isCompleted"
      @update:checked="handleToggle"
    />
    <span
      class="ml-2 transition-all"
      :class="{ 'line-through opacity-60': item.isCompleted }"
    >
      {{ item.name }}
    </span>
    <LabelBadge
      v-if="item.label"
      :label-id="item.label"
      class="ml-2"
    />
  </div>
</template>

<script setup lang="ts">
import CheckboxButton from '~/components/ui/CheckboxButton.vue';
import LabelBadge from '~/components/ui/LabelBadge.vue';
import type { ItemUI } from '~/types/item';

interface Props {
  item: ItemUI;
}

interface Emits {
  (e: 'toggle', item: ItemUI): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function handleToggle() {
  emit('toggle', props.item);
}
</script>
