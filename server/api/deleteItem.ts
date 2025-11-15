import type { DeleteItemRequest } from '../../app/types/item';
import { deleteItem, getAllItems } from '../db/items';

export default defineEventHandler(async (event) => {
  const body = await readBody<DeleteItemRequest>(event);

  // Validation
  if (!Array.isArray(body.itemIds) || body.itemIds.length === 0) {
    return validationError('Item IDs must be a non-empty array');
  }

  // Delete all items in parallel
  await Promise.all(body.itemIds.map(id => deleteItem(id)));

  const items = await getAllItems();

  return successResponse({ items });
});
