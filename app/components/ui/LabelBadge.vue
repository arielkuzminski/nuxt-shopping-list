<template>
  <span
    v-if="label"
    class="px-2 py-1 rounded text-sm font-semibold"
    :style="{ backgroundColor: label.color, color: '#000' }"
  >
    {{ label.name }}
  </span>
</template>

<script setup lang="ts">
import type { LabelType } from '~/types/item';

interface Props {
  labelId: LabelType;
}

const props = defineProps<Props>();

const { getLabelById } = useLabels();

const label = computed(() => props.labelId ? getLabelById(props.labelId) : null);
</script>
