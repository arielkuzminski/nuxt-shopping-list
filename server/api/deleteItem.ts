import { DeleteItemRequest } from "~~/types/item";
import { deleteItem } from "../db/items";

export default defineEventHandler(async (event) => {
  const body = await readBody<DeleteItemRequest>(event);

  const items = await deleteItem(body.itemId);

  return {
    success: true,
    items,
  };
});
