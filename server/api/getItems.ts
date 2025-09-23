import { getAllItems } from "../db/items";

export default defineEventHandler(async () => {
  return getAllItems();
});
