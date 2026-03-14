import { useEffect, useRef, useState } from 'react'

const skillCategories = [
  {
    title: 'Frontend',
    color: 'from-lavender to-pink',
    skills: [
      { name: 'React / Next.js', level: 92 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'HTML / CSS', level: 97 },
    ],
  },
  {
    title: 'Backend',
    color: 'from-pink to-rose',
    skills: [
      { name: 'Node.js / Express', level: 90 },
      { name: 'Python / Django', level: 82 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 88 },
    ],
  },
  {
    title: 'Tools & DevOps',
    color: 'from-rose to-light-blue',
    skills: [
      { name: 'Git / GitHub', level: 93 },
      { name: 'Docker', level: 80 },
      { name: 'AWS / Cloud', level: 75 },
      { name: 'CI/CD Pipelines', level: 78 },
    ],
  },
  {
    title: 'Design & Other',
    color: 'from-light-blue to-sky',
    skills: [
      { name: 'Figma', level: 82 },
      { name: 'UI/UX Design', level: 78 },
      { name: 'Responsive Design', level: 95 },
      { name: 'Problem Solving', level: 92 },
    ],
  },
]

function SkillBar({ name, level, isVisible, color }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-white/60">{name}</span>
        <span className="text-xs text-white/40 font-medium">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} skill-bar-fill`}
          style={{ width: isVisible ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 px-6">
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-rose/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-sm font-semibold tracking-widest uppercase text-rose/80">What I do</span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mt-3 gradient-text">Skills & Expertise</h2>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-rose to-lavender" />
          <p className="mt-6 text-white/40 max-w-xl mx-auto">Technologies and tools I use to bring products to life.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, i) => (
            <div
              key={i}
              className={`group glass-card rounded-2xl p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-lavender/5 gradient-border ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.15 * i}s` }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-dark/80 transition-transform duration-300 group-hover:scale-110`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-bold text-white/90">{category.title}</h3>
              </div>
              <div className="space-y-5">
                {category.skills.map((skill, j) => (
                  <SkillBar key={j} name={skill.name} level={skill.level} isVisible={isVisible} color={category.color} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
