import { useEffect, useRef, useState } from 'react'

export default function Contact() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! I will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  const socials = [
    { name: 'GitHub', href: '#', icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /> },
    { name: 'LinkedIn', href: '#', icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> },
    { name: 'Twitter', href: '#', icon: <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /> },
  ]

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 px-6">
      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-pink/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-sm font-semibold tracking-widest uppercase text-light-blue/80">Reach out</span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mt-3 gradient-text">Get In Touch</h2>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-light-blue to-pink" />
          <p className="mt-6 text-white/40 max-w-lg mx-auto">Have a project in mind? Let's create something amazing together.</p>
        </div>

        <div className={`glass-card rounded-3xl p-8 sm:p-12 gradient-border ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm text-white/50 mb-2 font-medium">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 transition-all duration-300 hover:border-white/20 focus:border-sky/50"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm text-white/50 mb-2 font-medium">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 transition-all duration-300 hover:border-white/20 focus:border-sky/50"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm text-white/50 mb-2 font-medium">Message</label>
              <textarea
                id="contact-message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 transition-all duration-300 hover:border-white/20 focus:border-sky/50 resize-none"
                placeholder="Tell me about your project..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-lavender via-pink to-sky text-dark font-semibold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-sky/20 hover:scale-105 btn-glow cursor-pointer"
            >
              Send Message
            </button>
          </form>

          {/* Social links */}
          <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-center gap-4">
            {socials.map((s) => (
              <a key={s.name} href={s.href} aria-label={s.name} className="w-12 h-12 rounded-xl glass flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">{s.icon}</svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
