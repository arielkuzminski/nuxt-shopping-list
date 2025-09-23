import { Item } from "../../types/item";

export async function initializeDatabase() {
  const db = useDatabase("myDB");

  try {
    // Create items table if it doesn't exist
    await db.sql`CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )`;

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
}

export async function getAllItems() {
  const db = useDatabase("myDB");
  try {
    const items = await db.sql`SELECT * FROM items`;
    return items.rows || [];
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}

export async function addNewItem(name: string) {
  const db = useDatabase("myDB");
  try {
    await db.sql`INSERT INTO items (name) VALUES (${name})`;
    return getAllItems();
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
}
