import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBooks, useChapters, useChapterContent } from '../services/bibleApi'
import { ChevronLeftIcon, ChevronRightIcon, BookOpenIcon } from '@heroicons/react/24/outline'

const BibleReader: React.FC = () => {
  const { bibleId = '', bookId = '', chapterId = '' } = useParams()
  const navigate = useNavigate()
  const [testament, setTestament] = useState<'old' | 'new'>('new')
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large' | 'xlarge'>('medium')

  const { books, loading: loadingBooks } = useBooks(bibleId)
  const { chapters, loading: loadingChapters } = useChapters(bibleId, bookId)
  const { content, loading: loadingContent } = useChapterContent(bibleId, chapterId)

  const filteredBooks = useMemo(() => {
    if (!books) return []
    // Simple testament filtering based on book index
    return books.filter((_, index) => 
      testament === 'old' ? index < 39 : index >= 39
    )
  }, [books, testament])

  const currentBook = books?.find(book => book.id === bookId)
  const currentChapter = chapters?.find(chapter => chapter.id === chapterId)
  const currentChapterIndex = chapters?.findIndex(chapter => chapter.id === chapterId) ?? -1

  const handleBookSelect = (newBookId: string) => {
    navigate(`/bible/${bibleId}/book/${newBookId}`)
  }

  const handleChapterSelect = (newChapterId: string) => {
    navigate(`/bible/${bibleId}/book/${bookId}/chapter/${newChapterId}`)
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
    navigate(`/bible/${bibleId}`)
  }

  const handleFontSizeChange = (newSize: 'small' | 'medium' | 'large' | 'xlarge') => {
    setFontSize(newSize)
  }

  if (loadingBooks || loadingChapters || loadingContent) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
          <p className="mt-4 text-amber-800">Loading content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleChangeBook}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-all duration-200"
            >
              <BookOpenIcon className="h-5 w-5 mr-2" />
              Change Book
            </button>
            
            <div className="flex rounded-lg overflow-hidden border-2 border-amber-200">
              <button
                onClick={() => setTestament('old')}
                className={`px-4 py-2 ${
                  testament === 'old'
                    ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white'
                    : 'bg-white text-amber-700 hover:bg-amber-50'
                } transition-all duration-200`}
              >
                Old Testament
              </button>
              <button
                onClick={() => setTestament('new')}
                className={`px-4 py-2 ${
                  testament === 'new'
                    ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white'
                    : 'bg-white text-amber-700 hover:bg-amber-50'
                } transition-all duration-200`}
              >
                New Testament
              </button>
            </div>
          </div>

          {/* Chapter Navigation */}
          {currentBook && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePreviousChapter}
                disabled={currentChapterIndex <= 0}
                className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-all duration-200 disabled:from-amber-300 disabled:to-amber-400 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <span className="text-amber-900 font-medium">
                {currentBook.name} {currentChapter?.number}
              </span>
              <button
                onClick={handleNextChapter}
                disabled={currentChapterIndex >= (chapters?.length ?? 0) - 1}
                className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-all duration-200 disabled:from-amber-300 disabled:to-amber-400 disabled:cursor-not-allowed"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Book Selection */}
        {!bookId && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredBooks.map((book) => (
              <button
                key={book.id}
                onClick={() => handleBookSelect(book.id)}
                className="p-4 text-center rounded-lg border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white hover:border-amber-300 hover:shadow-md transition-all duration-200"
              >
                <h3 className="font-medium text-amber-900">{book.name}</h3>
              </button>
            ))}
          </div>
        )}

        {/* Chapter Selection */}
        {bookId && !chapterId && chapters && (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => handleChapterSelect(chapter.id)}
                className="p-4 text-center rounded-lg border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white hover:border-amber-300 hover:shadow-md transition-all duration-200"
              >
                <span className="text-lg font-medium text-amber-900">{chapter.number}</span>
              </button>
            ))}
          </div>
        )}

        {/* Chapter Content */}
        {content && (
          <div className={`text-size-${fontSize}`}>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        )}

        {/* Font Size Controls */}
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
      </div>
    </div>
  )
}

export default BibleReader
