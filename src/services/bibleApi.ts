// Bible API service
import { useState, useEffect } from 'react';

// API configuration
const API_BASE_URL = 'https://api.scripture.api.bible/v1';
const API_KEY = 'c71a2a34f626fdaeb16cd047c838fd07';

// Headers for API requests
const headers = {
  'api-key': API_KEY,
  'Content-Type': 'application/json'
};

// Error handling utility
const handleApiError = (error: any) => {
  console.error('API Error:', error);
  if (error.response?.data?.message) {
    return `Error: ${error.response.data.message}`;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Network error. Please check your connection.';
};

// Types
export interface Bible {
  id: string;
  name: string;
  description?: string;
  language: {
    id: string;
    name: string;
    scriptDirection: 'LTR' | 'RTL';
  };
}

interface Book {
  id: string;
  name: string;
  nameLong?: string;
}

interface Chapter {
  id: string;
  number: string;
}

interface Verse {
  id: string;
  orgId: string;
  bibleId: string;
  bookId: string;
  chapterId: string;
  reference: string;
  content: string;
  number: string;
}

export interface SearchParams {
  query: string;
  type?: 'all' | 'verse' | 'passage';
  limit?: number;
  offset?: number;
  sort?: 'relevance' | 'canonical' | 'reverse-canonical';
  range?: string;
}

export interface SearchResult {
  query: string;
  limit: number;
  offset: number;
  total: number;
  verseCount: number;
  verses: Array<{
    id: string;
    orgId: string;
    bibleId: string;
    bookId: string;
    chapterId: string;
    reference: string;
    text: string;
    highlights?: Array<{
      start: number;
      end: number;
    }>;
  }>;
}

// Custom hook for fetching Bibles
export const useBibles = () => {
  const [bibles, setBibles] = useState<Bible[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBibles = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/bibles`, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBibles(data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch Bibles');
      } finally {
        setLoading(false);
      }
    };

    fetchBibles();
  }, []);

  return { bibles, loading, error };
};

// Custom hook for fetching Books
export const useBooks = (bibleId: string) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!bibleId) {
        setBooks([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/bibles/${bibleId}/books`, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch Books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [bibleId]);

  return { books, loading, error };
};

// Custom hook for fetching Chapters
export const useChapters = (bibleId: string, bookId: string) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChapters = async () => {
      if (!bibleId || !bookId) {
        setChapters([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/bibles/${bibleId}/books/${bookId}/chapters`, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setChapters(data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch Chapters');
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [bibleId, bookId]);

  return { chapters, loading, error };
};

// Custom hook for fetching Chapter content
export const useChapterContent = (bibleId: string, chapterId: string) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      if (!bibleId || !chapterId) {
        setContent('');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/bibles/${bibleId}/chapters/${chapterId}?content-type=html`, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Process the HTML content to add verse styling
        const processedContent = data.data.content
          // Remove any existing classes
          .replace(/class="[^"]*"/g, '')
          // Process verses
          .replace(/<p>/g, '<div class="verse">')
          .replace(/<\/p>/g, '</div>')
          // Process verse numbers
          .replace(/<b>(\d+)<\/b>/g, '<span class="verse-number">$1</span>')
          // Wrap verse text
          .replace(/<\/span>\s*([^<]*)/g, '</span><span class="verse-text">$1</span>')
          // Wrap all verses in a container
          .replace(/^(.*)$/, '<div class="verse-container">$1</div>');

        setContent(processedContent);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch Chapter Content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [bibleId, chapterId]);

  return { content, loading, error };
};

// Custom hook for fetching Verses
export const useVerses = (bibleId: string, bookId: string, chapterId: string) => {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVerses = async () => {
      if (!bibleId || !chapterId) {
        setVerses([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/bibles/${bibleId}/chapters/${chapterId}/verses`, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVerses(data.data);
        setLoading(false);
      } catch (error) {
        setError(handleApiError(error));
        setLoading(false);
      }
    };

    fetchVerses();
  }, [bibleId, bookId, chapterId]);

  return { verses, loading, error };
};

// Custom hook for searching the Bible
export const useSearch = (bibleId: string, searchParams: SearchParams) => {
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const searchBible = async (params: SearchParams) => {
    if (!bibleId || !params.query) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams();
      searchParams.append('query', params.query);

      if (params.type && params.type !== 'all') {
        searchParams.append('type', params.type);
      }

      if (params.limit) {
        searchParams.append('limit', params.limit.toString());
      }

      if (params.offset) {
        searchParams.append('offset', params.offset.toString());
      }

      if (params.sort) {
        searchParams.append('sort', params.sort);
      }

      if (params.range) {
        searchParams.append('range', params.range);
      }

      const searchUrl = `${API_BASE_URL}/bibles/${bibleId}/search?${searchParams.toString()}`;

      const response = await fetch(searchUrl, {
        headers: {
          'api-key': API_KEY
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message ||
          `API error: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      const searchResult = data.data as SearchResult;

      setResults(searchResult);
      setHasMore(
        searchResult.offset + searchResult.verses.length < searchResult.total
      );
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.query) {
      searchBible(searchParams);
    }
  }, [bibleId, searchParams.query, searchParams.type, searchParams.sort]);

  const loadMore = async () => {
    if (!results || loading || !hasMore) return;

    const nextParams: SearchParams = {
      ...searchParams,
      offset: (results.offset + results.verses.length)
    };

    try {
      const currentResults = results;
      await searchBible(nextParams);

      if (results) {
        setResults({
          ...results,
          verses: [...currentResults.verses, ...results.verses]
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  return {
    results,
    loading,
    error,
    hasMore,
    searchBible,
    loadMore
  };
};
