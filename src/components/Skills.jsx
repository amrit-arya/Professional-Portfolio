import { useEffect, useRef, useState, useMemo } from 'react'

const skillCategories = [
  {
    title: 'Frontend',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    gradientColors: ['#CDB4DB', '#FFC8DD'],
    skills: [
      { name: 'React / Next.js', level: 0 },
      { name: 'TypeScript', level: 0 },
      { name: 'Tailwind CSS', level: 0 },
      { name: 'HTML / CSS', level: 97 },
    ],
  },
  {
    title: 'Backend',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
    gradientColors: ['#FFC8DD', '#FFAFCC'],
    skills: [
      { name: 'Node.js / Express', level: 0 },
      { name: 'Python / Django', level: 90 },
      { name: 'PostgreSQL', level: 0 },
      { name: 'MongoDB', level: 95 },
    ],
  },
  {
    title: 'DevOps',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    gradientColors: ['#FFAFCC', '#BDE0FE'],
    skills: [
      { name: 'Ubuntu', level: 98 },
      { name: 'Git / GitHub', level: 96 },
      { name: 'Docker', level: 0 },
      { name: 'AWS / Cloud', level: 0 },
      { name: 'CI/CD Pipelines', level: 0 },
    ],
  },
  {
    title: 'Design & Other',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    gradientColors: ['#BDE0FE', '#A2D2FF'],
    skills: [
      { name: 'Figma', level: 82 },
      { name: 'UI/UX Design', level: 78 },
      { name: 'Responsive Design', level: 95 },
      { name: 'Problem Solving', level: 92 },
    ],
  },
]

// Helper: create arc path for an SVG ring segment
function describeArc(cx, cy, radius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, endAngle)
  const end = polarToCartesian(cx, cy, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`
}

function polarToCartesian(cx, cy, radius, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180.0
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  }
}

function RadialSkillChart({ skills, gradientColors, isVisible, categoryIndex, icon }) {
  const containerRef = useRef(null)
  const [tilt, setTilt] = useState({ rotateX: 5, rotateY: -2 })
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const rafRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      const rotateY = (x - 0.5) * 20
      const rotateX = (0.5 - y) * 16
      setTilt({ rotateX, rotateY })
    })
  }

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setTilt({ rotateX: 5, rotateY: -2 })
    setHoveredIndex(-1)
  }

  const size = 260
  const cx = size / 2
  const cy = size / 2
  const baseRadius = 48
  const ringSpacing = 22
  const strokeWidth = 14

  const avgLevel = useMemo(() => {
    const validSkills = skills.filter((s) => s.level > 0)
    if (validSkills.length === 0) return 0
    return Math.round(validSkills.reduce((sum, s) => sum + s.level, 0) / validSkills.length)
  }, [skills])

  const gradId = `radial-grad-${categoryIndex}`
  const glowFilterId = `radial-glow-${categoryIndex}`

  return (
    <div
      ref={containerRef}
      className="skill-graph-3d"
      style={{ perspective: '900px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="skill-graph-inner"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out',
        }}
      >
        <svg viewBox={`0 0 ${size} ${size}`} className="radial-chart-svg">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradientColors[0]} />
              <stop offset="100%" stopColor={gradientColors[1]} />
            </linearGradient>
            <filter id={glowFilterId} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Individual glow filter for hovered arc */}
            <filter id={`${glowFilterId}-intense`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Decorative crosshair grid */}
          <circle cx={cx} cy={cy} r={baseRadius - 16} fill="none" stroke="white" strokeOpacity="0.03" strokeWidth="0.5" />
          <line x1={cx} y1={20} x2={cx} y2={size - 20} stroke="white" strokeOpacity="0.03" strokeWidth="0.5" />
          <line x1={20} y1={cy} x2={size - 20} y2={cy} stroke="white" strokeOpacity="0.03" strokeWidth="0.5" />

          {/* Concentric ring tracks + fill arcs */}
          {skills.map((skill, i) => {
            const radius = baseRadius + i * ringSpacing
            const circumference = 2 * Math.PI * radius
            const fillAngle = (skill.level / 100) * 340 // max 340° to leave a small gap
            const isHovered = hoveredIndex === i
            const trackOpacity = isHovered ? 0.1 : 0.05
            const delay = categoryIndex * 0.2 + i * 0.12

            // Color interpolation between the two gradient colors based on index
            const t = skills.length > 1 ? i / (skills.length - 1) : 0
            const arcColor = interpolateColor(gradientColors[0], gradientColors[1], t)

            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(-1)}
                style={{ cursor: 'pointer' }}
              >
                {/* Background track ring */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill="none"
                  stroke="white"
                  strokeOpacity={trackOpacity}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  className="radial-track-ring"
                  style={{
                    strokeDasharray: `${(340 / 360) * circumference} ${circumference}`,
                    strokeDashoffset: 0,
                    transform: 'rotate(-170deg)',
                    transformOrigin: `${cx}px ${cy}px`,
                    transition: 'stroke-opacity 0.3s ease',
                  }}
                />

                {/* Filled arc */}
                {skill.level > 0 && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill="none"
                    stroke={arcColor}
                    strokeWidth={strokeWidth - 2}
                    strokeLinecap="round"
                    filter={isHovered ? `url(#${glowFilterId}-intense)` : `url(#${glowFilterId})`}
                    className="radial-arc-fill"
                    style={{
                      strokeDasharray: `${circumference}`,
                      strokeDashoffset: isVisible
                        ? circumference - (fillAngle / 360) * circumference
                        : circumference,
                      transform: 'rotate(-170deg)',
                      transformOrigin: `${cx}px ${cy}px`,
                      transition: `stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s, filter 0.3s ease`,
                      opacity: isVisible ? (isHovered ? 1 : 0.85) : 0,
                    }}
                  />
                )}

                {/* Skill level = 0: show a subtle dashed indicator */}
                {skill.level === 0 && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill="none"
                    stroke={arcColor}
                    strokeOpacity={isVisible ? 0.15 : 0}
                    strokeWidth={strokeWidth - 6}
                    strokeDasharray="4 8"
                    strokeLinecap="round"
                    style={{
                      transform: 'rotate(-170deg)',
                      transformOrigin: `${cx}px ${cy}px`,
                      transition: `stroke-opacity 0.8s ease ${delay}s`,
                    }}
                  />
                )}

                {/* End-cap glow dot for filled arcs */}
                {skill.level > 0 && isVisible && (
                  <>
                    {(() => {
                      const endAngleDeg = -170 + fillAngle
                      const endPos = polarToCartesian(cx, cy, radius, endAngleDeg + 90)
                      return (
                        <circle
                          cx={endPos.x}
                          cy={endPos.y}
                          r={isHovered ? 5 : 3}
                          fill={arcColor}
                          className="radial-end-dot"
                          style={{
                            opacity: isVisible ? 1 : 0,
                            filter: `drop-shadow(0 0 ${isHovered ? 8 : 4}px ${arcColor})`,
                            transition: `r 0.3s ease, filter 0.3s ease, opacity 0.6s ease ${delay + 1.2}s`,
                          }}
                        />
                      )
                    })()}
                  </>
                )}

                {/* Label positioned outside the outermost ring */}
                {(() => {
                  const labelAngle = -170 + (skill.level > 0 ? Math.min(fillAngle, 340) : 20)
                  const labelRadius = baseRadius + (skills.length - 1) * ringSpacing + 22
                  const labelPos = polarToCartesian(cx, cy, labelRadius, 200 + i * (340 / skills.length) + 90)
                  // Place labels on right side for better readability
                  const rightSide = labelPos.x > cx

                  return (
                    <text
                      x={rightSide ? size - 8 : 8}
                      y={28 + i * 16}
                      fill="white"
                      fillOpacity={isVisible ? (isHovered ? 0.9 : 0.5) : 0}
                      fontSize="9"
                      fontWeight={isHovered ? '700' : '400'}
                      textAnchor={rightSide ? 'end' : 'start'}
                      fontFamily="'Saira', sans-serif"
                      className="radial-label"
                      style={{
                        transition: `fill-opacity 0.6s ease ${delay + 0.5}s, font-weight 0.2s ease`,
                      }}
                    >
                      <tspan fill={arcColor} fillOpacity={isVisible ? (isHovered ? 1 : 0.7) : 0}>●</tspan>
                      {' '}{skill.name}
                      <tspan
                        fill={arcColor}
                        fillOpacity={isVisible ? 1 : 0}
                        fontWeight="700"
                        dx="6"
                      >
                        {skill.level > 0 ? `${skill.level}%` : '—'}
                      </tspan>
                    </text>
                  )
                })()}
              </g>
            )
          })}

          {/* Center content */}
          <g
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.8s ease 0.6s',
            }}
          >
            {/* Center glow circle */}
            <circle cx={cx} cy={cy} r={24} fill={gradientColors[0]} fillOpacity="0.06" className="radial-center-glow" />
            <circle cx={cx} cy={cy} r={16} fill={gradientColors[0]} fillOpacity="0.04" />

            {/* Average percentage */}
            <text
              x={cx}
              y={cy + 1}
              fill="white"
              fillOpacity="0.9"
              fontSize="18"
              fontWeight="800"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="'Saira', sans-serif"
            >
              {avgLevel > 0 ? `${avgLevel}` : '—'}
            </text>
            <text
              x={cx}
              y={cy + 16}
              fill={gradientColors[0]}
              fillOpacity="0.6"
              fontSize="7"
              fontWeight="600"
              textAnchor="middle"
              fontFamily="'Saira', sans-serif"
              letterSpacing="1.5"
            >
              AVG
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}

// Simple hex color interpolation
function interpolateColor(hex1, hex2, t) {
  const r1 = parseInt(hex1.slice(1, 3), 16)
  const g1 = parseInt(hex1.slice(3, 5), 16)
  const b1 = parseInt(hex1.slice(5, 7), 16)
  const r2 = parseInt(hex2.slice(1, 3), 16)
  const g2 = parseInt(hex2.slice(3, 5), 16)
  const b2 = parseInt(hex2.slice(5, 7), 16)
  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const b = Math.round(b1 + (b2 - b1) * t)
  return `rgb(${r}, ${g}, ${b})`
}

export default function Skills() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 px-6">
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-rose/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'scroll-hidden'}`}>
          <span className="text-sm font-semibold tracking-widest uppercase text-rose/80">What I do</span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mt-3 gradient-text">Skills & Expertise</h2>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-rose to-lavender" />
          <p className="mt-6 text-white/40 max-w-xl mx-auto">Technologies and tools I use to bring products to life.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, i) => (
            <div
              key={i}
              className={`group glass-card rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-lavender/5 gradient-border ${isVisible ? 'animate-fade-in-up' : 'scroll-hidden'}`}
              style={{ animationDelay: `${0.15 * i}s` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="p-2.5 rounded-xl text-dark/80 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${category.gradientColors[0]}, ${category.gradientColors[1]})`,
                  }}
                >
                  {category.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-white/90">{category.title}</h3>
              </div>
              <RadialSkillChart
                skills={category.skills}
                gradientColors={category.gradientColors}
                isVisible={isVisible}
                categoryIndex={i}
                icon={category.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
