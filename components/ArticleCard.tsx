import Link from 'next/link';
import { Article } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';
import { FileText } from 'lucide-react';

export default function ArticleCard({ article }: { article: Article }) {
  const title = getMetafieldValue(article.metadata?.title) || article.title;
  const sectionName = article.metadata?.section?.metadata?.name 
    ? getMetafieldValue(article.metadata.section.metadata.name)
    : article.metadata?.section?.title;

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all duration-200"
    >
      <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
        <FileText className="w-5 h-5 text-primary-600" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
          {title}
        </h3>
        {sectionName && (
          <p className="text-sm text-gray-500 mt-1">{sectionName}</p>
        )}
      </div>
    </Link>
  );
}