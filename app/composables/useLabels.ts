import type { LabelType, LabelConfig } from '~/types/item';
import { LABELS } from '~/types/item';

export function useLabels() {
  /**
   * Get label configuration by ID
   */
  function getLabelById(labelId: LabelType): LabelConfig | undefined {
    if (!labelId) return undefined;
    return LABELS.find(l => l.id === labelId);
  }

  /**
   * Get label color by ID with fallback
   */
  function getLabelColor(labelId: LabelType): string {
    return getLabelById(labelId)?.color || '#666';
  }

  /**
   * Get label name by ID with fallback
   */
  function getLabelName(labelId: LabelType): string {
    return getLabelById(labelId)?.name || '';
  }

  /**
   * Get label order for sorting
   */
  function getLabelOrder(): Exclude<LabelType, null>[] {
    return LABELS
      .map(l => l.id)
      .filter((id): id is Exclude<LabelType, null> => id !== null);
  }

  return {
    LABELS,
    getLabelById,
    getLabelColor,
    getLabelName,
    getLabelOrder,
  } as const;
}
