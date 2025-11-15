import { addNewItem } from '../db/items';
import type { AddItemRequest } from '../../app/types/item';

export default defineEventHandler(async (event) => {
  const body = await readBody<AddItemRequest>(event);

  // Validation
  if (!body.item || typeof body.item !== 'string' || !body.item.trim()) {
    return validationError('Item name must be a non-empty string');
  }

  const items = await addNewItem(body.item.trim(), body.label);

  return successResponse({ items });
});
