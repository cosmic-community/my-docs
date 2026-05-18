import Link from 'next/link';
import { Section } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';
import { ArrowRight } from 'lucide-react';

export default function SectionCard({ section }: { section: Section }) {
  const name = getMetafieldValue(section.metadata?.name) || section.title;
  const description = getMetafieldValue(section.metadata?.description);
  const icon = getMetafieldValue(section.metadata?.icon) || '📁';

  return (
    <Link
      href={`/sections/${section.slug}`}
      className="group block p-6 bg-white border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-lg transition-all duration-200"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
        {name}
      </h3>
      {description && (
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>
      )}
      <div className="flex items-center text-sm font-medium text-primary-600 group-hover:gap-2 gap-1 transition-all">
        Browse articles
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}