// app/sections/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSectionBySlug, getArticlesBySection, getMetafieldValue } from '@/lib/cosmic';
import ArticleCard from '@/components/ArticleCard';
import { ChevronLeft } from 'lucide-react';

export default async function SectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const section = await getSectionBySlug(slug);

  if (!section) {
    notFound();
  }

  const articles = await getArticlesBySection(section.id);
  const name = getMetafieldValue(section.metadata?.name) || section.title;
  const description = getMetafieldValue(section.metadata?.description);
  const icon = getMetafieldValue(section.metadata?.icon) || '📁';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/sections" className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
        <ChevronLeft className="w-4 h-4" />
        All sections
      </Link>

      <div className="mb-10">
        <div className="text-5xl mb-4">{icon}</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{name}</h1>
        {description && (
          <p className="text-lg text-gray-600 max-w-3xl">{description}</p>
        )}
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Articles {articles.length > 0 && <span className="text-gray-500 font-normal">({articles.length})</span>}
        </h2>

        {articles.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <p className="text-gray-600">No articles in this section yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}