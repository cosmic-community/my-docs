import { getSections } from '@/lib/cosmic';
import SectionCard from '@/components/SectionCard';

export default async function SectionsPage() {
  const sections = await getSections();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Documentation Sections</h1>
        <p className="text-lg text-gray-600">Browse all documentation organized by topic</p>
      </div>

      {sections.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <p className="text-gray-600">No sections available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </div>
      )}
    </div>
  );
}