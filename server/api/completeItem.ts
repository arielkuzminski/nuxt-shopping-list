import type { CompleteItemRequest } from '../../app/types/item';
import { completeItem, getAllItems } from '../db/items';

export default defineEventHandler(async (event) => {
  const body = await readBody<CompleteItemRequest>(event);

  // Validation
  if (!body.item || typeof body.item.id !== 'number') {
    return validationError('Invalid item data');
  }

  await completeItem(body.item);
  const items = await getAllItems();

  return successResponse({ items });
});
