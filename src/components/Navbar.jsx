import { useState, useEffect } from 'react'
import { useTheme } from '../ThemeContext'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { isDark, toggle } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observers = []
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.35 }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <nav
      id="main-navbar"
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isScrolled
          ? 'top-2 w-[90%] max-w-5xl'
          : 'top-4 w-[95%] max-w-6xl'
      }`}
    >
      <div
        className={`flex items-center justify-between rounded-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isScrolled
            ? 'glass px-5 py-2 shadow-lg shadow-lavender/10'
            : 'glass px-6 py-3 shadow-xl shadow-sky/5'
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <span className={`text-lg font-heading font-bold transition-colors ${isDark ? 'text-white/90 group-hover:text-white' : 'text-gray-800 group-hover:text-gray-950'}`}>
            Arya<span className="text-sky">.</span>
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer ${
                activeSection === id
                  ? isDark ? 'text-white' : 'text-gray-900'
                  : isDark ? 'text-white/60 hover:text-white/90' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {activeSection === id && (
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-lavender/20 via-pink/20 to-sky/20 animate-gradient-shift" />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>

        {/* Right side: Theme Toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer ${isDark ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'}`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* CTA */}
          <a
            href="#contact"
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-lavender via-rose to-sky text-dark text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-sky/25 hover:scale-105 btn-glow"
          >
            <span>Let's Talk</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Mobile: Theme toggle + Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${isDark ? 'text-white/80 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/40'}`}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5 items-center">
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 mt-2 rounded-2xl glass overflow-hidden transition-all duration-400 ${
          isOpen ? 'max-h-96 opacity-100 shadow-xl shadow-lavender/5' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 flex flex-col gap-1">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeSection === id
                  ? isDark
                    ? 'text-white bg-gradient-to-r from-lavender/15 to-sky/15'
                    : 'text-gray-900 bg-gradient-to-r from-lavender/20 to-sky/20'
                  : isDark
                    ? 'text-white/60 hover:text-white hover:bg-white/5'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100/60'
              }`}
            >
              {label}
            </button>
          ))}
          <a
            href="#contact"
            className="mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-lavender via-rose to-sky text-dark text-sm font-semibold text-center transition-all hover:shadow-lg"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </nav>
  )
}