---
title: "Building a Modern Portfolio with Next.js 14"
date: "2024-12-26"
category: "Guide"
description: "How I built my portfolio website using Next.js 14, TypeScript, and Tailwind CSS with a custom Markdown-based CMS."
githubUrl: "https://github.com/hugomlapa/portfolio"
liveUrl: "https://hugomlapa.com"
---

# Building a Modern Portfolio with Next.js 14

After years of using various portfolio platforms, I decided to build my own from scratch. Here's the journey of creating a modern, performant portfolio website using Next.js 14, TypeScript, and Tailwind CSS.

## Why Build Your Own Portfolio?

While platforms like WordPress, Wix, or even GitHub Pages are great, building your own portfolio offers:

1. **Complete Control** - Every aspect is customizable
2. **Learning Opportunity** - Hands-on experience with modern tech
3. **Performance** - Optimized exactly how you want
4. **Showcase Skills** - The portfolio itself demonstrates your abilities

## Technology Choices

### Next.js 14 - The Foundation

I chose Next.js 14 for several reasons:

- **App Router** - Modern routing with Server Components
- **Static Export** - No server needed, deploy anywhere
- **Image Optimization** - Automatic responsive images
- **TypeScript Support** - First-class type safety

```tsx
// Example: Server Component for blog posts
export default async function BlogPage() {
  const posts = getBlogPosts(); // Server-side data fetching

  return (
    <div>
      {posts.map(post => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
```

### Markdown for Content

Instead of a database, I went with Markdown files:

**Pros:**
- Git-based version control
- Easy to write and edit
- Portable and future-proof
- No database maintenance

**Example structure:**

```markdown
---
title: "My Blog Post"
date: "2024-01-15"
category: "Guide"
---

# Content goes here

Write in **Markdown** with ease.
```

### Tailwind CSS for Styling

Tailwind's utility-first approach was perfect:

```tsx
<div className="max-w-5xl mx-auto px-4 py-6">
  <h1 className="text-4xl font-bold tracking-tight mb-3">
    Projects
  </h1>
</div>
```

Benefits:
- Fast development
- No naming conflicts
- Responsive design made easy
- Consistent design system

## Key Implementation Details

### Content Loading System

I created a custom content loader using `gray-matter`:

```typescript
export function getBlogPosts(): BlogPost[] {
  const blogDirectory = path.join(process.cwd(), 'content/blog');
  const fileNames = fs.readdirSync(blogDirectory);

  const posts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: fileName.replace(/\.md$/, ''),
        title: data.title,
        content,
        // ... more fields
      };
    });

  return posts;
}
```

### Project Cards with Multiple Actions

One interesting challenge was creating project cards that:
- Open the live project when clicked
- Have a GitHub button
- Have a blog post button

Solution: Event propagation control

```tsx
const handleButtonClick = (e: React.MouseEvent, url: string) => {
  e.stopPropagation(); // Prevent card click
  window.open(url, '_blank');
};

return (
  <div onClick={openLiveProject}>
    <button onClick={(e) => handleButtonClick(e, githubUrl)}>
      GitHub
    </button>
  </div>
);
```

### Dark Mode Implementation

Using `next-themes` for persistent dark mode:

```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="dark"
  enableSystem={false}
>
  {children}
</ThemeProvider>
```

CSS variables make theming easy:

```css
:root {
  --background: oklch(0.97 0 0);
  --foreground: oklch(0.1 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
}
```

## Performance Optimizations

### Static Site Generation

Using `output: 'export'` for maximum performance:

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

### Image Optimization

Even with static export, Next.js Image component helps:

```tsx
<Image
  src={project.image}
  alt={project.title}
  width={400}
  height={300}
  className="w-full h-full object-cover"
/>
```

### Reading Time Calculation

Custom utility for better UX:

```typescript
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
```

## Deployment with Firebase

Setting up Firebase Hosting:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize
firebase init hosting

# Deploy
firebase deploy --only hosting
```

GitHub Actions for automatic deployment:

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
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: your-project-id
```

## Challenges & Solutions

### Challenge 1: Hydration Errors

**Problem:** React hydration mismatches between server and client

**Solution:** Add `suppressHydrationWarning` to elements that differ:

```tsx
<body suppressHydrationWarning>
  {children}
</body>
```

### Challenge 2: Nested Anchor Tags

**Problem:** Invalid HTML with nested `<a>` tags

**Solution:** Use buttons with onClick for nested actions:

```tsx
// Instead of nested <a> tags
<button onClick={(e) => handleButtonClick(e, url)}>
  Link
</button>
```

### Challenge 3: Table of Contents Generation

**Problem:** Need to extract headings from Markdown

**Solution:** Parse markdown content:

```typescript
export function extractHeadings(content: string) {
  const headingRegex = /^#{2,3}\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      text: match[1],
      level: match[0].match(/^#+/)[0].length,
    });
  }

  return headings;
}
```

## Lessons Learned

### 1. Start Simple

I began with basic pages and added features incrementally:
1. Basic routing and pages
2. Markdown content loading
3. Styling with Tailwind
4. Interactive components
5. Advanced features (TOC, progress bar, etc.)

### 2. Type Everything

TypeScript caught many bugs early:

```typescript
export interface Project {
  slug: string;
  title: string;
  githubUrl?: string;
  liveUrl?: string;
  // ... more fields
}
```

### 3. Component Reusability

Creating reusable components saved time:
- `ProjectCard` - Used on home and projects pages
- `Breadcrumb` - Used on all content pages
- `TableOfContents` - Used on blog and project pages

### 4. Focus on Content

The best portfolio is one you actually maintain. Make it easy to add content:
- Simple Markdown files
- Clear folder structure
- No complex CMS
- Git-based workflow

## Results

The final portfolio is:

✅ **Fast** - Static generation means instant loads
✅ **Maintainable** - Clear code structure
✅ **Scalable** - Easy to add new content
✅ **Professional** - Modern design and UX
✅ **Cost-effective** - Free hosting on Firebase

## What's Next?

Future improvements I'm considering:

1. **Search Functionality** - Full-text search for blog posts
2. **Analytics** - Understanding visitor patterns
3. **RSS Feed** - For blog subscribers
4. **Newsletter** - Email updates for new posts
5. **Comments** - Community engagement

## Conclusion

Building your own portfolio with modern tools like Next.js 14 is more accessible than ever. You get full control, learn valuable skills, and create something uniquely yours.

The combination of Next.js, TypeScript, and Tailwind CSS provides an excellent developer experience while delivering a fast, accessible website that you can be proud of.

**Key Takeaways:**
- Choose technologies you want to learn
- Start simple and iterate
- Focus on content over complexity
- Deploy early and often
- Make it easy to maintain

If you're thinking about building your own portfolio, I highly encourage it. The process is as valuable as the result.

Check out the [source code on GitHub](https://github.com/hugomlapa/portfolio) to see the full implementation!
