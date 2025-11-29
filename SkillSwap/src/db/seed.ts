import { defineScript } from "rwsdk/worker";
import { drizzle } from "drizzle-orm/d1";
import { users, profileDetails, ads } from './schema';

export default defineScript(async ({ env }) => {
  
  const db = drizzle(env.DB);

  // Removing data from database
  await db.delete(ads);
  await db.delete(profileDetails);
  await db.delete(users);

  // Insert a user
  const [testUser] = await db
    .insert(users)
    .values({ name: "Test User", email: "test@example.com" })
    .returning();

  // creating a profile with all fields
  await db.insert(profileDetails).values({
     userId: testUser.id,
     displayName: "Test User",
     profileImageUrl: "https://example.com/profile.jpg",
     bio: "Hei! Jeg er en test bruker som liker å lære nye ting og dele mine ferdigheter.",
     phoneNumber: "+47 123 45 678",
     location: "Oslo, Norway",
     website: "https://example.com",
     skillsOffered: "Web Development,React,TypeScript,Node.js",
     skillsLearning: "Norwegian,Piano,Photography",
  });

  // creating ads with full data
  await db.insert(ads).values([
    {
      slug: "gardening-1",
      title: "Lawn Mowing",
      description: "Need help with mowing the lawn",
      userId: testUser.id,
      category: "Gardening",
      payment: "$20/hour",
      imageUrl: "/src/app/assets/gardening.jpeg",
      location: "BRA Veien 8, 1783 Halden",
      date: new Date(2025, 9, 17), // October 17, 2025
    },
    {
      slug: "language-2",
      title: "Translating",
      description: "Need help with translating documents",
      userId: testUser.id,
      category: "Language",
      payment: "$10/hour",
      imageUrl: "/src/app/assets/translating.webp",
      location: "BRA Veien 8, 1783 Halden",
      date: new Date(2025, 9, 18),
    },
    {
      slug: "development-3",
      title: "Web design",
      description: "Looking for a modern website design",
      userId: testUser.id,
      category: "Development",
      payment: "$30/hour",
      imageUrl: "/src/app/assets/web-design.jpg",
      location: "BRA Veien 8, 1783 Halden",
      date: new Date(2025, 9, 20),
    },
  ]);

  console.log("🌱 Finished seeding");

});