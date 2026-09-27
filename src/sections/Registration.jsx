import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Registration({ selectedHero }) {
  const [contentRef, contentVisible] = useScrollReveal(0.2)
  const [showNotice, setShowNotice] = useState(false)

  const reveal = (visible) =>
    `transition-all duration-1000 ease-out ${
      visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    }`

  const handleRegisterClick = (e) => {
    e.preventDefault()
    setShowNotice(true)
  }

  return (
    <section
      id="register"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-28 bg-[var(--color-bg)] overflow-hidden text-center"
    >
      {/* Dramatic Radar/Sonar Sweep Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Pulsing Concentric Rings */}
        <div className="w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-white/5 animate-ping opacity-20" />
        <div className="w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] md:w-[900px] md:h-[900px] rounded-full border border-[var(--color-accent)] opacity-10 animate-spin-slow" />
        
        {/* Deep atmospheric radial glow */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-25"
          style={{ background: 'var(--color-accent)' }}
        />
      </div>

      <div className="hud-grid absolute inset-0 opacity-15 pointer-events-none" />

      {/* Main Content Area */}
      <div
        ref={contentRef}
        className={`relative z-10 max-w-4xl mx-auto flex flex-col items-center ${reveal(contentVisible)}`}
      >
        {/* Eyebrow Label */}
        <div className="flex items-center gap-3 mb-6 px-4 py-1.5 border border-white/10 bg-white/5 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[var(--color-text-muted)]">
            FINAL DIRECTIVE // INITIATION PROTOCOL
          </span>
        </div>

        {/* Large Cinematic Typography */}
        <h2 className="display text-5xl sm:text-7xl md:text-9xl font-black leading-[0.9] tracking-tight text-[var(--color-text)] mb-4">
          Your Mission
          <br />
          <span style={{ color: 'var(--color-accent)' }}>Awaits.</span>
        </h2>

        {/* Selected Hero Tactical Dossier Badge */}
        {selectedHero ? (
          <div className="my-4 px-6 py-3 border border-emerald-500/40 bg-emerald-500/10 backdrop-blur-md inline-flex items-center gap-3 text-left">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <p className="text-[10px] font-mono tracking-widest uppercase text-emerald-400">
                RECRUIT ALIGNMENT LOCKED:
              </p>
              <p className="display text-lg sm:text-xl text-white tracking-wide">
                {selectedHero.name} &bull; <span className="font-mono text-xs text-[var(--color-text-muted)]">{selectedHero.protocolCode}</span>
              </p>
            </div>
          </div>
        ) : (
          <a
            href="#heroes"
            className="my-3 text-xs font-mono text-[var(--color-accent)] tracking-widest hover:underline"
          >
            [ TIP: CHOOSE YOUR HERO ABOVE TO LOCK IN YOUR RECRUIT PROTOCOL ]
          </a>
        )}

        {/* Supporting Text */}
        <p className="display text-lg sm:text-2xl md:text-3xl tracking-[0.2em] text-[var(--color-text)] mb-3">
          ARE YOU READY TO ENTER?
        </p>

        <p className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-xl mx-auto mb-10 tracking-wide leading-relaxed">
          The selection trial for the GeeksForGeeks Student Chapter Core Technical Team begins shortly.
          Prove your mettle, forge your legacy, and claim your protocol clearance.
        </p>

        {/* Primary CTA Button */}
        <div className="relative group">
          {/* Button Outer Glow */}
          <div
            className="absolute -inset-1 rounded-sm blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'var(--color-accent)' }}
          />

          <button
            onClick={handleRegisterClick}
            className="relative px-10 sm:px-14 py-4 sm:py-5 bg-[var(--color-accent)] text-white font-bold text-sm sm:text-base tracking-[0.25em] uppercase transition-all duration-300 transform group-hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-3 cursor-pointer"
          >
            <span>REGISTER NOW</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        {/* Tactical status annotation */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 text-xs font-mono text-[var(--color-text-muted)] tracking-widest">
          <span>CLEARANCE: LEVEL 8</span>
          <span className="hidden sm:inline">•</span>
          <span>CAMPUS EXCLUSIVE: BENNETT UNIVERSITY</span>
          <span className="hidden sm:inline">•</span>
          <span>INTEL: UNENCRYPTED</span>
        </div>

        {/* Interactive Notice Modal / Banner when user clicks "REGISTER NOW" */}
        {showNotice && (
          <div className="mt-8 p-4 sm:p-6 border border-[var(--color-accent)] bg-[var(--color-bg-elevated)] backdrop-blur-xl max-w-md w-full relative animate-fadeIn shadow-2xl text-left">
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />

            <div className="flex items-center gap-2 mb-2 text-[var(--color-accent)] font-mono text-xs tracking-widest uppercase">
              <span className="animate-ping w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <span>CLASSIFIED DISPATCH</span>
            </div>
            
            <p className="text-sm text-[var(--color-text)] font-semibold mb-2">
              Registration Portal Declassifying Soon
            </p>
            {selectedHero && (
              <p className="text-xs text-emerald-400 font-mono mb-2">
                Your dossier has been designated for: {selectedHero.name} Protocol Track.
              </p>
            )}
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-4">
              Official registration forms and intake slots are currently being finalized.
              Watch the official GFG Bennett University Discord and Instagram for the live link!
            </p>

            <button
              onClick={() => setShowNotice(false)}
              className="px-4 py-1.5 border border-white/20 text-xs font-mono tracking-widest uppercase hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              ACKNOWLEDGE
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
