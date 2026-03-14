import { useEffect, useRef } from 'react'

export default function Hero() {
  const nameRef = useRef(null)

  useEffect(() => {
    const letters = nameRef.current?.querySelectorAll('.letter')
    letters?.forEach((letter, i) => {
      letter.style.animationDelay = `${i * 0.06}s`
    })
  }, [])

  const name = 'AMRIT ARYA'

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-lavender/20 animate-blob animate-pulse-glow" />
        <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-pink/15 animate-blob animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-32 left-1/4 w-72 h-72 rounded-full bg-sky/15 animate-blob animate-pulse-glow" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose/8 animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-light-blue/12 animate-blob" style={{ animationDelay: '3s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(162,210,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(162,210,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Subtitle */}
        <div className="animate-fade-in-up mb-6" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card text-sm text-white/70 font-medium tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-sky animate-pulse" />
            Full Stack Developer
          </span>
        </div>

        {/* Name */}
        <h1
          ref={nameRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black tracking-tight mb-8"
        >
          {name.split('').map((char, i) => (
            <span
              key={i}
              className="letter inline-block animate-fade-in-up gradient-text"
              style={{ opacity: 0, animationFillMode: 'forwards' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.8s', opacity: 0 }}>
          Crafting <span className="text-pink font-medium">beautiful</span> digital experiences with{' '}
          <span className="text-sky font-medium">modern technologies</span>. Turning ideas into elegant,
          performant web applications.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '1s', opacity: 0 }}>
          <a
            href="#projects"
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-lavender via-pink to-sky text-dark font-semibold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-sky/20 hover:scale-105 btn-glow flex items-center gap-3"
          >
            View My Work
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href="#contact"
            className="group px-8 py-4 rounded-2xl glass-card text-white/80 font-semibold text-base transition-all duration-300 hover:text-white hover:bg-white/10 hover:scale-105 flex items-center gap-3 gradient-border"
          >
            Get In Touch
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:translate-y-[-2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up" style={{ animationDelay: '1.4s', opacity: 0 }}>
          <a href="#about" className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
              <div className="w-1 h-2 rounded-full bg-current animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
