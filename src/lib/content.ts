import { getCollection, getEntry } from 'astro:content';
import type { Activity, Member, Post, Project, Publication } from './types';

async function mapMember(entry: any): Promise<Member> {
  return {
    name: entry.data.name,
    role: entry.data.role || '',
    bio: entry.data.bio || '',
    linkedin: entry.data.linkedin || undefined,
    imageUrl: entry.data.image ? `/meds-ee-uet/images/members/${entry.data.image}` : undefined,
    imageAlt: entry.data.imageAlt || entry.data.name,
  };
}

export async function getMembers(): Promise<Member[]> {
  const members = await getCollection('members');
  const mapped = await Promise.all(members.map(mapMember));
  return mapped.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts');
  const mapped = await Promise.all(posts.map(async (post) => {
    let author;
    if (post.data.author) {
      const authorEntry = await getEntry('members', post.data.author);
      if (authorEntry) author = await mapMember(authorEntry);
    }

    return {
      title: post.data.title,
      slug: post.id,
      publishedAt: post.data.publishedAt,
      bodyText: post.data.excerpt || '',
      entry: post,
      author,
      mainImageUrl: post.data.mainImage ? `/meds-ee-uet/images/posts/${post.data.mainImage}` : undefined,
      mainImageAlt: post.data.mainImageAlt || post.data.title,
    };
  }));

  return mapped.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await getEntry('posts', slug);
  if (!post) return null;

  let author;
  if (post.data.author) {
    const authorEntry = await getEntry('members', post.data.author);
    if (authorEntry) author = await mapMember(authorEntry);
  }

  return {
    title: post.data.title,
    slug: post.id,
    publishedAt: post.data.publishedAt,
    bodyText: post.data.excerpt || '',
    entry: post,
    author,
    mainImageUrl: post.data.mainImage ? `/meds-ee-uet/images/posts/${post.data.mainImage}` : undefined,
    mainImageAlt: post.data.mainImageAlt || post.data.title,
  };
}

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  const mapped = projects.map((project) => ({
    title: project.data.title,
    slug: project.id,
    status: project.data.status as 'Active' | 'Completed',
    abstract: project.data.abstract || '',
    techStack: project.data.techStack || [],
    bodyText: project.data.abstract || '',
    entry: project,
    heroImageUrl: project.data.heroImage ? `/meds-ee-uet/images/projects/${project.data.heroImage}` : undefined,
    heroImageAlt: project.data.heroImageAlt || project.data.title,
    featuredOrder: project.data.featuredOrder,
  }));

  return mapped.sort((a, b) => {
    if (a.featuredOrder !== undefined && b.featuredOrder !== undefined && a.featuredOrder !== null && b.featuredOrder !== null) {
      return a.featuredOrder - b.featuredOrder;
    }
    return 0;
  });
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const project = await getEntry('projects', slug);
  if (!project) return null;

  return {
    title: project.data.title,
    slug: project.id,
    status: project.data.status as 'Active' | 'Completed',
    abstract: project.data.abstract || '',
    techStack: project.data.techStack || [],
    bodyText: project.data.abstract || '',
    entry: project,
    heroImageUrl: project.data.heroImage ? `/meds-ee-uet/images/projects/${project.data.heroImage}` : undefined,
    heroImageAlt: project.data.heroImageAlt || project.data.title,
  };
}

export async function getPublications(): Promise<Publication[]> {
  const pubs = await getCollection('publications');
  const mapped = pubs.map(pub => ({
    title: pub.data.title,
    authors: pub.data.authors || '',
    publishedDate: pub.data.publishedDate ? new Date(pub.data.publishedDate).toISOString() : '',
    venue: pub.data.venue || '',
    link: pub.data.link || '',
  }));

  return mapped.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
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
