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
