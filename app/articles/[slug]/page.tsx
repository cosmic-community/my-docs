// app/articles/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, getMetafieldValue } from '@/lib/cosmic';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import { ChevronLeft, Tag } from 'lucide-react';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const title = getMetafieldValue(article.metadata?.title) || article.title;
  const content = getMetafieldValue(article.metadata?.content);
  const codeSamples = article.metadata?.code_samples || [];
  const section = article.metadata?.section;
  const version = article.metadata?.version;

  const sectionName = section?.metadata?.name 
    ? getMetafieldValue(section.metadata.name) 
    : section?.title;
  const versionNumber = version?.metadata?.version_number
    ? getMetafieldValue(version.metadata.version_number)
    : '';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/articles" className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
        <ChevronLeft className="w-4 h-4" />
        All articles
      </Link>

      <article>
        <header className="mb-8 pb-8 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {section && (
              <Link
                href={`/sections/${section.slug}`}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 px-2.5 py-1 rounded-full transition-colors"
              >
                <Tag className="w-3 h-3" />
                {sectionName}
              </Link>
            )}
            {versionNumber && (
              <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                v{versionNumber}
              </span>
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">{title}</h1>
        </header>

        {content && <MarkdownContent content={content} />}

        {codeSamples.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Code Samples</h2>
            {codeSamples.map((sample, index) => (
              <CodeBlock key={index} sample={sample} />
            ))}
          </div>
        )}
      </article>
    </div>
  );
}