import { useState } from 'react'

const results = {
  dark: {
    title: 'Dark Pop',
    desc: 'You live for emotion and intensity. Your playlists hit hard and feel personal — music is your processing space, not just background noise.',
    artists: ['Billie Eilish', 'Olivia Rodrigo', 'Lana Del Rey', 'Gracie Abrams']
  },
  hype: {
    title: 'Main Character',
    desc: 'You need music that matches your energy — loud, bold, and in the moment. You\'re the one who sets the aux at every party.',
    artists: ['Drake', 'Doja Cat', 'SZA', 'Travis Scott']
  },
  chill: {
    title: 'Mellow Wave',
    desc: 'You pick music that fits the background of a life well-lived. Smooth, warm, and effortless — your taste is understated but genuinely deep.',
    artists: ['Frank Ocean', 'Rex Orange County', 'Mac Miller', 'Khruangbin']
  },
  intense: {
    title: 'Sonic Architect',
    desc: 'You appreciate layered sound and complex production. You hear things in songs that most people completely miss.',
    artists: ['The Weeknd', 'Tame Impala', 'Radiohead', 'James Blake']
  }
}

function Quiz({ setPage }) {
  const [selectedAnswers, setSelectedAnswers] = useState([null, null, null, null])
  const [result, setResult] = useState(null)

  function selectAnswer(qIndex, val) {
    setSelectedAnswers(prev => {
      const updated = [...prev]
      updated[qIndex] = val
      return updated
    })
  }

  function submitQuiz() {
    const counts = { dark: 0, hype: 0, chill: 0, intense: 0 }
    let answered = 0
    selectedAnswers.forEach(val => {
      if (val !== null) { counts[val]++; answered++ }
    })
    if (answered === 0) {
      setSelectedAnswers([null, null, null, null])
      return
    }
    const topVal = Object.keys(counts).reduce((best, key) =>
      counts[key] > counts[best] ? key : best
    , 'chill')
    setResult(topVal)
  }

  function resetQuiz() {
    setSelectedAnswers([null, null, null, null])
    setResult(null)
  }

  const questions = [
    {
      text: "What's your current mood?",
      options: [
        { label: 'Melancholy',  val: 'dark'    },
        { label: 'Hyped',       val: 'hype'    },
        { label: 'Chill',       val: 'chill'   },
        { label: 'Focused',     val: 'intense' },
      ]
    },
    {
      text: 'When do you listen to music most?',
      options: [
        { label: 'Late at night',    val: 'dark'    },
        { label: 'Out with friends', val: 'hype'    },
        { label: 'In the morning',   val: 'chill'   },
        { label: 'Working out',      val: 'intense' },
      ]
    },
    {
      text: 'What matters most in a song?',
      options: [
        { label: 'The lyrics',      val: 'dark'    },
        { label: 'The beat',        val: 'hype'    },
        { label: 'The overall vibe', val: 'chill'  },
        { label: 'The production',  val: 'intense' },
      ]
    },
    {
      text: 'Your ideal concert?',
      options: [
        { label: 'Small intimate venue',  val: 'dark'    },
        { label: 'Festival main stage',   val: 'hype'    },
        { label: 'Outdoor amphitheater',  val: 'chill'   },
        { label: 'Massive arena show',    val: 'intense' },
      ]
    }
  ]

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">

      <header className="bg-black sticky top-0 border-b border-gray-500 flex items-center justify-between px-6 py-5">
        <span style={{ fontFamily: 'Bebas Neue' }} className="text-white text-4xl tracking-wide cursor-pointer" onClick={() => setPage('home')}>Muse</span>
        <nav className="hidden md:flex gap-8">
          <button onClick={() => setPage('discover')} className="text-gray-500 hover:text-pink-200 text-s uppercase font-mono transition-colors">Discover</button>
          <button onClick={() => setPage('quiz')} className="text-white hover:text-pink-200 text-s uppercase font-mono transition-colors">Quiz</button>
          <button className="text-gray-500 hover:text-pink-200 text-s uppercase font-mono transition-colors">Account</button>
        </nav>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-16 flex-1 w-full">

        {result ? (
          <div>
            <p className="font-mono text-pink-400 text-xs uppercase tracking-widest mb-3">Your sound is</p>
            <h1 style={{ fontFamily: 'Bebas Neue' }} className="text-8xl text-pink-200 mb-2">{results[result].title}</h1>
            <p className="font-mono text-gray-500 text-sm leading-relaxed mb-12 max-w-lg">{results[result].desc}</p>

            <p className="font-mono text-gray-600 text-xs uppercase tracking-widest mb-4">Artists you might love</p>
            <div className="grid grid-cols-2 gap-3 mb-12">
              {results[result].artists.map(name => (
                <div key={name} className="border border-gray-800 rounded-xl px-5 py-4 font-mono text-sm text-gray-300">
                  {name}
                </div>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => setPage('discover')}
                style={{ fontFamily: 'Bebas Neue' }}
                className="text-pink-500 bg-pink-200 text-xl py-2 px-14 hover:bg-pink-300 border border-pink-400 rounded-3xl transition-colors"
              >
                Search These Artists
              </button>
              <button
                onClick={resetQuiz}
                style={{ fontFamily: 'Bebas Neue' }}
                className="text-gray-500 bg-transparent text-xl py-2 px-14 hover:text-gray-300 border border-gray-700 hover:border-gray-500 rounded-3xl transition-colors"
              >
                Retake Quiz
              </button>
            </div>
          </div>

        ) : (

          <div>
            <div className="mb-14">
              <h1 style={{ fontFamily: 'Bebas Neue' }} className="text-8xl text-pink-200 mb-3">Find Your Vibe</h1>
              <p className="font-mono text-gray-500 text-sm">Answer all four questions and hit submit to get your result.</p>
            </div>

            {questions.map((q, qIndex) => (
              <div key={qIndex}>
                <div className="mb-12">
                  <p className="font-mono text-gray-600 text-xs uppercase tracking-widest mb-2">Question {qIndex + 1} of {questions.length}</p>
                  <h2 style={{ fontFamily: 'Bebas Neue' }} className="text-4xl mb-5">{q.text}</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {q.options.map(opt => {
                      const isSelected = selectedAnswers[qIndex] === opt.val
                      return (
                        <div
                          key={opt.val}
                          onClick={() => selectAnswer(qIndex, opt.val)}
                          className={`border rounded-xl px-5 py-4 cursor-pointer font-mono text-sm transition-colors
                            ${isSelected
                              ? 'border-pink-400 text-white'
                              : 'border-gray-800 text-gray-300 hover:border-pink-400'
                            }`}
                        >
                          {opt.label}
                        </div>
                      )
                    })}
                  </div>
                </div>
                {qIndex < questions.length - 1 && <hr className="border-gray-900 mb-12" />}
              </div>
            ))}

            <div className="text-center mt-4">
              <button
                onClick={submitQuiz}
                style={{ fontFamily: 'Bebas Neue' }}
                className="text-pink-500 bg-pink-200 text-xl py-2 px-14 hover:bg-pink-300 border border-pink-400 rounded-3xl transition-colors"
              >
                Submit
              </button>
              <p className="font-mono text-gray-700 text-xs mt-10">Answer at least one question to get your result.</p>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-600 text-center p-6 text-gray-400 font-mono">
        <p className="text-s">Skye MacLeod - Project 3 - IST363</p>
        <p className="text-s">&copy; 2026</p>
      </footer>

    </div>
  )
}

export default Quiz