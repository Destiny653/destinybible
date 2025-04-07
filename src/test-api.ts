const API_BASE_URL = 'https://api.scripture.api.bible/v1';
const API_KEY = 'c71a2a34f626fdaeb16cd047c838fd07';

const headers = {
  'api-key': API_KEY,
  'Content-Type': 'application/json'
};

async function testBibleAPI() {
  try {
    // Test 1: Get all Bibles
    console.log('Testing: Get all Bibles');
    const biblesResponse = await fetch(`${API_BASE_URL}/bibles`, { headers });
    const biblesData = await biblesResponse.json();
    console.log('Bibles Response:', JSON.stringify(biblesData, null, 2));

    if (biblesData.data && biblesData.data.length > 0) {
      const firstBible = biblesData.data[0];
      console.log('\nTesting: Get books for first Bible:', firstBible.id);
      
      // Test 2: Get books for the first Bible
      const booksResponse = await fetch(`${API_BASE_URL}/bibles/${firstBible.id}/books`, { headers });
      const booksData = await booksResponse.json();
      console.log('Books Response:', JSON.stringify(booksData, null, 2));

      if (booksData.data && booksData.data.length > 0) {
        const firstBook = booksData.data[0];
        console.log('\nTesting: Get chapters for first book:', firstBook.id);
        
        // Test 3: Get chapters for the first book
        const chaptersResponse = await fetch(
          `${API_BASE_URL}/bibles/${firstBible.id}/books/${firstBook.id}/chapters`,
          { headers }
        );
        const chaptersData = await chaptersResponse.json();
        console.log('Chapters Response:', JSON.stringify(chaptersData, null, 2));

        if (chaptersData.data && chaptersData.data.length > 0) {
          const firstChapter = chaptersData.data[0];
          console.log('\nTesting: Get content for first chapter:', firstChapter.id);
          
          // Test 4: Get content for the first chapter
          const contentResponse = await fetch(
            `${API_BASE_URL}/bibles/${firstBible.id}/chapters/${firstChapter.id}?content-type=html`,
            { headers }
          );
          const contentData = await contentResponse.json();
          console.log('Chapter Content Response:', JSON.stringify(contentData, null, 2));
        }
      }
    }
  } catch (error) {
    console.error('API Test Error:', error);
  }
}

testBibleAPI();
