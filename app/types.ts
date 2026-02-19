export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
  category: string;
  featured: boolean;
  keyFeatures?: string[];
  techStack?: string[];
  challenges?: string;
  learnings?: string;
};
