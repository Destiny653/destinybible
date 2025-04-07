import React, { useState } from 'react'
import { useSearch, type SearchParams } from '../services/bibleApi'
import { MagnifyingGlassIcon, BookOpenIcon } from '@heroicons/react/24/outline'

interface SearchVerse {
  reference: string
  text: string
}

interface BibleSearchProps {
  bibleId: string
}

const defaultSearchParams: SearchParams = {
  query: '',
  limit: 20,
  offset: 0,
  sort: 'relevance'
}

const BibleSearch: React.FC<BibleSearchProps> = ({ bibleId }) => {
  const [query, setQuery] = useState('')
  const { results, loading, error, searchBible } = useSearch(bibleId, defaultSearchParams)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      searchBible({
        ...defaultSearchParams,
        query: query.trim()
      })
    }
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <MagnifyingGlassIcon className="h-12 w-12 text-amber-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-amber-900 mb-2">Search the Bible</h1>
        <p className="text-amber-700 max-w-2xl mx-auto">
          Search through verses to find exactly what you're looking for in God's word.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your search query..."
              className="w-full px-4 py-3 pl-12 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white/80 backdrop-blur-sm text-amber-900 placeholder-amber-400"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-400" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-md hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-200"
            >
              Search
            </button>
          </div>
        </form>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-red-800">Error</h3>
            <p className="mt-2 text-red-700">{error}</p>
          </div>
        )}

        {results && results.verses && results.verses.length > 0 ? (
          <div className="space-y-6">
            {results.verses.map((verse: SearchVerse, index: number) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl border border-amber-200 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <BookOpenIcon className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900 mb-2 group-hover:text-amber-700 transition-colors">
                      {verse.reference}
                    </h3>
                    <p className="text-amber-800 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: verse.text }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : query && !loading ? (
          <div className="text-center py-12">
            <div className="bg-amber-50 rounded-lg p-8 inline-block">
              <MagnifyingGlassIcon className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-amber-900 mb-2">No Results Found</h3>
              <p className="text-amber-700">
                Try adjusting your search terms or try a different query.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default BibleSearch
