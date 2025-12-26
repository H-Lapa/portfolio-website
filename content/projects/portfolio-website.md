---
title: "Portfolio Website"
description: "Modern portfolio built with Next.js, TypeScript, and Tailwind CSS."
image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
tags: ["Next.js", "TypeScript", "Tailwind"]
githubUrl: "https://github.com/hugomlapa/portfolio"
blogPostSlug: "building-portfolio-nextjs"
---

# Portfolio Website

A modern, performant portfolio website built with Next.js 14, featuring a custom content management system for blog posts and project showcases.

## Overview

This portfolio website serves as a central hub for sharing my technical writing, showcasing projects, and demonstrating my skills in modern web development and platform engineering.

## Tech Stack

### Frontend Framework
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **React Server Components** for optimal performance

### Styling & UI
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for accessible component primitives
- **Lucide React** for consistent iconography
- **Custom theme system** with dark mode support

### Content Management
- **Markdown** for blog posts and projects
- **Gray Matter** for frontmatter parsing
- **Custom reading time calculator**
- **Syntax highlighting** for code blocks

## Key Features

### 1. Dynamic Content System

Blog posts and projects are managed through Markdown files with frontmatter:

```markdown
---
title: "My Blog Post"
date: "2024-01-15"
category: "Guide"
description: "A comprehensive guide"
githubUrl: "https://github.com/user/repo"
liveUrl: "https://demo.example.com"
---
```

### 2. Project Showcase Cards

Interactive project cards with:
- Click-to-open live demos
- GitHub repository links
- Related blog post navigation
- Hover animations and effects

### 3. Blog System

Full-featured blog with:
- Table of contents generation
- Reading progress bar
- Reading time estimation
- Category filtering
- Responsive design

### 4. Developer Experience

Optimized development workflow:
- Hot module replacement
- TypeScript strict mode
- ESLint configuration
- Component-based architecture

## Architecture Decisions

### Static Site Generation

Using Next.js static export for:
- **Maximum performance** - Pre-rendered pages
- **SEO optimization** - All content indexable
- **Simple hosting** - Deploy anywhere (Firebase, Vercel, etc.)
- **Cost efficiency** - No server costs

### Content Structure

```
content/
├── blog/
│   ├── service-mesh.md
│   └── terraform-state.md
└── projects/
    ├── gitops-pipeline.md
    └── automated-landing-zones.md
```

### Component Design

Reusable components following atomic design:

```tsx
// Example: ProjectCard component
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div onClick={handleCardClick}>
      <Image src={project.image} />
      <h3>{project.title}</h3>
      <div>
        {project.githubUrl && <GithubButton />}
        {project.blogPostSlug && <BlogButton />}
      </div>
    </div>
  );
}
```

## Performance Optimizations

### Image Optimization
- Next.js Image component for automatic optimization
- Lazy loading with placeholder blur
- Responsive image sizing

### Code Splitting
- Automatic route-based splitting
- Dynamic imports for heavy components
- Tree shaking for unused code

### Custom Scrollbar
Minimal, theme-aware scrollbar styling:

```css
*::-webkit-scrollbar {
  width: 8px;
}

*::-webkit-scrollbar-thumb {
  background: oklch(0.4 0 0);
  border-radius: 4px;
}
```

## Deployment

### Firebase Hosting

Deployed using Firebase Hosting with GitHub Actions:

```yaml
name: Deploy to Firebase
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm ci && npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
```

### Build Configuration

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "export": "next export"
  }
}
```

## Features Implemented

✅ Responsive navigation with scroll behavior
✅ Dark mode with theme persistence
✅ Reading progress indicator
✅ Table of contents generation
✅ Breadcrumb navigation
✅ Project cards with dynamic links
✅ Blog post search and filtering
✅ Custom 404 pages
✅ SEO meta tags
✅ Open Graph images

## Lessons Learned

### 1. Server vs Client Components

Understanding when to use each:
- Server components for static content
- Client components for interactivity
- Avoid hydration mismatches

### 2. Static Export Limitations

With `output: 'export'`, you can't use:
- Dynamic API routes
- Server-side rendering
- Middleware

But you gain simplicity and performance.

### 3. Content Management

Markdown with frontmatter is powerful:
- No database needed
- Git-based versioning
- Easy content migration
- Developer-friendly

## Future Enhancements

- [ ] Blog post search functionality
- [ ] Tag-based filtering
- [ ] RSS feed generation
- [ ] View count tracking
- [ ] Comments system
- [ ] Newsletter integration
- [ ] Analytics dashboard

## Technologies Used

- **Next.js 14**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Firebase**: Hosting
- **GitHub Actions**: CI/CD
- **Markdown**: Content management
- **Lucide React**: Icons

## Conclusion

Building this portfolio was an excellent opportunity to work with modern web technologies and create a performant, maintainable platform for sharing my work. The combination of Next.js, TypeScript, and Tailwind CSS provides an excellent developer experience while delivering a fast, accessible website.

The project serves as both a showcase of my skills and a practical demonstration of modern web development best practices.
