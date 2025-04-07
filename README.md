# Destiny Bible

A professional Bible application built with React and TypeScript that allows users to read, search, and explore different versions of the Bible using the API.Bible service.

## Features

- **Multiple Bible Versions**: Access various translations of the Bible
- **Bible Reader**: Read chapters and verses with adjustable font size
- **Search Functionality**: Search the Bible for specific words, phrases, or references
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technologies Used

- React
- TypeScript
- API.Bible (Scripture API)
- CSS for styling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd destiny-bible
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory with your API.Bible key:
   ```
   API_KEY='your_api_key_here'
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## API Integration

This application uses the [API.Bible](https://docs.api.bible/) service to fetch Bible data. The API provides access to:

- Multiple Bible versions and translations
- Books, chapters, and verses
- Search functionality
- Audio Bible content (not implemented in this version)

## Project Structure

```
destiny-bible/
├── public/
│   └── images/
│       ├── bible-bg.jpg
│       └── bible-icon.svg
├── src/
│   ├── components/
│   │   ├── BibleReader.tsx
│   │   ├── BibleSearch.tsx
│   │   ├── BibleVersions.tsx
│   │   ├── HomePage.tsx
│   │   └── Layout.tsx
│   ├── services/
│   │   └── bibleApi.ts
│   ├── styles/
│   │   ├── BibleReader.css
│   │   ├── BibleSearch.css
│   │   ├── BibleVersions.css
│   │   ├── HomePage.css
│   │   └── Layout.css
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env.local
├── package.json
└── README.md
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [API.Bible](https://scripture.api.bible/) for providing the Bible data API
- [React](https://react.dev/) for the frontend framework
