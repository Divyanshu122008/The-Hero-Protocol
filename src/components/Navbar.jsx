import { useState, useEffect } from 'react'

export default function Navbar({ selectedHero }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'MISSION', href: '#mission' },
    { label: 'HEROES', href: '#heroes' },
    { label: 'HIGHLIGHTS', href: '#highlights' },
    { label: 'TIMELINE', href: '#timeline' },
    { label: 'REGISTER', href: '#register' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${selectedHero?.themeClass || ''} ${
        isScrolled
          ? 'bg-[#08090b]/90 backdrop-blur-md border-b border-[var(--color-border)] py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo / Tag */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded border border-[var(--color-accent)] flex items-center justify-center bg-[var(--color-accent-soft)] transition-transform duration-300 group-hover:scale-105">
            <span className="font-bold text-xs text-[var(--color-accent)] font-mono">GFG</span>
          </div>
          <div className="flex flex-col">
            <span className="display text-sm tracking-wider font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">
              THE HERO PROTOCOL
            </span>
            <span className="text-[9px] tracking-widest text-[var(--color-text-muted)] font-mono -mt-1">
              BENNETT UNIVERSITY
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="display text-xs tracking-[0.2em] text-[var(--color-text-muted)] hover:text-white transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Status Pill & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          
          {/* Chosen Hero Badge or System Status */}
          {selectedHero ? (
            <a
              href="#heroes"
              className="flex items-center gap-2 px-3 py-1 border border-emerald-500/40 bg-emerald-500/10 rounded-full text-[10px] font-mono tracking-widest text-emerald-400 hover:bg-emerald-500/20 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>RECRUIT: {selectedHero.name}</span>
            </a>
          ) : (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 rounded-full text-[10px] font-mono tracking-widest text-[var(--color-text-muted)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>SYS: ACTIVE</span>
            </div>
          )}

          <a
            href="#heroes"
            className="hidden lg:inline-flex px-4 py-1.5 border border-[var(--color-accent)] text-xs font-mono tracking-widest uppercase text-white hover:bg-[var(--color-accent)] transition-colors duration-300"
          >
            {selectedHero ? 'CHANGE HERO' : 'CHOOSE HERO'}
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[var(--color-text)] focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0b0e] border-b border-[var(--color-border)] px-6 py-6 animate-fadeIn">
          <nav className="flex flex-col gap-4">
            {selectedHero && (
              <div className="p-3 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs tracking-widest">
                ACTIVE HERO: {selectedHero.name}
              </div>
            )}
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="display text-base tracking-[0.2em] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] py-2 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#heroes"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-3 bg-[var(--color-accent)] text-white font-mono text-xs tracking-widest uppercase font-bold"
              >
                {selectedHero ? 'CHANGE CHOSEN HERO' : 'CHOOSE YOUR HERO'}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
