import { defineScript } from "rwsdk/worker";
import { drizzle } from "drizzle-orm/d1";
import { users, profileDetails, ads } from './schema';

export default defineScript(async ({ env }) => {
  
  const db = drizzle(env.DB);

  // Removing data from database
  await db.delete(ads);
  await db.delete(profileDetails);

  // Insert a user
  const [testUser] = await db
    .insert(users)
    .values({ name: "Test User", email: "test@example.com" })
    .returning();

  // creating a profile
  await db.insert(profileDetails).values({
     userId: testUser.id,
     displayName: "Test User",
     profileImageUrl: "https://example.com/",
     bio: "Hei! Jeg er kul.",
  });

  // creating a ad
  await db.insert(ads).values({
    title: "Matlaging",
    description: "Jeg kan lage mat, ønsker å bytte mot noen som kan ta oppvasken.",
    userId: testUser.id,
  });

  console.log("🌱 Finished seeding");

});