import { useEffect, useRef, useState } from 'react'

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const step = Math.ceil(target / 40)
          const timer = setInterval(() => {
            start += step
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(start)
            }
          }, 30)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

const stats = [
  { value: 15, suffix: '+', label: 'Projects Completed' },
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 10, suffix: '+', label: 'Technologies' },
  { value: 100, suffix: '%', label: 'Dedication' },
]

export default function About() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-6">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-lavender/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-sky/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-sm font-semibold tracking-widest uppercase text-sky/80">Get to know me</span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mt-3 gradient-text">
            About Me
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-lavender to-sky" />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image/Visual Side */}
          <div className={`relative ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-lavender/20 via-pink/10 to-sky/20 blur-xl" />
              <div className="relative rounded-3xl overflow-hidden glass-card p-8">
                {/* Avatar placeholder with gradient */}
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-lavender/30 via-dark-surface to-sky/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-lavender via-pink to-sky flex items-center justify-center mb-6">
                      <span className="text-5xl font-heading font-bold text-dark">AA</span>
                    </div>
                    <p className="text-white/40 text-sm">Your photo here</p>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 px-5 py-3 rounded-2xl glass-card gradient-border animate-float">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-medium text-white/80">Available for work</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className={`${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white/90 mb-6">
              A passionate developer who loves building
              <span className="text-pink"> impactful</span> software
            </h3>
            <div className="space-y-4 text-white/50 leading-relaxed">
              <p>
                Hey there! I'm Amrit Arya, a Full Stack Developer passionate about creating 
                elegant digital solutions. I specialize in building modern, responsive web 
                applications that deliver exceptional user experiences.
              </p>
              <p>
                With expertise spanning across the entire development stack, I bring ideas to life 
                using cutting-edge technologies. From crafting pixel-perfect UI components to 
                architecting robust backend systems, I thrive on transforming complex problems 
                into intuitive, beautiful products.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing 
                to open-source projects, or sharing knowledge with the developer community.
              </p>
            </div>

            {/* Quick info badges */}
            <div className="flex flex-wrap gap-3 mt-8">
              {['React.js', 'Node.js', 'TypeScript', 'Python', 'MongoDB'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-xl glass-card text-sm text-white/60 hover:text-white hover:border-sky/30 transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group glass-card rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:border-lavender/25 gradient-border"
            >
              <div className="text-3xl sm:text-4xl font-heading font-bold gradient-text mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
