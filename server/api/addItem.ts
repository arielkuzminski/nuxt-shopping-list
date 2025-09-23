import { addNewItem } from "../db/items";
import type { AddItemRequest } from "../../types/item";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<AddItemRequest>(event);

    if (!body.item || typeof body.item !== "string") {
      throw createError({
        statusCode: 400,
        message: "Invalid request: item must be a non-empty string",
      });
    }

    const items = await addNewItem(body.item);

    return {
      success: true,
      items,
    };
  } catch (error) {
    console.error("Error adding item:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to add item",
    });
  }
});
