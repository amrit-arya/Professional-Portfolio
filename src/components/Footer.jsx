export default function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-white/5">
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lavender/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lavender via-pink to-sky flex items-center justify-center text-dark font-bold font-heading text-xs">
              A
            </div>
            <span className="text-base font-heading font-semibold text-white/70">
              Amrit Arya
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {['Home', 'About', 'Education', 'Projects', 'Skills', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-white/30 hover:text-white/70 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-white/20">
            © {new Date().getFullYear()} Amrit Arya
          </p>
        </div>
      </div>
    </footer>
  )
}
