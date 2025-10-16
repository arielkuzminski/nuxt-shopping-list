import { CompleteItemRequest } from "~~/types/item";
import { completeItem, getAllItems } from "../db/items";

export default defineEventHandler(async (event) => {
  const body = await readBody<CompleteItemRequest>(event);

  await completeItem(body.item);

  const items = await getAllItems();

  return {
    success: true,
    items,
  };
});
