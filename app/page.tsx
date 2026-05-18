import Link from 'next/link';
import { getSections, getArticles, getChangelogEntries } from '@/lib/cosmic';
import SectionCard from '@/components/SectionCard';
import ArticleCard from '@/components/ArticleCard';
import { Book, FileText, GitBranch, ArrowRight, Sparkles } from 'lucide-react';

export default async function HomePage() {
  const [sections, articles, changelog] = await Promise.all([
    getSections(),
    getArticles(),
    getChangelogEntries(),
  ]);

  const recentArticles = articles.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50 border-b border-gray-200">
        <div className="absolute inset-0 bg-grid-gray-100 [mask-image:linear-gradient(0deg,white,transparent)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Documentation Platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                build & ship
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Comprehensive guides, API references, and code samples to help you get started quickly and build with confidence.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/sections"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-sm transition-colors"
              >
                Browse Documentation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/changelog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 hover:border-gray-400 text-gray-900 font-medium rounded-lg shadow-sm transition-colors"
              >
                View Changelog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-200">
            <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
              <Book className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{sections.length}</div>
              <div className="text-sm text-gray-600">Sections</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-200">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{articles.length}</div>
              <div className="text-sm text-gray-600">Articles</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-200">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{changelog.length}</div>
              <div className="text-sm text-gray-600">Changelog Entries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      {sections.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Browse by Section</h2>
              <p className="text-gray-600">Explore documentation organized by topic</p>
            </div>
            <Link href="/sections" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700">
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((section) => (
              <SectionCard key={section.id} section={section} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Articles */}
      {recentArticles.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Articles</h2>
                <p className="text-gray-600">Fresh documentation to get you up to speed</p>
              </div>
              <Link href="/articles" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700">
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recentArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}