'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeSample } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

export default function CodeBlock({ sample }: { sample: CodeSample }) {
  const language = getMetafieldValue(sample.language) || 'javascript';
  const code = getMetafieldValue(sample.code);
  const title = getMetafieldValue(sample.title);
  const description = getMetafieldValue(sample.description);

  if (!code) return null;

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      {(title || language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
          <div>
            {title && <span className="text-sm font-medium text-gray-900">{title}</span>}
          </div>
          <span className="text-xs font-mono text-gray-500 uppercase">{language}</span>
        </div>
      )}
      {description && (
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
          {description}
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{ margin: 0, padding: '1rem', fontSize: '0.875rem' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}