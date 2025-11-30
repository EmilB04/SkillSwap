// src/db/seed.ts
import { defineScript } from "rwsdk/worker";
import { drizzle } from "drizzle-orm/d1";
import { users, profileDetails, ads } from "./schema";
import { createPasswordHash } from "@/app/lib/auth/password"; // samme som auth bruker

export default defineScript(async ({ env }) => {
  const db = drizzle(env.DB);

  await db.delete(ads);
  await db.delete(profileDetails);
  await db.delete(users);

  const loginEmail = "demo@example.com";
  const plainPassword = "Password123!";

  const passwordHash = await createPasswordHash(plainPassword);

  const [loginUser] = await db
    .insert(users)
    .values({
      name: "Demo User",
      email: loginEmail,
      role: "user",
      passwordHash,
      isActive: true,
    })
    .returning();

  await db.insert(profileDetails).values({
    userId: loginUser.id,
    displayName: "Demo User",
    profileImageUrl: "https://example.com/profile.jpg",
    bio: "Hei! Jeg er en demobruker som elsker å bytte ferdigheter ✨",
      phoneNumber: "+47 123 45 678",
    location: "Oslo, Norway",
    website: "https://example.com",
    skillsOffered: "Web Development,React,TypeScript,Node.js",
    skillsLearning: "Norwegian,Piano,Photography",
  });

  
  await db.insert(ads).values([
    {
      slug: "gardening-1",
      title: "Lawn Mowing",
      description: "Need help with mowing the lawn",
      userId: loginUser.id,
      category: "Gardening",
      payment: "$20/hour",
      imageUrl: "/src/app/assets/gardening.jpeg",
      location: "BRA Veien 8, 1783 Halden",
      date: new Date(2025, 9, 17),
    },
    {
      slug: "language-2",
      title: "Translating",
      description: "Need help with translating documents",
      userId: loginUser.id,
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
      userId: loginUser.id,
      category: "Development",
      payment: "$30/hour",
      imageUrl: "/src/app/assets/web-design.jpg",
      location: "BRA Veien 8, 1783 Halden",
      date: new Date(2025, 9, 20),
    },
  ]);

  console.log("🌱 Finished seeding");
  console.log("👉 Login user:");
  console.log(`   email:    ${loginEmail}`);
  console.log(`   password: ${plainPassword}`);
});
