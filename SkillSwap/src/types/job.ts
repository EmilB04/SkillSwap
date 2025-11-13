export interface Job {
  id: number;
  slug: string;
  title: string;
  description: string;
  userId: number;
  category: string;
  payment: string;
  imageUrl: string;
  date: Date;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface JobCardProps {
  job?: Partial<Job>;
  slug?: string;
  category?: string;
  payment?: string;
  imageUrl?: string;
  date?: Date;
  location?: string;
  onRequestJob?: (id: number) => void;
}

// Default job data for fallback
export const defaultJob: Job = {
  id: 1,
  slug: "{category}-{id}",
  title: "Mowing lawn",
  description: "Need help with lawn mowing and basic yard maintenance",
  userId: 1,
  category: "Gardening",
  payment: "$20/hour",
  imageUrl: "/src/app/assets/gardening.jpeg",
  date: new Date(2025, 11, 31), // December 31, 2025
  location: "BRA Veien 8, 1783 Halden"
};

// Default props for JobCard
export const defaultJobCardProps: JobCardProps = {
  job: defaultJob,
  category: defaultJob.category,
  payment: defaultJob.payment,
  imageUrl: defaultJob.imageUrl,
  date: defaultJob.date,
  location: defaultJob.location
};

// Mock job data will be in db in future
export const mockJobs: Job[] = [
  {
    id: 1,
    slug: "gardening-1",
    title: "Lawn Mowing",
    description: "Need help with mowing the lawn",
    payment: "$20/hour",
    category: "Gardening",
    userId: 1,
    imageUrl: "/src/app/assets/gardening.jpeg",
    date: new Date(2025, 9, 17), // October 17, 2025
    location: "BRA Veien 8, 1783 Halden"

  },
  {
    id: 2,
    slug: "language-2",
    title: "Translating",
    description: "Need help with translating documents",
    payment: "$10/hour",
    category: "Language",
    userId: 3,
    imageUrl: "/src/app/assets/translating.webp",
    date: new Date(2025, 9, 18), // October 18, 2025
    location: "BRA Veien 8, 1783 Halden"
  },
  {
    id: 3,
    slug: "development-3",
    title: "Web design",
    description: "Looking for a modern website design",
    payment: "$30/hour",
    category: "Development",
    userId: 3,
    imageUrl: "/src/app/assets/web-design.jpg",
    date: new Date(2025, 9, 20), // October 20, 2025
    location: "BRA Veien 8, 1783 Halden"
  },
  {
    id: 4,
    slug: "tutoring-4",
    title: "Math tutoring",
    description: "Help needed for high school math",
    payment: "Skill swap",
    category: "Tutoring",
    userId: 4,
    imageUrl: "/src/app/assets/math-tutoring.png",
    date: new Date(2025, 11, 12), // December 12, 2025
    location: "BRA Veien 8, 1783 Halden"
  },
  {
    id: 5,
    slug: "cooking-5",
    title: "Cooking lessons",
    description: "Teach me how to cook Italian cuisine",
    payment: "$40/hour",
    category: "Cooking",
    userId: 4,
    imageUrl: "/src/app/assets/cooking-lessons.jpg",
    date: new Date(2025, 10, 15), // November 15, 2025
    location: "BRA Veien 8, 1783 Halden"
  },
  {
    id: 6,
    slug: "design-6",
    title: "Graphic design",
    description: "Create a logo and branding materials",
    payment: "$10/hour",
    category: "Design",
    userId: 5,
    imageUrl: "/src/app/assets/graphic-design.jpg",
    date: new Date(2025, 9, 30), // October 30, 2025
    location: "BRA Veien 8, 1783 Halden"
  },
  {
    id: 7,
    slug: "gardening-7",
    title: "Garden landscaping",
    description: "Help with planting flowers and arranging garden beds",
    payment: "$25/hour",
    category: "Gardening",
    userId: 2,
    imageUrl: "/src/app/assets/gardening.jpeg",
    date: new Date(2025, 11, 5), // December 5, 2025
    location: "BRA Veien 8, 1783 Halden"
  },
  {
    id: 8,
    slug: "language-8",
    title: "Spanish conversation practice",
    description: "Looking for native Spanish speaker for conversation practice",
    payment: "Skill swap",
    category: "Language",
    userId: 6,
    imageUrl: "/src/app/assets/translating.webp",
    date: new Date(2025, 10, 22), // November 22, 2025
    location: "BRA Veien 8, 1783 Halden"
  },
  {
    id: 9,
    slug: "development-9",
    title: "Mobile app development",
    description: "Need developer for iOS/Android app prototype",
    payment: "$50/hour",
    category: "Development",
    userId: 7,
    imageUrl: "/src/app/assets/web-design.jpg",
    date: new Date(2025, 11, 20), // December 20, 2025
    location: "BRA Veien 8, 1783 Halden"
  },
  {
    id: 10,
    slug: "tutoring-10",
    title: "Piano lessons",
    description: "Beginner piano lessons for adults",
    payment: "$35/hour",
    category: "Tutoring",
    userId: 8,
    imageUrl: "/src/app/assets/math-tutoring.png",
    date: new Date(2025, 10, 28), // November 28, 2025
    location: "BRA Veien 8, 1783 Halden"
  },
  {
    id: 11,
    slug: "cooking-11",
    title: "Baking workshop",
    description: "Learn to bake traditional Norwegian pastries",
    payment: "$30/hour",
    category: "Cooking",
    userId: 9,
    imageUrl: "/src/app/assets/cooking-lessons.jpg",
    date: new Date(2025, 11, 1), // December 1, 2025
    location: "BRA Veien 8, 1783 Halden"
  },
  {
    id: 12,
    slug: "design-12",
    title: "UI/UX design",
    description: "Design user interface for mobile application",
    payment: "$45/hour",
    category: "Design",
    userId: 10,
    imageUrl: "/src/app/assets/graphic-design.jpg",
    date: new Date(2025, 11, 8), // December 8, 2025
    location: "BRA Veien 8, 1783 Halden"
  }
]
