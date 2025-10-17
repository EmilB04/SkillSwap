export interface Job {
  id: number;
  title: string;
  description: string;
  userId: number;
  category: string;
  payment: string;
  imageUrl: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface JobCardProps {
  job?: Partial<Job>;
  category?: string;
  payment?: string;
  imageUrl?: string;
  date?: Date;
  onRequestJob?: (id: number) => void;
}

// Default job data for fallback
export const defaultJob: Job = {
  id: 1,
  title: "Mowing lawn",
  description: "Need help with lawn mowing and basic yard maintenance",
  userId: 1,
  category: "Gardening",
  payment: "$20/hour",
  imageUrl: "./src/app/assets/gardening.jpeg",
  date: new Date(2025, 11, 31) // December 31, 2025
};

// Default props for JobCard
export const defaultJobCardProps: JobCardProps = {
  job: defaultJob,
  category: defaultJob.category,
  payment: defaultJob.payment,
  imageUrl: defaultJob.imageUrl,
  date: defaultJob.date
};

// Mock job data will be in db in future
export const mockJobs: Job[] = [
  {
    id: 1,
    title: "Lawn Mowing",
    description: "Need help with mowing the lawn",
    payment: "$20/hour",
    category: "Gardening",
    userId: 1,
    imageUrl: "./src/app/assets/gardening.jpeg",
    date: new Date(2025, 9, 17) // October 17, 2025
  },
  {
    id: 2,
    title: "Translating",
    description: "Need help with translating documents",
    payment: "$10/hour",
    category: "Language",
    userId: 3,
    imageUrl: "./src/app/assets/translating.webp",
    date: new Date(2025, 9, 18) // October 18, 2025
  },
  {
    id: 3,
    title: "Web design",
    description: "Looking for a modern website design",
    payment: "$30/hour",
    category: "Development",
    userId: 3,
    imageUrl: "./src/app/assets/web-design.jpg",
    date: new Date(2025, 9, 20) // October 20, 2025
  },
  {
    id: 4,
    title: "Math tutoring",
    description: "Help needed for high school math",
    payment: "Skill swap",
    category: "Tutoring",
    userId: 4,
    imageUrl: "./src/app/assets/math-tutoring.png",
    date: new Date(2025, 11, 12) // December 12, 2025
  },
  {
    id: 5,
    title: "Cooking lessons",
    description: "Teach me how to cook Italian cuisine",
    payment: "$40/hour",
    category: "Cooking",
    userId: 4,
    imageUrl: "./src/app/assets/cooking-lessons.jpg",
    date: new Date(2025, 10, 15) // November 15, 2025
  },
  {
    id: 6,
    title: "Graphic design",
    description: "Create a logo and branding materials",
    payment: "$10/hour",
    category: "Design",
    userId: 5,
    imageUrl: "./src/app/assets/graphic-design.jpg",
    date: new Date(2025, 9, 30) // October 30, 2025
  }
]
