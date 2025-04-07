import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import BibleVersions from './components/BibleVersions'
import BibleReader from './components/BibleReader'
import BibleSearch from './components/BibleSearch'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/versions" element={<BibleVersions />} />
          <Route path="/bible/:bibleId" element={<BibleReader />} />
          <Route path="/bible/:bibleId/book/:bookId" element={<BibleReader />} />
          <Route path="/bible/:bibleId/book/:bookId/chapter/:chapterId" element={<BibleReader />} />
          <Route path="/search" element={<BibleSearch bibleId="de4e12af7f28f599-02" />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
