import { useDatabase } from "h3";

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
