import { getCollection, getEntry } from 'astro:content';
import type { Activity, Member, Post, Project, Publication } from './types';

async function mapMember(entry: any): Promise<Member> {
  return {
    name: entry.data.name,
    role: entry.data.role || '',
    category: entry.data.category || 'trainee',
    bio: entry.data.bio || '',
    linkedin: entry.data.linkedin || undefined,
    email: entry.data.email || undefined,
    institution: entry.data.institution || undefined,
    graduationYear: entry.data.graduationYear || undefined,
    degree: entry.data.degree || undefined,
    imageUrl: entry.data.image ? `/meds-ee-uet/images/members/${entry.data.image}` : undefined,
    imageAlt: entry.data.imageAlt || entry.data.name,
    sortOrder: entry.data.sortOrder ?? 999,
  };
}

async function findMember(authorKey: string): Promise<Member | undefined> {
  if (!authorKey) return undefined;
  const allMembers = await getCollection('members');
  const slug = authorKey.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  const match = allMembers.find(
    m => m.id === authorKey || m.id === slug || m.data.name.toLowerCase() === authorKey.toLowerCase()
  );

  if (match) return mapMember(match);
  return undefined;
}

export async function getMembers(): Promise<Member[]> {
  const members = await getCollection('members');
  const mapped = await Promise.all(members.map(mapMember));
  return mapped.sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
}

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts');
  const mapped = await Promise.all(posts.map(async (post) => {
    const author = post.data.author ? await findMember(post.data.author) : undefined;

    return {
      title: post.data.title,
      slug: post.id,
      publishedAt: post.data.publishedAt,
      bodyText: post.data.excerpt || '',
      entry: post,
      author,
      rawAuthor: post.data.author || undefined,
      mainImageUrl: post.data.mainImage ? `/meds-ee-uet/images/posts/${post.data.mainImage}` : undefined,
      mainImageAlt: post.data.mainImageAlt || post.data.title,
    };
  }));

  return mapped.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await getEntry('posts', slug);
  if (!post) return null;

  const author = post.data.author ? await findMember(post.data.author) : undefined;

  return {
    title: post.data.title,
    slug: post.id,
    publishedAt: post.data.publishedAt,
    bodyText: post.data.excerpt || '',
    entry: post,
    author,
    rawAuthor: post.data.author || undefined,
    mainImageUrl: post.data.mainImage ? `/meds-ee-uet/images/posts/${post.data.mainImage}` : undefined,
    mainImageAlt: post.data.mainImageAlt || post.data.title,
  };
}

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  const mapped = projects.map((project) => ({
    title: project.data.title,
    slug: project.id,
    status: (project.data.status || 'Completed') as 'Active' | 'Completed' | 'In Progress',
    members: project.data.members || undefined,
    advisor: project.data.advisor || undefined,
    link: project.data.link || 'https://github.com/meds-uet',
    abstract: project.data.abstract || '',
    techStack: project.data.techStack || [],
    bodyText: project.data.abstract || '',
    entry: project,
    heroImageUrl: project.data.heroImage ? `/meds-ee-uet/images/projects/${project.data.heroImage}` : undefined,
    heroImageAlt: project.data.heroImageAlt || project.data.title,
    sortOrder: project.data.sortOrder ?? 999,
  }));

  return mapped.sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const project = await getEntry('projects', slug);
  if (!project) return null;

  return {
    title: project.data.title,
    slug: project.id,
    status: (project.data.status || 'Completed') as 'Active' | 'Completed' | 'In Progress',
    members: project.data.members || undefined,
    advisor: project.data.advisor || undefined,
    link: project.data.link || 'https://github.com/meds-uet',
    abstract: project.data.abstract || '',
    techStack: project.data.techStack || [],
    bodyText: project.data.abstract || '',
    entry: project,
    heroImageUrl: project.data.heroImage ? `/meds-ee-uet/images/projects/${project.data.heroImage}` : undefined,
    heroImageAlt: project.data.heroImageAlt || project.data.title,
    sortOrder: project.data.sortOrder ?? 999,
  };
}

export async function getPublications(): Promise<Publication[]> {
  const pubs = await getCollection('publications');
  const mapped = pubs.map(pub => ({
    title: pub.data.title,
    slug: pub.id,
    authors: pub.data.authors || '',
    year: pub.data.year || (pub.data.publishedDate ? new Date(pub.data.publishedDate).getFullYear().toString() : ''),
    publishedDate: pub.data.publishedDate ? new Date(pub.data.publishedDate).toISOString() : undefined,
    venue: pub.data.venue || '',
    link: pub.data.link || '',
    sortOrder: pub.data.sortOrder ?? 999,
  }));

  return mapped.sort((a, b) => {
    const yearA = parseInt(a.year) || 0;
    const yearB = parseInt(b.year) || 0;
    if (yearB !== yearA) return yearB - yearA;
    return (a.sortOrder ?? 999) - (b.sortOrder ?? 999);
  });
}

export async function getActivities(): Promise<Activity[]> {
  const activities = await getCollection('activities');
  const mapped = activities.map(act => ({
    title: act.data.title,
    date: act.data.date,
    location: act.data.location || '',
    description: act.data.description || '',
    imageGallery: act.data.imageGallery.map((img: any) => ({
      url: img.image ? `/meds-ee-uet/images/activities/${img.image}` : '',
      alt: img.alt || act.data.title,
    })),
  }));

  return mapped.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getHomeSummaries() {
  const [posts, projects, activities] = await Promise.all([getPosts(), getProjects(), getActivities()]);

  return {
    latestPosts: posts.slice(0, 2),
    featuredProjects: projects.slice(0, 2),
    latestActivities: activities.slice(0, 2),
  };
}
