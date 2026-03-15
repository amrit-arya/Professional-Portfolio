import { useTheme } from '../ThemeContext'
import { useState, useEffect } from 'react'

const LANGUAGES = [
  { name: 'AMRIT ARYA'         },
  { name: 'अमृत आर्य'           },
  { name: 'アムリット・アーリャ'      },
  { name: 'અમૃત આર્ય'           },
  { name: '阿姆里特·阿里亚'        },
  { name: '아므리트 아랴'         },
  { name: 'అమృత్ ఆర్య'          },
  { name: 'أمريت آريا'          },
]

const HOLD_MS  = 600
const ENTER_MS = 200
const EXIT_MS  = 100

export default function Hero() {
  const { isDark } = useTheme()

  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('entering')

  useEffect(() => {
    let timer
    if (phase === 'entering') {
      timer = setTimeout(() => setPhase('visible'), ENTER_MS)
    } else if (phase === 'visible') {
      timer = setTimeout(() => setPhase('exiting'), HOLD_MS)
    } else if (phase === 'exiting') {
      timer = setTimeout(() => {
        setIndex(i => (i + 1) % LANGUAGES.length)
        setPhase('entering')
      }, EXIT_MS)
    }
    return () => clearTimeout(timer)
  }, [phase])

  const current = LANGUAGES[index]

  const nameStyle = {
    opacity: phase === 'visible' ? 1 : 0,
    transform: phase === 'exiting'
      ? 'translateY(-40px)'
      : phase === 'entering'
        ? 'translateY(40px)'
        : 'translateY(0)',
    filter: phase === 'visible' ? 'blur(0px)' : 'blur(8px)',
    transition: phase === 'exiting'
      ? `opacity ${EXIT_MS}ms cubic-bezier(0.4,0,1,1), transform ${EXIT_MS}ms cubic-bezier(0.4,0,1,1), filter ${EXIT_MS}ms ease`
      : `opacity ${ENTER_MS}ms cubic-bezier(0,0,0.2,1), transform ${ENTER_MS}ms cubic-bezier(0,0,0.2,1), filter ${ENTER_MS}ms ease`,
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* City Background */}
      <div
        className={`city-bg city-bg-night ${isDark ? 'opacity-40' : 'opacity-50'}`}
        style={{ filter: isDark ? 'none' : 'brightness(1.6) saturate(0.8) hue-rotate(10deg)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        {/* Badge */}
        <div className="animate-fade-in-up mb-6" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card text-sm font-medium tracking-wider uppercase ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
            <span className="w-2 h-2 rounded-full bg-sky animate-pulse" />
            CSE Undergrad
          </span>
        </div>

        {/* "Hello, I'm" subtitle */}
        <div className="animate-fade-in-up mb-4" style={{ animationDelay: '0.3s', opacity: 0 }}>
          <p className={`text-xl sm:text-2xl tracking-[0.2em] uppercase font-bold ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
            Hello, I'm
          </p>
        </div>

        {/* Animated Name */}
        <div className="animate-fade-in-up mb-12" style={{ animationDelay: '0.4s', opacity: 0 }}>
          <div style={{ overflow: 'hidden', padding: '0.35em 0.2em', minHeight: '1.6em', lineHeight: '1.3' }}>
            <h1
              className="gradient-text font-heading font-black tracking-tight leading-none"
              style={{
                fontSize: 'clamp(44px, 8.5vw, 84px)', lineHeight: '1.25',
                willChange: 'transform, opacity, filter',
                display: 'block',
                ...nameStyle,
              }}
            >
              {current.name}
            </h1>
          </div>
        </div>

        {/* Tagline */}
        <p
          className={`text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up ${isDark ? 'text-white/50' : 'text-gray-500'}`}
          style={{ animationDelay: '0.7s', opacity: 0 }}
        >
          Aspiring{' '}
          <span className={`font-medium ${isDark ? 'text-pink' : 'text-pink-600'}`}>DevOps Engineer</span>{' '}
          passionate about automation and{' '}
          <span className={`font-medium ${isDark ? 'text-sky' : 'text-blue-500'}`}>scalable systems</span>.
          I build reliable pipelines and infrastructure that power modern applications.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.9s', opacity: 0 }}>
          <a
            href="#projects"
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-lavender via-pink to-sky text-dark font-semibold text-base hover:shadow-2xl hover:shadow-sky/20 hover:scale-105 btn-glow flex items-center gap-3"
          >
            View My Work
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`group px-8 py-4 rounded-2xl glass-card font-semibold text-base hover:scale-105 flex items-center gap-3 gradient-border ${isDark ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-gray-700 hover:text-gray-900 hover:bg-white/60'}`}
          >
            View Resume
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-y-[-2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}