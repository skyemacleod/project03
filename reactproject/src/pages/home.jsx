function Home({ setPage }) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col">
  
        <header className="bg-black sticky top-0 border-b border-gray-500 flex items-center justify-between px-6 py-5">
          <span style={{ fontFamily: 'Bebas Neue' }} className="text-white text-4xl tracking-wide cursor-pointer" onClick={() => setPage('home')}>Muse</span>
          <nav className="hidden md:flex gap-8">
            <button onClick={() => setPage('discover')} className="text-gray-500 hover:text-pink-200 text-s uppercase font-mono transition-colors">Discover</button>
            <button onClick={() => setPage('quiz')} className="text-gray-500 hover:text-pink-200 text-s uppercase font-mono transition-colors">Quiz</button>
            <button className="text-gray-500 hover:text-pink-200 text-s uppercase font-mono transition-colors">Account</button>
          </nav>
        </header>
  
        <div className="m-2">
          <h1 style={{ fontFamily: 'Bebas Neue' }} className="text-center text-white text-[200px] md:text-[280px] tracking-widest pt-12 pb-12">Muse</h1>
        </div>
  
        <div className="px-10">
          <hr className="border-pink-200" />
        </div>
  
        <main className="grid md:grid-cols-2 gap-2 sm:grid-cols-1 my-12">
          <div className="m-2 px-4 pl-8 pt-20 pb-10">
            <h1 style={{ fontFamily: 'Bebas Neue' }} className="text-9xl text-pink-200 mb-4 mt-5">Find your muse</h1>
            <button
              onClick={() => setPage('discover')}
              style={{ fontFamily: 'Bebas Neue' }}
              className="text-pink-500 bg-pink-200 text-xl py-4 px-14 hover:bg-pink-300 border border-pink-400 rounded-3xl"
            >
              Click here to Search
            </button>
          </div>
          <div className="text-center m-2 px-4 pt-20 pb-10">
            <p className="p-4 font-mono text-justify">
              Step into a space where your sound evolves. This isn't just about finding songs — it's about uncovering the patterns behind what moves you, refining your taste, and pushing it further. Explore genres you've never named, rediscover ones you thought you knew, and let unexpected connections shape your next favorite track. Every click, every listen, every discovery builds a clearer picture of your musical identity. Here, your taste isn't static — it's something you cultivate, expand, and define on your own terms.
              <br /><br />
              Search the songs, build a playlist, rate the music.
            </p>
          </div>
        </main>
  
        <div className="px-10">
          <hr className="border-pink-200" />
        </div>
  
        <section className="mt-10 px-10 md:px-10 mb-14">
          <h2 style={{ fontFamily: 'Bebas Neue' }} className="text-4xl text-white mb-6 tracking-wide">Trending Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {['Drake', 'Billie Eilish', 'The Weeknd', 'Taylor Swift'].map(artist => (
              <div
                key={artist}
                onClick={() => setPage('discover')}
                className="border border-pink-300 rounded-2xl px-5 py-4 cursor-pointer font-mono text-md text-gray-300 hover:border-pink-400 hover:text-white transition-colors"
              >
                {artist}
              </div>
            ))}
          </div>
        </section>
  
        <footer className="border-t border-gray-600 text-center p-6 text-gray-400 font-mono mt-auto">
          <p className="text-s">Skye MacLeod - Project 3 - IST363</p>
          <p className="text-s">&copy; 2026</p>
        </footer>
  
      </div>
    )
  }
  
  export default Home