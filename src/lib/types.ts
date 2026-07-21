export interface Member {
  name: string;
  role: string;
  category?: 'leadership' | 'mentor' | 'ra' | 'trainee' | 'alumni';
  bio?: string;
  linkedin?: string;
  email?: string;
  institution?: string;
  graduationYear?: string;
  degree?: string;
  imageUrl?: string;
  imageAlt?: string;
  sortOrder?: number;
}

export interface Post {
  title: string;
  slug: string;
  publishedAt: string | Date;
  bodyText?: string;
  entry?: any;
  author?: Member;
  rawAuthor?: string;
  mainImageUrl?: string;
  mainImageAlt?: string;
}

export interface Project {
  title: string;
  slug: string;
  status: 'Active' | 'Completed' | 'In Progress';
  members?: string;
  advisor?: string;
  link?: string;
  abstract?: string;
  techStack?: string[];
  bodyText?: string;
  entry?: any;
  heroImageUrl?: string;
  heroImageAlt?: string;
  sortOrder?: number;
}

export interface Publication {
  title: string;
  slug: string;
  authors?: string;
  year?: string;
  publishedDate?: string;
  venue?: string;
  link?: string;
  sortOrder?: number;
}

export interface Activity {
  title: string;
  date: string | Date;
  location: string;
  description: string;
  imageGallery: Array<{ url: string; alt: string }>;
}
