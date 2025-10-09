import { DeleteItemRequest } from "~~/types/item";
import { deleteItem, getAllItems } from "../db/items";

export default defineEventHandler(async (event) => {
  const body = await readBody<DeleteItemRequest>(event);

  for (const id of body.itemIds) {
    const items = await deleteItem(id);
  }

  const items = await getAllItems();

  return {
    success: true,
    items,
  };
});
