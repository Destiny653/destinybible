import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpenIcon, MagnifyingGlassIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50">
      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url("/bible-cover.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6">
            The Holy Bible
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 mb-12 max-w-3xl mx-auto">
            "Your word is a lamp to my feet and a light to my path."
            <span className="block mt-2 text-lg text-amber-200">— Psalm 119:105</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/versions"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <BookOpenIcon className="w-5 h-5 mr-2" />
              Start Reading
            </Link>
            <Link
              to="/search"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200 border border-white/30"
            >
              <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
              Search Scriptures
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 text-center mb-16">
            Discover the Word of God
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
                <BookOpenIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-4">
                Multiple Translations
              </h3>
              <p className="text-amber-700">
                Access various Bible translations to deepen your understanding of God's word.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
                <MagnifyingGlassIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-4">
                Advanced Search
              </h3>
              <p className="text-amber-700">
                Find specific verses and passages quickly with our powerful search feature.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
                <GlobeAltIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-4">
                Multiple Languages
              </h3>
              <p className="text-amber-700">
                Read the Bible in your preferred language with our diverse collection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
