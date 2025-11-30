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
      date: new Date(2025, 11, 17), // December 17, 2025
    },
    {
      slug: "language-2",
      title: "Translating",
      description: "Need help with translating documents",
      userId: testUser.id,
      category: "Language",
      payment: "$10/hour",
      imageUrl: "/src/app/assets/translating.webp",
      location: "Nappatjørn 61, 5563 Førresfjorden",
      date: new Date(2025, 11, 16), // December 16, 2025
    },
    {
      slug: "technology-3",
      title: "Web design",
      description: "Looking for a modern website design",
      userId: testUser.id,
      category: "Technology",
      payment: "$30/hour",
      imageUrl: "/src/app/assets/web-design.jpg",
      location: "Storgata 5, 0155 Oslo",
      date: new Date(2025, 11, 20), // December 20, 2025
    },
    {
      slug: "tutoring-4",
      title: "Math Tutoring",
      description: "Help needed for high school math",
      userId: testUser.id,
      category: "Tutoring",
      payment: "$25/hour",
      imageUrl: "/src/app/assets/math-tutoring.png",
      location: "Kirkegata 12, 7013 Trondheim",
      date: new Date(2026, 0, 5), // January 5, 2026
    },
    {
      slug: "cooking-5",
      title: "Cooking Lessons",
      description: "Looking for someone to teach cooking",
      userId: testUser.id,
      category: "Cooking",
      payment: "$40/hour",
      imageUrl: "/src/app/assets/cooking-lessons.jpg",
      location: "Markveien 10, 5012 Bergen",
      date: new Date(2026, 1, 14), // February 14, 2026
    },
    {
      slug: "gardening-6",
      title: "Plant Care",
      description: "Need help with indoor plant care",
      userId: testUser.id,
      category: "Gardening",
      payment: "Swap",
      imageUrl: "/src/app/assets/gardening.jpeg",
      location: "Torggata 20, 9008 Tromsø",
      date: new Date(2026, 2, 10), // March 10, 2026
    },
    {
      slug: "technology-7",
      title: "Graphic Design",
      description: "Looking for a logo design",
      userId: testUser.id,
      category: "Technology",
      payment: "$50/hour",
      imageUrl: "/src/app/assets/graphic-design.jpg",
      location: "Olav V's gate 3, 0161 Oslo",
      date: new Date(2026, 3, 22), // April 22, 2026
    },
    {
      slug: "music-8",
      title: "Guitar Lessons",
      description: "Need beginner guitar lessons",
      userId: testUser.id,
      category: "Music",
      payment: "$30/hour",
      imageUrl: "/src/app/assets/guitar-lesson.jpg",
      location: "Prinsens gate 15, 7012 Trondheim",
      date: new Date(2025, 11, 15), // December 15, 2025
    },
    {
      slug: "other-9",
      title: "Dog Walking",
      description: "Looking for someone to walk my dog",
      userId: testUser.id,
      category: "Other",
      payment: "$15/hour",
      imageUrl: "/src/app/assets/dog-walking.jpg",
      location: "Jernvegen 19, 4755 Hovden",
      date: new Date(2025, 11, 18), // December 18, 2025
    }
  ]);

  console.log("🌱 Finished seeding");

});