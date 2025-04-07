import { useState, useEffect } from 'react';
import { useBibles, Bible } from '../services/bibleApi';
import '../styles/HomePage.css';

const HomePage = () => {
  const { bibles, loading, error } = useBibles();
  const [featuredBible, setFeaturedBible] = useState<Bible | null>(null);
  const [recentVerses] = useState<string[]>([
    "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life. - John 3:16",
    "I can do all things through him who strengthens me. - Philippians 4:13",
    "The Lord is my shepherd; I shall not want. - Psalm 23:1"
  ]);

  useEffect(() => {
    if (bibles && bibles.length > 0) {
      // Find an English Bible version as featured
      const englishBible = bibles.find(bible => 
        bible.language.id === 'eng' && 
        (bible.name.includes('King James') || bible.name.includes('KJV'))
      );
      
      setFeaturedBible(englishBible || bibles[0]);
    }
  }, [bibles]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-text-light dark:text-text-dark">Loading Bible versions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg text-red-700 max-w-lg mx-auto dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
        <h2 className="text-lg font-semibold mb-2">Error Loading Bible Data</h2>
        <p>{error}</p>
        <p>Please check your API key and try again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <section className="hero-section bg-gradient-to-r from-sky-500 to-sky-400 text-white rounded-lg p-12 mb-12 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold font-cinzel mb-6 text-center">Welcome to Destiny Bible</h1>
          <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl mx-auto">Explore God's Word with our easy-to-use Bible application</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-white text-sky-500 rounded-lg font-medium transition-all hover:-translate-y-1 hover:shadow-lg">
              Start Reading
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-white/10">
              Search Scriptures
            </button>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/images/light-rays.svg')] opacity-20"></div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-sky-500 mb-6 text-center font-cinzel">Featured Bible Version</h2>
        {featuredBible ? (
          <div className="bg-white dark:bg-background-dark p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">{featuredBible.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">{featuredBible.language.name}</p>
            <p className="text-text-light dark:text-text-dark mb-4">{featuredBible.description}</p>
            <button className="text-sky-500 dark:text-sky-400 font-medium hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
              Read Now →
            </button>
          </div>
        ) : (
          <p className="text-center text-text-light dark:text-text-dark">No Bible versions available. Please check your API connection.</p>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-sky-500 mb-6 text-center font-cinzel">Daily Verses</h2>
        <div className="grid gap-6">
          {recentVerses.map((verse, index) => (
            <div key={index} className="bg-white dark:bg-background-dark p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <p className="text-text-light dark:text-text-dark italic relative pl-6">
                <span className="absolute left-0 top-0 text-4xl text-sky-500/20">"</span>
                {verse}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-sky-500 mb-6 text-center font-cinzel">Available Bible Versions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {bibles.slice(0, 6).map(bible => (
            <div key={bible.id} className="bg-white dark:bg-background-dark p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">{bible.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{bible.language.name}</p>
              <button className="text-sky-500 dark:text-sky-400 font-medium hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                Select →
              </button>
            </div>
          ))}
        </div>
        {bibles.length > 6 && (
          <div className="text-center">
            <button className="inline-flex items-center px-6 py-3 border-2 border-sky-500 text-sky-500 rounded-lg font-medium transition-all hover:-translate-y-1 hover:shadow-lg dark:border-sky-400 dark:text-sky-400">
              View All Versions
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
