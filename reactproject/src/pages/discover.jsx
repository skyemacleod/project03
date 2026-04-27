import { useState } from 'react'

const LASTFM_KEY = 'f177da7d147760063d6baffb66e22aec'
const LASTFM_BASE = 'https://ws.audioscrobbler.com/2.0/'

async function fetchTracks(query, type) {
  const method = type === 'artist' ? 'artist.gettoptracks' : 'tag.gettoptracks'
  const param  = type === 'artist'
    ? `artist=${encodeURIComponent(query)}`
    : `tag=${encodeURIComponent(query)}`

  const url = `${LASTFM_BASE}?method=${method}&${param}&api_key=${LASTFM_KEY}&format=json&limit=18`
  const res = await fetch(url)
  const data = await res.json()
  return data.toptracks?.track || data.tracks?.track || []
}

function Discover({ setPage, setTracks }) {
  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState('artist')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function doSearch(q, type) {
    const searchQuery = q ?? query
    const searchT = type ?? searchType
    if (!searchQuery.trim()) return
    setLoading(true)
    setError('')
    try {
      const results = await fetchTracks(searchQuery, searchT)
      if (results.length === 0) {
        setError('No results found.')
        setLoading(false)
        return
      }
      setTracks(results)
      setPage('results')
    } catch (err) {
      setError('Something went wrong. Try again.')
    }
    setLoading(false)
  }

  const tags = [
    { label: 'Pop',          query: 'pop',          type: 'tag'    },
    { label: 'Rap',          query: 'rap',          type: 'tag'    },
    { label: 'Hip Hop',      query: 'hip hop',      type: 'tag'    },
    { label: 'Adele',        query: 'adele',        type: 'artist' },
    { label: 'Trippie Redd', query: 'trippie redd', type: 'artist' },
    { label: 'Taylor Swift', query: 'taylor swift', type: 'artist' },
  ]

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">

      <header className="bg-black sticky top-0 border-b border-gray-500 flex items-center justify-between px-6 py-5">
        <span style={{ fontFamily: 'Bebas Neue' }} className="text-white text-4xl tracking-wide cursor-pointer" onClick={() => setPage('home')}>Muse</span>
        <nav className="hidden md:flex gap-8">
          <button onClick={() => setPage('discover')} className="text-white hover:text-pink-200 text-s uppercase font-mono transition-colors">Discover</button>
          <button onClick={() => setPage('quiz')} className="text-gray-500 hover:text-pink-200 text-s uppercase font-mono transition-colors">Quiz</button>
          <button className="text-gray-500 hover:text-pink-200 text-s uppercase font-mono transition-colors">Account</button>
        </nav>
      </header>

      <section className="text-center px-4 pt-20 pb-20 flex-1">
        <div className="font-mono text-xs uppercase text-pink-200 border border-pink-400 px-4 py-1.5 rounded-full inline-block mb-5 mt-10">
          Music Explorer
        </div>
        <h1 style={{ fontFamily: 'Bebas Neue' }} className="text-8xl text-pink-200 mb-4">Find your sound</h1>
        <p className="text-gray-500 text-lg mb-10">Search by artist or genre to find your sound</p>

        <div className="flex max-w-xl mx-auto border border-gray-500 rounded-xl overflow-hidden focus-within:border-pink-400 transition-colors">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && doSearch()}
            placeholder="e.g. Olivia Rodrigo, hip hop, rock..."
            className="flex-1 bg-transparent border-none outline-none text-white px-5 py-4 text-base"
          />
          <div className="flex items-center border-l border-gray-500 px-2">
            <select
              value={searchType}
              onChange={e => setSearchType(e.target.value)}
              className="bg-transparent text-gray-300 font-mono text-xs px-2 h-full cursor-pointer"
            >
              <option value="artist" className="text-white bg-black">Artist</option>
              <option value="tag" className="text-white bg-black">Genre</option>
            </select>
          </div>
          <button
            onClick={() => doSearch()}
            style={{ fontFamily: 'Bebas Neue' }}
            className="text-pink-500 bg-pink-200 text-xl py-4 px-5 hover:bg-pink-300"
          >
            {loading ? '...' : 'Search'}
          </button>
        </div>

        {error && <p className="text-red-400 font-mono text-sm mt-4">{error}</p>}

        <div className="flex flex-wrap gap-2 justify-center mt-6 pb-16">
          {tags.map(tag => (
            <button
              key={tag.label}
              onClick={() => {
                setQuery(tag.query)
                setSearchType(tag.type)
                doSearch(tag.query, tag.type)
              }}
              className="font-mono text-xs uppercase text-pink-200 border border-pink-400 px-4 py-1.5 rounded-full inline-block mb-5 hover:text-white hover:bg-pink-400 transition-all"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-600 text-center p-6 text-gray-400 font-mono">
        <p className="text-s">Skye MacLeod - Project 3 - IST363</p>
        <p className="text-s">&copy; 2026</p>
      </footer>

    </div>
  )
}

export default Discover