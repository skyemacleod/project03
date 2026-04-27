import { useState } from 'react'

function formatListeners(n) {
  const num = parseInt(n)
  if (isNaN(num)) return ''
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M listeners'
  if (num >= 1000) return Math.round(num / 1000) + 'K listeners'
  return num + ' listeners'
}

function Results({ setPage, tracks, playlist, setPlaylist, comments, setComments }) {
  const [lyrics, setLyrics] = useState(null)       
  const [openComment, setOpenComment] = useState(null) 
  const [commentInput, setCommentInput] = useState('')
  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState('artist')

  async function loadLyrics(title, artist) {
    setLyrics({ title, artist, text: 'Loading...' })
    try {
      const res = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`)
      const data = await res.json()
      setLyrics({ title, artist, text: data.lyrics || 'No lyrics found.' })
    } catch {
      setLyrics({ title, artist, text: 'No lyrics found.' })
    }
  }

  function addToPlaylist(track) {
    const artistName = track.artist?.name || track.artist || 'Unknown'
    const already = playlist.find(t => t.name === track.name && (t.artist?.name || t.artist) === artistName)
    if (!already) setPlaylist(prev => [...prev, track])
  }

  function removeFromPlaylist(trackName) {
    setPlaylist(prev => prev.filter(t => t.name !== trackName))
  }

  function submitComment(trackName) {
    if (!commentInput.trim()) return
    setComments(prev => ({
      ...prev,
      [trackName]: (prev[trackName] || 0) + 1
    }))
    setCommentInput('')
    setOpenComment(null)
  }

  async function doSearch() {
    if (!query.trim()) return
    const LASTFM_KEY = 'f177da7d147760063d6baffb66e22aec'
    const LASTFM_BASE = 'https://ws.audioscrobbler.com/2.0/'
    const method = searchType === 'artist' ? 'artist.gettoptracks' : 'tag.gettoptracks'
    const param  = searchType === 'artist'
      ? `artist=${encodeURIComponent(query)}`
      : `tag=${encodeURIComponent(query)}`
    const url = `${LASTFM_BASE}?method=${method}&${param}&api_key=${LASTFM_KEY}&format=json&limit=15`
    const res = await fetch(url)
    const data = await res.json()
    const results = data.toptracks?.track || data.tracks?.track || []

    setPage('discover')
  }

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

      <section className="text-center px-4 pt-10 pb-5">
        <div className="font-mono text-xs uppercase text-pink-200 border border-pink-400 px-4 py-1.5 rounded-full inline-block mb-5">
          Music Explorer
        </div>
        <div className="flex max-w-xl mx-auto border border-gray-500 rounded-full overflow-hidden focus-within:border-pink-400 transition-colors">
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
            onClick={doSearch}
            style={{ fontFamily: 'Bebas Neue' }}
            className="text-pink-500 bg-pink-200 text-xl py-4 px-5 hover:bg-pink-300"
          >
            Search
          </button>
        </div>
      </section>

      {lyrics && (
        <div className="mx-6 md:mx-20 border border-pink-400 bg-pink-200 rounded-xl my-4 overflow-hidden">
          <div className="flex items-center p-5 bg-pink-400">
            <div>
              <h2 className="text-lg text-black font-semibold">{lyrics.title}</h2>
              <p className="text-sm text-black">{lyrics.artist}</p>
            </div>
            <button
              onClick={() => setLyrics(null)}
              className="ml-auto w-8 h-8 rounded-lg border border-black text-black hover:bg-pink-300 flex items-center justify-center text-sm"
            >
              ✕
            </button>
          </div>
          <div className="px-6 py-8 max-h-[400px] overflow-y-auto">
            <pre className="leading-7 text-black whitespace-pre-wrap font-sans">{lyrics.text}</pre>
          </div>
        </div>
      )}

      <section className="px-6 md:px-20 mb-6">
        <div className="flex items-center gap-3 font-mono text-s uppercase text-pink-200 pb-3">
          Tracks <span className="bg-pink-400 text-black text-xs px-2 py-0.5 rounded-full font-semibold">{tracks.length}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6 border border-pink-400 rounded-2xl">
          {tracks.map((track, i) => {
            const artistName = track.artist?.name || track.artist || 'Unknown'
            const imgSrc = track.image?.[2]?.['#text'] || ''
            const key = `${track.name}-${artistName}`
            const commentCount = comments[key] || 0
            const isCommentOpen = openComment === key

            return (
              <div key={i} className="border border-gray-700 rounded-xl p-3 bg-black hover:border-pink-400 transition-colors">
                <div
                  className="w-full aspect-square rounded-lg mb-3 overflow-hidden cursor-pointer"
                  onClick={() => loadLyrics(track.name, artistName)}
                >
                  {imgSrc
                    ? <img src={imgSrc} alt={track.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full bg-gray-800 flex items-center justify-center text-3xl">🎵</div>
                  }
                </div>

                <div
                  className="font-semibold text-sm truncate cursor-pointer hover:text-pink-300"
                  onClick={() => loadLyrics(track.name, artistName)}
                >
                  {track.name}
                </div>
                <div className="text-gray-400 text-xs truncate mt-0.5">{artistName}</div>
                {track.listeners && (
                  <div className="text-pink-400 text-xs mt-1">{formatListeners(track.listeners)}</div>
                )}

                {isCommentOpen && (
                  <div className="mt-2">
                    <input
                      autoFocus
                      type="text"
                      value={commentInput}
                      onChange={e => setCommentInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && submitComment(key)}
                      placeholder="Write a comment..."
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-2 py-1 text-xs text-white outline-none focus:border-pink-400"
                    />
                    <p className="text-gray-600 text-xs mt-1">Press enter to save</p>
                  </div>
                )}

                <div className="flex justify-between items-center mt-2 text-sm">
                  <button
                    onClick={() => {
                      setOpenComment(isCommentOpen ? null : key)
                      setCommentInput('')
                    }}
                    className="text-gray-400 hover:text-pink-400 flex items-center gap-1 text-xs"
                  >
                    💬 {commentCount > 0 && <span className="text-pink-400">{commentCount}</span>}
                  </button>
                  <button
                    onClick={() => addToPlaylist(track)}
                    className="text-gray-400 hover:text-pink-400 text-lg leading-none"
                  >
                    +
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="px-6 md:px-20 mb-10">
        <div className="font-mono text-s uppercase text-pink-200 pb-3">
          Playlist <span className="bg-pink-400 text-black text-xs px-2 py-0.5 rounded-full font-semibold ml-1">{playlist.length}</span>
        </div>
        <div className="p-6 border border-pink-400 rounded-2xl min-h-[120px]">
          {playlist.length === 0 ? (
            <p className="text-gray-600 font-mono text-sm text-center py-6">No songs added yet — hit + on a track to add it.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {playlist.map((track, i) => {
                const artistName = track.artist?.name || track.artist || 'Unknown'
                const imgSrc = track.image?.[2]?.['#text'] || ''
                return (
                  <div key={i} className="border border-gray-700 rounded-xl p-3 bg-black">
                    <div className="w-full aspect-square rounded-lg mb-3 overflow-hidden">
                      {imgSrc
                        ? <img src={imgSrc} alt={track.name} className="w-full h-full object-cover" />
                        : <div className="w-full h-full bg-gray-800 flex items-center justify-center text-3xl">🎵</div>
                      }
                    </div>
                    <div className="text-sm font-semibold truncate">{track.name}</div>
                    <div className="text-gray-400 text-xs truncate mt-0.5">{artistName}</div>
                    <div className="text-right mt-2">
                      <button
                        onClick={() => removeFromPlaylist(track.name)}
                        className="text-gray-500 hover:text-red-400 text-xs font-mono transition-colors"
                      >
                        x
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-gray-600 text-center p-6 text-gray-400 font-mono mt-auto">
        <p className="text-s">Skye MacLeod - Project 3 - IST363</p>
        <p className="text-s">&copy; 2026</p>
      </footer>

    </div>
  )
}

export default Results