import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import { ReactNode } from 'react';

interface MarkdownContentProps {
  content: string;
}

// Helper function to extract plain text from React children
function getTextContent(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) {
    return children.map(getTextContent).join('');
  }
  if (children && typeof children === 'object' && 'props' in children) {
    const element = children as { props: { children?: ReactNode } };
    return getTextContent(element.props.children);
  }
  return '';
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const components: Components = {
    h1: ({ children }) => {
      const text = getTextContent(children);
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      return <h1 id={id}>{children}</h1>;
    },
    h2: ({ children }) => {
      const text = getTextContent(children);
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      return <h2 id={id}>{children}</h2>;
    },
    h3: ({ children }) => {
      const text = getTextContent(children);
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      return <h3 id={id}>{children}</h3>;
    },
    h4: ({ children }) => {
      const text = getTextContent(children);
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      return <h4 id={id}>{children}</h4>;
    },
    h5: ({ children }) => {
      const text = getTextContent(children);
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      return <h5 id={id}>{children}</h5>;
    },
    h6: ({ children }) => {
      const text = getTextContent(children);
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      return <h6 id={id}>{children}</h6>;
    },
  };

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
