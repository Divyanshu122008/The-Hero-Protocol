export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#050608] border-t border-[var(--color-border)] py-16 px-6 overflow-hidden">
      {/* Top subtle glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-30" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Branding */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-[10px] sm:text-xs tracking-[0.35em] text-[var(--color-accent)] font-mono uppercase mb-2">
            GFG × BENNETT UNIVERSITY
          </p>
          <h3 className="display text-2xl sm:text-3xl font-bold tracking-wider text-[var(--color-text)]">
            THE HERO PROTOCOL
          </h3>
          <p className="text-xs text-[var(--color-text-muted)] tracking-wider mt-1 font-mono">
            CLASSIFIED TECHNICAL RECRUITMENT INITIATIVE
          </p>
        </div>

        {/* Center: Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {[
            { label: 'MISSION', href: '#mission' },
            { label: 'HEROES', href: '#heroes' },
            { label: 'EVENT', href: '#highlights' },
            { label: 'REGISTER', href: '#register' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="display text-sm tracking-[0.2em] text-[var(--color-text-muted)] hover:text-white transition-colors duration-300 relative group py-1"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right: Back to Top & Coordinates */}
        <div className="flex flex-col items-center md:items-end">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors p-2"
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
          <span className="text-[10px] font-mono text-[var(--color-text-muted)] opacity-60 mt-1">
            28.4595° N, 77.5141° E // GREATER NOIDA
          </span>
        </div>

      </div>

      {/* Bottom Copyright Line */}
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)] text-center gap-3">
        <p>
          © {new Date().getFullYear()} GeeksForGeeks Student Chapter, Bennett University. All rights reserved.
        </p>
        <p className="opacity-70">
          FORGED FOR JUNIOR CORE TECHNICAL SELECTION
        </p>
      </div>
    </footer>
  )
}
