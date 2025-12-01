// src/db/seed.ts
import { defineScript } from "rwsdk/worker";
import { drizzle } from "drizzle-orm/d1";
import { users, profileDetails, ads, reviews } from "./schema";
import { createPasswordHash } from "@/app/lib/auth/password"; // samme som auth bruker

export default defineScript(async ({ env }) => {
  const db = drizzle(env.DB);

  await db.delete(reviews);
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
    profileImageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo@example.com",
    bio: "Passionate about technology and lifelong learning! I love sharing my web development skills and learning new things from others in the community. Always excited to connect with fellow skill-swappers! 🚀",
    phoneNumber: "+47 987 65 432",
    location: "Oslo, Norway",
    website: "https://demo-portfolio.example.com",
    skillsOffered: "Web Development,React,TypeScript,Node.js,UI/UX Design,PostgreSQL,REST APIs,Git",
    skillsLearning: "Norwegian Language,Piano,Photography,Graphic Design,Public Speaking",
  });

  
  await db.insert(ads).values([
    {
      slug: "web-development-tutoring",
      title: "Learn Web Development - React & TypeScript",
      description: "Offering personalized web development lessons. I'll teach you React, TypeScript, and modern web development practices. Perfect for beginners or those looking to level up their skills. We'll build real projects together!",
      userId: loginUser.id,
      category: "Development",
      payment: "$35/hour",
      imageUrl: "/src/app/assets/web-design.jpg",
      location: "Oslo City Center, Oslo",
      date: new Date(2025, 11, 5),
    },
    {
      slug: "ui-ux-design-help",
      title: "UI/UX Design Consultation & Mentoring",
      description: "Need help with your app or website design? I offer UI/UX design consultations and can help you create beautiful, user-friendly interfaces using Figma and modern design principles.",
      userId: loginUser.id,
      category: "Design",
      payment: "$30/hour",
      imageUrl: "/src/app/assets/web-design.jpg",
      location: "Online or Oslo",
      date: new Date(2025, 11, 8),
    },
    {
      slug: "gardening-lawn-care",
      title: "Lawn Mowing & Garden Maintenance",
      description: "Professional lawn mowing and basic garden maintenance services. I'll keep your lawn neat and tidy. Available on weekends.",
      userId: loginUser.id,
      category: "Gardening",
      payment: "$25/hour",
      imageUrl: "/src/app/assets/gardening.jpeg",
      location: "Oslo West, Norway",
      date: new Date(2025, 11, 10),
    },
    {
      slug: "document-translation",
      title: "English-Norwegian Document Translation",
      description: "Need documents translated between English and Norwegian? I provide accurate translations for personal documents, emails, and general content.",
      userId: loginUser.id,
      category: "Language",
      payment: "$15/hour",
      imageUrl: "/src/app/assets/translating.webp",
      location: "Remote/Online",
      date: new Date(2025, 11, 12),
    },
    {
      slug: "tech-support-computers",
      title: "Computer & Tech Support",
      description: "Having computer issues? I can help with software troubleshooting, setup, basic repairs, and general tech support. Windows, Mac, and Linux systems.",
      userId: loginUser.id,
      category: "Technology",
      payment: "$28/hour",
      imageUrl: "/src/app/assets/web-design.jpg",
      location: "Oslo Area",
      date: new Date(2025, 11, 15),
    },
    {
      slug: "photography-beginner-lessons",
      title: "Looking for: Photography Lessons",
      description: "I'm eager to learn photography! Looking for someone who can teach me the basics of composition, lighting, and camera settings. Beginner friendly please!",
      userId: loginUser.id,
      category: "Photography",
      payment: "Skill exchange",
      imageUrl: "/src/app/assets/web-design.jpg",
      location: "Oslo",
      date: new Date(2025, 11, 18),
    },
    {
      slug: "norwegian-language-practice",
      title: "Looking for: Norwegian Language Practice Partner",
      description: "Seeking a patient native Norwegian speaker to help me practice conversational Norwegian. I'm at A2 level and want to improve my speaking skills. Can offer English lessons or web dev help in return!",
      userId: loginUser.id,
      category: "Language",
      payment: "Skill exchange",
      imageUrl: "/src/app/assets/translating.webp",
      location: "Oslo or Online",
      date: new Date(2025, 11, 20),
    },
    {
      slug: "piano-lessons-wanted",
      title: "Looking for: Piano Teacher for Beginners",
      description: "Complete beginner looking to learn piano. Would love to find someone patient who can teach me the basics. Happy to exchange my web development or design skills!",
      userId: loginUser.id,
      category: "Music",
      payment: "Skill exchange",
      imageUrl: "/src/app/assets/web-design.jpg",
      location: "Oslo",
      date: new Date(2025, 11, 22),
    },
  ]);

  // Create additional users to leave reviews for demo user
  const [reviewer1] = await db
    .insert(users)
    .values({
      name: "Erik Hansen",
      email: "erik.hansen@example.com",
      role: "user",
      passwordHash,
      isActive: true,
    })
    .returning();

  const [reviewer2] = await db
    .insert(users)
    .values({
      name: "Maria Olsen",
      email: "maria.olsen@example.com",
      role: "user",
      passwordHash,
      isActive: true,
    })
    .returning();

  const [reviewer3] = await db
    .insert(users)
    .values({
      name: "Lars Petersen",
      email: "lars.petersen@example.com",
      role: "user",
      passwordHash,
      isActive: true,
    })
    .returning();

  const [reviewer4] = await db
    .insert(users)
    .values({
      name: "Sofie Andersen",
      email: "sofie.andersen@example.com",
      role: "user",
      passwordHash,
      isActive: true,
    })
    .returning();

  const [reviewer5] = await db
    .insert(users)
    .values({
      name: "Thomas Berg",
      email: "thomas.berg@example.com",
      role: "user",
      passwordHash,
      isActive: true,
    })
    .returning();

  // Add reviews for demo user (total: 15 reviews, average ~4.8 rating)
  await db.insert(reviews).values([
    {
      reviewerId: reviewer1.id,
      receiverId: loginUser.id,
      rating: 5,
      reviewText: "Excellent web development teacher! Very patient and explains concepts clearly. Learned so much in just a few sessions.",
    },
    {
      reviewerId: reviewer2.id,
      receiverId: loginUser.id,
      rating: 5,
      reviewText: "Amazing UI/UX design consultation. Really helped me improve my app's interface. Highly recommended!",
    },
    {
      reviewerId: reviewer3.id,
      receiverId: loginUser.id,
      rating: 4,
      reviewText: "Great tech support! Fixed my computer issues quickly and explained everything well.",
    },
    {
      reviewerId: reviewer4.id,
      receiverId: loginUser.id,
      rating: 5,
      reviewText: "Best React tutor I've worked with. Very knowledgeable and makes learning fun!",
    },
    {
      reviewerId: reviewer5.id,
      receiverId: loginUser.id,
      rating: 5,
      reviewText: "Professional and reliable. The lawn looks perfect after his work!",
    },
    {
      reviewerId: reviewer1.id,
      receiverId: loginUser.id,
      rating: 5,
      reviewText: "Translated my documents perfectly. Very accurate and delivered on time.",
    },
    {
      reviewerId: reviewer2.id,
      receiverId: loginUser.id,
      rating: 4,
      reviewText: "Good TypeScript lessons. Would have liked more advanced topics but overall very helpful.",
    },
    {
      reviewerId: reviewer3.id,
      receiverId: loginUser.id,
      rating: 5,
      reviewText: "Fantastic design work! Really understands modern UI principles.",
    },
    {
      reviewerId: reviewer4.id,
      receiverId: loginUser.id,
      rating: 5,
      reviewText: "Very helpful with my Node.js project. Solved issues I was stuck on for weeks!",
    },
    {
      reviewerId: reviewer5.id,
      receiverId: loginUser.id,
      rating: 5,
      reviewText: "Great experience learning React from someone who really knows their stuff.",
    },
    {
      reviewerId: reviewer1.id,
      receiverId: loginUser.id,
      rating: 4,
      reviewText: "Good tech support service. Quick response and fixed my issue.",
    },
    {
      reviewerId: reviewer2.id,
      receiverId: loginUser.id,
      rating: 5,
      reviewText: "Excellent garden maintenance. Very thorough and professional!",
    },
    {
      reviewerId: reviewer3.id,
      receiverId: loginUser.id,
      rating: 5,
      reviewText: "Amazing PostgreSQL tutoring session. Cleared up so many concepts for me.",
    },
    {
      reviewerId: reviewer4.id,
      receiverId: loginUser.id,
      rating: 5,
      reviewText: "Very patient and knowledgeable. Helped me build my first REST API!",
    },
    {
      reviewerId: reviewer5.id,
      receiverId: loginUser.id,
      rating: 5,
      reviewText: "Great UI/UX insights. My app looks so much better now!",
    },
  ]);

  console.log("🌱 Finished seeding");
  console.log("👉 Login user:");
  console.log(`   email:    ${loginEmail}`);
  console.log(`   password: ${plainPassword}`);
});
