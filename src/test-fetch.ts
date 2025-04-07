const API_BASE_URL = 'https://api.scripture.api.bible/v1';
const API_KEY = 'c71a2a34f626fdaeb16cd047c838fd07';

const headers = {
  'api-key': API_KEY,
  'Content-Type': 'application/json'
};

async function testBibleAPI() {
  try {
    console.log('1. Testing Get Bibles...');
    const biblesResponse = await fetch(`${API_BASE_URL}/bibles`, { headers });
    if (!biblesResponse.ok) {
      throw new Error(`HTTP error! status: ${biblesResponse.status}`);
    }
    const biblesData = await biblesResponse.json();
    console.log('Success! Found', biblesData.data.length, 'bibles');
    
    if (biblesData.data.length > 0) {
      const firstBible = biblesData.data[0];
      console.log('\n2. Testing Get Books for Bible:', firstBible.id);
      
      const booksResponse = await fetch(`${API_BASE_URL}/bibles/${firstBible.id}/books`, { headers });
      if (!booksResponse.ok) {
        throw new Error(`HTTP error! status: ${booksResponse.status}`);
      }
      const booksData = await booksResponse.json();
      console.log('Success! Found', booksData.data.length, 'books');
      
      if (booksData.data.length > 0) {
        const firstBook = booksData.data[0];
        console.log('\n3. Testing Get Chapters for Book:', firstBook.id);
        
        const chaptersResponse = await fetch(
          `${API_BASE_URL}/bibles/${firstBible.id}/books/${firstBook.id}/chapters`,
          { headers }
        );
        if (!chaptersResponse.ok) {
          throw new Error(`HTTP error! status: ${chaptersResponse.status}`);
        }
        const chaptersData = await chaptersResponse.json();
        console.log('Success! Found', chaptersData.data.length, 'chapters');
        
        if (chaptersData.data.length > 0) {
          const firstChapter = chaptersData.data[0];
          console.log('\n4. Testing Get Chapter Content:', firstChapter.id);
          
          const contentResponse = await fetch(
            `${API_BASE_URL}/bibles/${firstBible.id}/chapters/${firstChapter.id}?content-type=html`,
            { headers }
          );
          if (!contentResponse.ok) {
            throw new Error(`HTTP error! status: ${contentResponse.status}`);
          }
          const contentData = await contentResponse.json();
          console.log('Success! Got chapter content');
          console.log('Sample content:', contentData.data.content.slice(0, 100), '...');
        }
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testBibleAPI();
