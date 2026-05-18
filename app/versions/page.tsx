import { getVersions, getMetafieldValue } from '@/lib/cosmic';
import MarkdownContent from '@/components/MarkdownContent';
import { GitBranch, Calendar } from 'lucide-react';

const statusColors: Record<string, string> = {
  'Current': 'bg-green-100 text-green-800 border-green-200',
  'Beta': 'bg-blue-100 text-blue-800 border-blue-200',
  'Deprecated': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Legacy': 'bg-gray-100 text-gray-800 border-gray-200',
};

export default async function VersionsPage() {
  const versions = await getVersions();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Versions</h1>
        <p className="text-lg text-gray-600">Release history and version information</p>
      </div>

      {versions.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <p className="text-gray-600">No versions available yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {versions.map((version) => {
            const versionNumber = getMetafieldValue(version.metadata?.version_number);
            const releaseDate = getMetafieldValue(version.metadata?.release_date);
            const status = getMetafieldValue(version.metadata?.status);
            const releaseNotes = getMetafieldValue(version.metadata?.release_notes);

            const formattedDate = releaseDate
              ? new Date(releaseDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : '';

            const statusClass = statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-200';

            return (
              <div key={version.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-5 h-5 text-primary-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      v{versionNumber || version.title}
                    </h2>
                  </div>
                  {status && (
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusClass}`}>
                      {status}
                    </span>
                  )}
                  {formattedDate && (
                    <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {formattedDate}
                    </span>
                  )}
                </div>
                {releaseNotes && (
                  <div className="text-gray-700">
                    <MarkdownContent content={releaseNotes} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}