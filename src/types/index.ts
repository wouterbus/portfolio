// Shared types for the application
export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  tools: string[];
  link?: string;
  body?: string;
}

