import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!url || !serviceRoleKey) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment"
  );
}

const supabase = createClient(url, serviceRoleKey, {
  auth: {
    persistSession: false,
  },
});

export async function initializeDatabase() {
  // On Supabase we normally create tables via SQL editor or migrations.
  // This function can remain as a no-op or check connectivity.
  try {
    const { data, error } = await supabase.from("items").select("*").limit(1);
    if (error && error.code !== "42P01") {
      // 42P01 = undefined_table
      console.error("Supabase connectivity check failed", error);
      throw error;
    }
    console.log("Supabase connectivity OK");
  } catch (err) {
    console.error("Failed to initialize Supabase connection:", err);
    throw err;
  }
}

export async function getAllItems() {
  try {
    const { data, error } = await supabase
      .from("items")
      .select("id, name")
      .order("id", { ascending: true });
    if (error) {
      console.error("Error fetching items:", error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}

export async function addNewItem(name: string) {
  try {
    const { data, error } = await supabase
      .from("items")
      .insert({ name })
      .select("id, name");
    if (error) {
      console.error("Error adding item:", error);
      throw error;
    }
    // return full list (same behavior as previous)
    return getAllItems();
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
}

export async function deleteItem(itemId: number) {
  try {
    const { error } = await supabase.from("items").delete().eq("id", itemId);
    if (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
}
