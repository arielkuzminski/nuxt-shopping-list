export default defineEventHandler(async () => {
  const db = useDatabase("myDB");
  await db.sql`DROP TABLE IF EXISTS items`;
  return {
    success: true,
    message: "Doomed the database, all data lost!",
  };
});
