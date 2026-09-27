import { useState, useEffect, useRef } from 'react'
import { HEROES } from '../data/heroes'
import HeroVisual from '../components/HeroVisual'

export default function ChooseYourHero({ selectedHero, onSelectHero }) {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [inductionModalOpen, setInductionModalOpen] = useState(false)

  const activeHero = HEROES[activeIndex]
  const isCurrentlyChosen = selectedHero?.slug === activeHero.slug

  // Track scroll position inside this 700vh section to drive active hero selection
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const totalScrollable = rect.height - windowHeight

      if (totalScrollable <= 0) return

      // Progress goes from 0 (entry) to 1 (exit)
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(0.999, scrolled / totalScrollable))
      const targetIndex = Math.floor(progress * HEROES.length)

      if (targetIndex !== activeIndex && targetIndex >= 0 && targetIndex < HEROES.length) {
        setIsTransitioning(true)
        setActiveIndex(targetIndex)
        setTimeout(() => setIsTransitioning(false), 300)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // initial sync
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeIndex])

  // Allows clicking pagination dots or tabs to scroll directly to that hero's section
  const scrollToHero = (index) => {
    setActiveIndex(index)
    if (!containerRef.current) return
    const containerTop = window.scrollY + containerRef.current.getBoundingClientRect().top
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight
    const stepSize = totalScrollable / HEROES.length
    const targetY = containerTop + (index * stepSize) + (stepSize * 0.4)

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    })
  }

  const handleChooseHero = () => {
    if (onSelectHero) {
      onSelectHero(activeHero)
    }
    setInductionModalOpen(true)
  }

  return (
    <section
      ref={containerRef}
      id="heroes"
      className={`relative w-full transition-colors duration-700 ${activeHero.themeClass}`}
      style={{ height: '700vh' }}
    >
      {/* Sticky Stage: pinned to viewport while user scrolls through 700vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between px-4 sm:px-8 md:px-12 py-5 bg-[var(--color-bg)] select-none">
        
        {/* Dynamic Atmospheric Ambient Background */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out opacity-25"
          style={{
            background: `radial-gradient(circle 800px at 50% 50%, var(--color-accent) 0%, transparent 80%)`,
          }}
        />

        {/* Subtle classified grid overlay */}
        <div className="hud-grid absolute inset-0 pointer-events-none opacity-20" />

        {/* ---------------------------------------------------- */}
        {/* TOP BAR: Dossier Header, Quick Selector & Counter    */}
        {/* ---------------------------------------------------- */}
        <header className="relative z-20 flex flex-wrap items-center justify-between border-b border-[var(--color-border)] pb-3 gap-3">
          
          {/* Eyebrow & Status */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ background: 'var(--color-accent)' }} />
            <div>
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[var(--color-text-muted)] font-mono">
                CLASSIFIED // HERO DATABASE
              </p>
              {selectedHero && (
                <p className="text-[9px] font-mono tracking-widest text-[var(--color-accent)]">
                  ACTIVE RECRUIT ALIGNMENT: {selectedHero.name}
                </p>
              )}
            </div>
          </div>

          {/* Quick Clickable Hero Switcher Bar */}
          <div className="hidden lg:flex items-center gap-1.5 bg-black/60 p-1 border border-white/10 rounded-sm">
            {HEROES.map((h, i) => (
              <button
                key={h.id}
                onClick={() => scrollToHero(i)}
                className={`px-3 py-1 text-[10px] tracking-wider font-mono uppercase transition-all duration-200 rounded-xs flex items-center gap-1.5 cursor-pointer ${
                  i === activeIndex
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-[var(--color-text-muted)] hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{h.id}</span>
                <span>{h.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Hero Counter */}
          <div className="text-right pl-2">
            <span className="display text-2xl sm:text-3xl font-bold tracking-wider" style={{ color: 'var(--color-accent)' }}>
              {activeHero.id}
            </span>
            <span className="text-xs text-[var(--color-text-muted)] tracking-widest font-mono ml-1">
              / 07
            </span>
          </div>
        </header>

        {/* ---------------------------------------------------- */}
        {/* MAIN DISPLAY: Transforming Hero Arena                */}
        {/* ---------------------------------------------------- */}
        <div className="relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-4 lg:gap-8 my-auto max-w-7xl mx-auto w-full">
          
          {/* Left Column: Hero Name, Mantra & SELECTION ACTION */}
          <div
            className={`lg:col-span-4 flex flex-col justify-center transition-all duration-500 transform ${
              isTransitioning ? 'opacity-40 -translate-x-4' : 'opacity-100 translate-x-0'
            }`}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-px bg-[var(--color-accent)]" />
              <span className="text-[10px] sm:text-xs tracking-[0.35em] text-[var(--color-accent)] uppercase font-mono">
                CHOOSE YOUR HERO
              </span>
            </div>

            {/* Giant Hero Name */}
            <h2 className="display text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight text-[var(--color-text)]">
              {activeHero.name}
            </h2>

            {/* Alter Ego & Title */}
            <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[var(--color-text-muted)] mt-2 font-mono">
              {activeHero.alterEgo} // {activeHero.title}
            </p>

            {/* 3-Word Signature Mantra */}
            <div className="my-4 flex flex-wrap lg:flex-col gap-1.5">
              {activeHero.mantra.map((word, idx) => (
                <span
                  key={idx}
                  className="display text-lg sm:text-2xl md:text-3xl tracking-widest transition-colors duration-500"
                  style={{
                    color: idx === 0 ? 'var(--color-accent)' : idx === 1 ? 'var(--color-text)' : 'var(--color-text-muted)',
                  }}
                >
                  {word}
                </span>
              ))}
            </div>

            {/* PRIMARY HERO SELECTION BUTTON */}
            <div className="mt-2 mb-4">
              <button
                onClick={handleChooseHero}
                className={`w-full sm:w-auto px-6 py-3.5 border font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg group cursor-pointer ${
                  isCurrentlyChosen
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                    : 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white hover:brightness-110 active:scale-95'
                }`}
              >
                {isCurrentlyChosen ? (
                  <>
                    <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>HERO ALIGNED // CHOSEN</span>
                  </>
                ) : (
                  <>
                    <span>ENLIST AS {activeHero.name}</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </>
                )}
              </button>
            </div>

            {/* Signature Quote */}
            <blockquote className="border-l-2 pl-3 py-1 text-xs italic text-[var(--color-text-muted)] border-[var(--color-accent)] max-w-md">
              "{activeHero.quote}"
            </blockquote>
          </div>

          {/* Center Column: Dominant Vector Hologram Visual */}
          <div
            className={`lg:col-span-5 flex flex-col items-center justify-center transition-all duration-700 transform ${
              isTransitioning ? 'scale-90 opacity-60' : 'scale-100 opacity-100'
            }`}
          >
            <HeroVisual hero={activeHero} />
          </div>

          {/* Right Column: Tactical Dossier & Metrics */}
          <div
            className={`lg:col-span-3 flex flex-col justify-center space-y-3 sm:space-y-4 transition-all duration-500 transform ${
              isTransitioning ? 'opacity-40 translate-x-4' : 'opacity-100 translate-x-0'
            }`}
          >
            {/* Classification & Role Box */}
            <div className="border border-[var(--color-border)] bg-[var(--color-bg-card)] backdrop-blur-md p-4 relative">
              <div className="hud-corner-tl" />
              <div className="hud-corner-tr" />
              <p className="text-[9px] tracking-[0.25em] text-[var(--color-text-muted)] uppercase font-mono mb-1">
                TACTICAL ASSIGNMENT
              </p>
              <p className="text-xs font-semibold text-[var(--color-text)] tracking-wider">
                {activeHero.role}
              </p>
              
              <div className="my-2 border-t border-[var(--color-border)]" />
              
              <p className="text-[9px] tracking-[0.25em] text-[var(--color-text-muted)] uppercase font-mono mb-1">
                SPECIALITY
              </p>
              <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                {activeHero.speciality}
              </p>
            </div>

            {/* Performance Metrics Bars */}
            <div className="border border-[var(--color-border)] bg-[var(--color-bg-card)] backdrop-blur-md p-4 relative space-y-2">
              <div className="hud-corner-bl" />
              <div className="hud-corner-br" />
              <p className="text-[9px] tracking-[0.25em] text-[var(--color-accent)] uppercase font-mono">
                TELEMETRY BENCHMARK
              </p>
              {activeHero.stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[10px] tracking-wider font-mono">
                    <span className="text-[var(--color-text-muted)]">{stat.label}</span>
                    <span style={{ color: 'var(--color-accent)' }}>{stat.value}</span>
                  </div>
                  <div className="w-full h-1 bg-[var(--color-border)] rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-700 rounded-full"
                      style={{
                        width: stat.value,
                        backgroundColor: 'var(--color-accent)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Live HUD Telemetry Terminal Note */}
            <div className="hidden sm:block text-[9px] font-mono tracking-widest text-[var(--color-text-muted)] border-l border-[var(--color-border)] pl-2">
              &gt; {activeHero.hudDescriptor}
            </div>
          </div>

        </div>

        {/* ---------------------------------------------------- */}
        {/* BOTTOM CONTROLS: Dots, Hero Selector, & Scroll Cue    */}
        {/* ---------------------------------------------------- */}
        <footer className="relative z-20 flex flex-col md:flex-row items-center justify-between border-t border-[var(--color-border)] pt-3 gap-3">
          
          {/* Hero Switcher Indicators (Clickable Dots) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {HEROES.map((h, i) => {
              const isActive = i === activeIndex
              return (
                <button
                  key={h.id}
                  onClick={() => scrollToHero(i)}
                  aria-label={`Jump to ${h.name}`}
                  className="group relative flex items-center justify-center p-2 focus:outline-none cursor-pointer"
                >
                  <span
                    className={`block transition-all duration-500 rounded-full ${
                      isActive
                        ? 'w-6 h-2 bg-[var(--color-accent)]'
                        : 'w-2 h-2 bg-white/20 group-hover:bg-white/60'
                    }`}
                  />
                  {/* Tooltip on hover */}
                  <span className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] tracking-widest font-mono uppercase bg-black px-2 py-0.5 border border-white/20 pointer-events-none whitespace-nowrap">
                    {h.name}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Quick Select Buttons for Fast Switching */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {HEROES.map((h, i) => (
              <button
                key={h.id}
                onClick={() => scrollToHero(i)}
                className={`px-2.5 py-1 text-[10px] tracking-widest font-mono uppercase transition-all duration-300 border cursor-pointer ${
                  i === activeIndex
                    ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent-soft)]'
                    : 'border-transparent text-[var(--color-text-muted)] hover:text-white'
                }`}
              >
                {h.name.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Scroll Cue */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] font-mono">
              SCROLL OR CLICK TO EXPLORE
            </span>
            <div className="w-10 h-px bg-[var(--color-text-muted)] relative overflow-hidden">
              <div
                className="absolute inset-y-0 w-3 bg-[var(--color-accent)] animate-[pulse_1.5s_ease-in-out_infinite]"
                style={{
                  left: `${(activeIndex / 6) * 100}%`,
                  transition: 'left 0.5s ease-out',
                }}
              />
            </div>
          </div>

        </footer>

      </div>

      {/* ---------------------------------------------------- */}
      {/* CLASSIFIED HERO INDUCTION CONFIRMATION MODAL         */}
      {/* ---------------------------------------------------- */}
      {inductionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg border-2 border-[var(--color-accent)] bg-[#0c0d12] p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-left">
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />

            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-mono text-xs tracking-widest uppercase text-emerald-400">
                  PROTOCOL SYNC COMPLETE
                </span>
              </div>
              <span className="font-mono text-[10px] tracking-widest text-[var(--color-text-muted)]">
                BU-GFG // CLEARANCE LEVEL 8
              </span>
            </div>

            <p className="text-xs font-mono tracking-widest text-[var(--color-accent)] uppercase mb-1">
              RECRUIT DESIGNATION CONFIRMED:
            </p>
            <h3 className="display text-3xl sm:text-5xl font-black text-white tracking-wide mb-3">
              {activeHero.name}
            </h3>

            <div className="border border-white/10 bg-white/5 p-4 rounded-xs mb-6 space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">PROTOCOL ID:</span>
                <span className="text-white">{activeHero.protocolCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">TACTICAL ROLE:</span>
                <span className="text-white">{activeHero.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-muted)]">SPECIALITY:</span>
                <span className="text-white">{activeHero.speciality}</span>
              </div>
            </div>

            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-6">
              You are now aligned under the <strong>{activeHero.name}</strong> protocol for the Bennett University Technical Selection Mission. The entire website theme below has morphed to match your hero!
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  setInductionModalOpen(false)
                  document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="w-full sm:w-auto flex-1 py-3 px-6 bg-[var(--color-accent)] text-white font-mono text-xs tracking-widest uppercase font-bold hover:brightness-110 transition-all cursor-pointer"
              >
                EXPLORE MISSION IN THEME &rarr;
              </button>
              <button
                onClick={() => setInductionModalOpen(false)}
                className="w-full sm:w-auto py-3 px-6 border border-white/20 text-white font-mono text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                CLOSE DOSSIER
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
