import { ChangelogEntry } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

const typeColors: Record<string, string> = {
  'Feature': 'bg-green-100 text-green-800 border-green-200',
  'Improvement': 'bg-blue-100 text-blue-800 border-blue-200',
  'Bug Fix': 'bg-red-100 text-red-800 border-red-200',
  'Breaking Change': 'bg-orange-100 text-orange-800 border-orange-200',
  'Deprecation': 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

export default function ChangelogItem({ entry }: { entry: ChangelogEntry }) {
  const title = getMetafieldValue(entry.metadata?.title) || entry.title;
  const date = getMetafieldValue(entry.metadata?.date);
  const changeType = getMetafieldValue(entry.metadata?.change_type);
  const description = getMetafieldValue(entry.metadata?.description);
  const versionNumber = entry.metadata?.version?.metadata?.version_number
    ? getMetafieldValue(entry.metadata.version.metadata.version_number)
    : '';

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const typeClass = typeColors[changeType] || 'bg-gray-100 text-gray-800 border-gray-200';

  return (
    <div className="border-l-4 border-primary-500 pl-6 py-4 relative">
      <div className="absolute -left-2 top-6 w-3 h-3 rounded-full bg-primary-500 ring-4 ring-white"></div>
      <div className="flex flex-wrap items-center gap-3 mb-2">
        {changeType && (
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${typeClass}`}>
            {changeType}
          </span>
        )}
        {versionNumber && (
          <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
            v{versionNumber}
          </span>
        )}
        {formattedDate && (
          <span className="text-sm text-gray-500">{formattedDate}</span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 leading-relaxed">{description}</p>
      )}
    </div>
  );
}