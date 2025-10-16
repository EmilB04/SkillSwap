export interface Job {
  id: number;
  title: string;
  description: string;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface JobCardProps {
  job?: Partial<Job>;
  category?: string;
  payment?: string;
  imageUrl?: string;
  onRequestJob?: (id: number) => void;
}

// Default job data for fallback
export const defaultJob: Partial<Job> = {
  id: 1,
  title: "Mowing lawn",
  description: "Need help with lawn mowing and basic yard maintenance",
  userId: 1,
};

// Default props for JobCard
export const defaultJobCardProps = {
  job: defaultJob,
  category: "Gardening",
  payment: "$20",
  imageUrl: "./src/app/assets/gardening.jpeg",
};
