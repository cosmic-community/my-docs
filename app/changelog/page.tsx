import { getChangelogEntries } from '@/lib/cosmic';
import ChangelogItem from '@/components/ChangelogItem';

export default async function ChangelogPage() {
  const entries = await getChangelogEntries();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Changelog</h1>
        <p className="text-lg text-gray-600">All notable changes, updates, and improvements</p>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <p className="text-gray-600">No changelog entries yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((entry) => (
            <ChangelogItem key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}