export type Project = {
  id: string;
  documentId: string;
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
  slug: string;
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
};

export type PostMeta = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
};

export type StrapiResponse<T> = {
  data: T[];
};

export type StrapiProject = {
  id: string;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  image?: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  url: string;
  date: string;
  category: string;
  featured: boolean;
  keyFeatures: string;
  techStack: string;
  challenges: string;
  learnings: string;
};

export type StrapiPostMeta = {
  id: string;
  documentId: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  body: string;
  image?: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
};

export type StrapiExperience = {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string;
};
