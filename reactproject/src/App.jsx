import { useState } from 'react'
import Home from './pages/home.jsx'
import Discover from './pages/discover.jsx'
import Results from './pages/results.jsx'
import Quiz from './pages/quiz.jsx'
 
function App() {
  const [page, setPage] = useState('home')
  const [tracks, setTracks] = useState([])
  const [playlist, setPlaylist] = useState([])
  const [comments, setComments] = useState({}) 
 
  if (page === 'home') return (
    <Home setPage={setPage} />
  )
 
  if (page === 'discover') return (
    <Discover setPage={setPage} setTracks={setTracks} />
  )
 
  if (page === 'results') return (
    <Results
      setPage={setPage}
      tracks={tracks}
      playlist={playlist}
      setPlaylist={setPlaylist}
      comments={comments}
      setComments={setComments}
    />
  )
 
  if (page === 'quiz') return (
    <Quiz setPage={setPage} />
  )
}
 
export default App