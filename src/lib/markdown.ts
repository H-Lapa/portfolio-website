import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { calculateReadingTime } from './reading-time';

const contentDirectory = path.join(process.cwd(), 'content');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  content: string;
  readingTime: number;
  lastUpdated?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  content: string;
  readingTime: number;
  date?: string;
  lastUpdated?: string;
}

export function getBlogPosts(): BlogPost[] {
  const blogDirectory = path.join(contentDirectory, 'blog');

  // Check if directory exists
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        description: data.description || '',
        category: data.category || '',
        content,
        readingTime: calculateReadingTime(content),
        lastUpdated: data.lastUpdated,
      };
    });

  // Sort posts by date (newest first)
  return posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

export function getBlogPost(slug: string): BlogPost | null {
  const blogDirectory = path.join(contentDirectory, 'blog');
  const fullPath = path.join(blogDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    description: data.description || '',
    category: data.category || '',
    content,
    readingTime: calculateReadingTime(content),
    lastUpdated: data.lastUpdated,
  };
}

export function getProjects(): Project[] {
  const projectsDirectory = path.join(contentDirectory, 'projects');

  // Check if directory exists
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const projects = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        image: data.image || '',
        tags: data.tags || [],
        content,
        readingTime: calculateReadingTime(content),
        date: data.date,
        lastUpdated: data.lastUpdated,
      };
    });

  return projects;
}

export function getProject(slug: string): Project | null {
  const projectsDirectory = path.join(contentDirectory, 'projects');
  const fullPath = path.join(projectsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    image: data.image || '',
    tags: data.tags || [],
    content,
    readingTime: calculateReadingTime(content),
    date: data.date,
    lastUpdated: data.lastUpdated,
  };
}
