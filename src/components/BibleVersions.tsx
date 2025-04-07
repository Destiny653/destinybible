import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { BookOpenIcon, GlobeAltIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useBibles } from '../services/bibleApi'

const BibleVersions: React.FC = () => {
  const { bibles, loading, error } = useBibles()
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all')

  // Get unique languages from bibles
  const languages = useMemo(() => {
    if (!bibles) return []
    const uniqueLanguages = new Set(bibles.map(bible => bible.language.name))
    return Array.from(uniqueLanguages).sort()
  }, [bibles])

  // Filter bibles by selected language
  const filteredBibles = useMemo(() => {
    if (!bibles) return []
    if (selectedLanguage === 'all') return bibles
    return bibles.filter(bible => bible.language.name === selectedLanguage)
  }, [bibles, selectedLanguage])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
          <p className="mt-4 text-amber-800">Loading Bible versions...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
            <div className="h-12 w-12 text-red-500 mx-auto mb-4">⚠️</div>
            <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Bibles</h3>
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-amber-900 text-center mb-6">
            Select a Bible Version
          </h1>

          {/* Language Filter Dropdown */}
          <div className="relative w-full max-w-xs">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="block w-full pl-4 pr-10 py-2 text-base border-2 border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 rounded-lg bg-white shadow-sm"
            >
              <option value="all">All Languages ({bibles.length} versions)</option>
              {languages.map(language => (
                <option key={language} value={language}>
                  {language} ({bibles.filter(b => b.language.name === language).length})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-amber-700">
              <ChevronDownIcon className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBibles.map((bible) => (
            <Link
              key={bible.id}
              to={`/bible/${bible.id}`}
              className="group bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl border-2 border-amber-200 shadow-md hover:shadow-xl hover:border-amber-300 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-inner">
                    {bible.language.scriptDirection === 'RTL' ? (
                      <GlobeAltIcon className="w-6 h-6 text-white" />
                    ) : (
                      <BookOpenIcon className="w-6 h-6 text-white" />
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-semibold text-amber-900 mb-2 group-hover:text-amber-700 transition-colors truncate">
                    {bible.name}
                  </h2>
                  <p className="text-amber-700 text-sm mb-3 line-clamp-2">
                    {bible.description || `${bible.language.name} Bible`}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      {bible.language.name}
                    </span>
                    {bible.language.scriptDirection === 'RTL' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        RTL
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BibleVersions
