import React, { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useBooks, useChapters, useChapterContent } from '../services/bibleApi'
import { ChevronLeftIcon, ChevronRightIcon, BookOpenIcon } from '@heroicons/react/24/outline'

const BibleReader: React.FC = () => {
  const { bibleId = '' } = useParams()
  const [selectedBookId, setSelectedBookId] = useState('')
  const [selectedChapterId, setSelectedChapterId] = useState('')
  const [testament, setTestament] = useState<'old' | 'new'>('new')
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large' | 'xlarge'>('medium')

  const { books, loading: loadingBooks, error: booksError } = useBooks(bibleId)
  const { chapters, loading: loadingChapters } = useChapters(bibleId, selectedBookId)
  const { content, loading: loadingContent } = useChapterContent(bibleId, selectedChapterId)

  // Filter books by testament
  const filteredBooks = useMemo(() => {
    if (!books) return []
    return books.filter((_, index) => testament === 'old' ? index < 39 : index >= 39)
  }, [books, testament])

  const currentBook = books?.find(book => book.id === selectedBookId)
  const currentChapterIndex = chapters?.findIndex(chapter => chapter.id === selectedChapterId) ?? -1

  const handleBookSelect = (bookId: string) => {
    setSelectedBookId(bookId)
    setSelectedChapterId('')
  }

  const handleChapterSelect = (chapterId: string) => {
    setSelectedChapterId(chapterId)
  }

  const handlePreviousChapter = () => {
    if (currentChapterIndex > 0 && chapters) {
      handleChapterSelect(chapters[currentChapterIndex - 1].id)
    }
  }

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters?.length - 1 && chapters) {
      handleChapterSelect(chapters[currentChapterIndex + 1].id)
    }
  }

  const handleChangeBook = () => {
    setSelectedBookId('')
    setSelectedChapterId('')
  }

  const handleFontSizeChange = (newSize: 'small' | 'medium' | 'large' | 'xlarge') => {
    setFontSize(newSize)
  }

  if (loadingBooks) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
          <p className="mt-4 text-amber-800">Loading books...</p>
        </div>
      </div>
    )
  }

  if (booksError) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
            <div className="h-12 w-12 text-red-500 mx-auto mb-4">⚠️</div>
            <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Books</h3>
            <p className="text-red-700">{booksError}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Navigation Panel */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-4 border-2 border-amber-100 space-y-6">
              {/* Testament Switcher */}
              <div>
                <h2 className="text-lg font-serif font-semibold text-amber-900 mb-4">Testament</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTestament('old')}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                      testament === 'old'
                        ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-inner'
                        : 'bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 text-amber-900 hover:border-amber-300 hover:shadow-md'
                    }`}
                  >
                    Old Testament
                  </button>
                  <button
                    onClick={() => setTestament('new')}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                      testament === 'new'
                        ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-inner'
                        : 'bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 text-amber-900 hover:border-amber-300 hover:shadow-md'
                    }`}
                  >
                    New Testament
                  </button>
                </div>
              </div>

              {/* Books or Chapters Grid */}
              <div>
                {selectedBookId ? (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-serif font-semibold text-amber-900">
                        {currentBook?.name} Chapters
                      </h2>
                      <button
                        onClick={handleChangeBook}
                        className="inline-flex items-center px-3 py-1 text-sm rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-all duration-200"
                      >
                        <BookOpenIcon className="h-4 w-4 mr-1" />
                        Change Book
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {loadingChapters ? (
                        <div className="col-span-4 py-4 text-center text-amber-800">
                          Loading chapters...
                        </div>
                      ) : (
                        chapters?.map((chapter) => (
                          <button
                            key={chapter.id}
                            onClick={() => handleChapterSelect(chapter.id)}
                            className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                              selectedChapterId === chapter.id
                                ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-inner'
                                : 'bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 text-amber-900 hover:border-amber-300 hover:shadow-md'
                            }`}
                          >
                            {chapter.number}
                          </button>
                        ))
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-serif font-semibold text-amber-900 mb-4">
                      Select a Book
                    </h2>
                    <div className="grid grid-cols-2 gap-2">
                      {filteredBooks.map((book) => (
                        <button
                          key={book.id}
                          onClick={() => handleBookSelect(book.id)}
                          className="px-3 py-2 text-sm rounded-lg transition-all duration-200 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 text-amber-900 hover:border-amber-300 hover:shadow-md"
                        >
                          {book.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-9">
            {selectedChapterId ? (
              <div className="bg-white rounded-lg shadow-md p-6 border-2 border-amber-100">
                {loadingContent ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
                    <p className="mt-4 text-amber-800">Loading content...</p>
                  </div>
                ) : (
                  <div>
                    {/* Chapter Navigation */}
                    <div className="flex justify-between items-center mb-6">
                      <button
                        onClick={handlePreviousChapter}
                        disabled={currentChapterIndex <= 0}
                        className="inline-flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-br from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700"
                      >
                        <ChevronLeftIcon className="h-5 w-5 mr-1" />
                        Previous
                      </button>
                      <h2 className="text-xl font-serif font-semibold text-amber-900">
                        {currentBook?.name} {' '}
                        {chapters?.find(c => c.id === selectedChapterId)?.number}
                      </h2>
                      <button
                        onClick={handleNextChapter}
                        disabled={currentChapterIndex >= (chapters?.length ?? 0) - 1}
                        className="inline-flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-br from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700"
                      >
                        Next
                        <ChevronRightIcon className="h-5 w-5 ml-1" />
                      </button>
                    </div>

                    {/* Chapter Content */}
                    <div className={`text-size-${fontSize}`}>
                      <div
                        className="prose prose-amber max-w-none"
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-amber-50 rounded-lg p-8 text-center border-2 border-amber-100">
                <h2 className="text-xl font-serif font-semibold text-amber-900 mb-4">
                  {selectedBookId ? 'Select a chapter to start reading' : 'Select a book to start reading'}
                </h2>
                <p className="text-amber-700">
                  {selectedBookId 
                    ? 'Choose a chapter from the list on the left to read its content.'
                    : 'Choose a book from the list on the left, then select a chapter to read its content.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Font Size Controls */}
        {selectedChapterId && (
          <div className="font-size-controls">
            <button
              onClick={() => handleFontSizeChange('small')}
              disabled={fontSize === 'small'}
              className="font-size-button"
              title="Small Text"
            >
              A
            </button>
            <button
              onClick={() => handleFontSizeChange('medium')}
              disabled={fontSize === 'medium'}
              className="font-size-button"
              title="Medium Text"
            >
              A+
            </button>
            <button
              onClick={() => handleFontSizeChange('large')}
              disabled={fontSize === 'large'}
              className="font-size-button"
              title="Large Text"
            >
              A++
            </button>
            <button
              onClick={() => handleFontSizeChange('xlarge')}
              disabled={fontSize === 'xlarge'}
              className="font-size-button"
              title="Extra Large Text"
            >
              A+++
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BibleReader
