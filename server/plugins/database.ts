import { initializeDatabase } from "../db/items";

export default defineNitroPlugin(async () => {
  console.log("Initializing database...");
  await initializeDatabase();
});
