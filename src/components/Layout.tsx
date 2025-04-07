import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HomeIcon, BookOpenIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-amber-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium text-amber-900 hover:text-amber-700 
                  ${isActive('/') ? 'text-amber-700' : ''}`}
              >
                <HomeIcon className="h-5 w-5 mr-1" />
                Home
              </Link>
              <Link
                to="/versions"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium text-amber-900 hover:text-amber-700 
                  ${isActive('/bible-versions') ? 'text-amber-700' : ''}`}
              >
                <BookOpenIcon className="h-5 w-5 mr-1" />
                Versions
              </Link>
              <Link
                to="/search"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium text-amber-900 hover:text-amber-700 
                  ${isActive('/search') ? 'text-amber-700' : ''}`}
              >
                <MagnifyingGlassIcon className="h-5 w-5 mr-1" />
                Search
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-amber-100 overflow-hidden py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-amber-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-amber-700">
            &copy; {new Date().getFullYear()} Destiny Bible. All rights reserved.
          </p>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm">
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-amber-200 hover:text-amber-100 transition-colors">
                About
              </a>
              <a href="#" className="text-amber-200 hover:text-amber-100 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-amber-200 hover:text-amber-100 transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
