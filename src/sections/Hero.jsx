import { useEffect, useRef } from 'react'
import animationVideo from '../assets/animation.mp4'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Interactive 3D Mouse Parallax
    const handleMouseMove = (e) => {
      const x = (window.innerWidth / 2 - e.pageX) / 28
      const y = (window.innerHeight / 2 - e.pageY) / 28

      // Rotate the 3D Canvas with smooth damping
      canvas.style.transform = `rotateX(${55 + y / 2}deg) rotateZ(${-22 + x / 2}deg)`

    }

    // Entrance Animation
    canvas.style.opacity = '0'
    canvas.style.transform = 'rotateX(85deg) rotateZ(0deg) scale(0.85)'

    const timeout = setTimeout(() => {
      canvas.style.transition = 'all 2.2s cubic-bezier(0.16, 1, 0.3, 1)'
      canvas.style.opacity = '1'
      canvas.style.transform = 'rotateX(55deg) rotateZ(-22deg) scale(1)'
    }, 250)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timeout)
    }
  }, [])

  const handleEnterMission = (e) => {
    e.preventDefault()
    const el = document.getElementById('mission')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-[#08090b] flex items-center justify-center select-none"
    >
      {/* 1. Background Layer: looping mission footage */}
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src={animationVideo}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-[1] bg-black/45 pointer-events-none" />

      {/* 2. SVG Film Grain Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id="hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-15"
        style={{ filter: 'url(#hero-grain)' }}
      />

      {/* 3. 3D Isometric Topographical Canvas with Parallax Layers */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]"
        style={{ perspective: '2200px' }}
      >
        <div
          ref={canvasRef}
          className="relative w-[340px] sm:w-[540px] md:w-[720px] lg:w-[840px] h-[360px] sm:h-[440px] md:h-[500px]"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* 3D Elevation Topographical Contours */}
          <div
            className="absolute -inset-[50%] pointer-events-none"
            style={{
              backgroundImage:
                'repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 40px, rgba(255,255,255,0.06) 41px, transparent 42px)',
              transform: 'translateZ(130px)',
            }}
          />
        </div>
      </div>

      {/* 4. Tactical Interface Grid & Right-Shifted Content */}
      <div className="relative z-20 w-full min-h-screen p-6 sm:p-10 md:p-14 lg:p-20 grid grid-cols-1 md:grid-cols-2 grid-rows-[auto_1fr_auto] pointer-events-none">
        
        {/* Top-Left: Operational Brand Identification */}
        <div className="flex items-center gap-3 self-start">
          <div className="w-2.5 h-2.5 bg-[var(--color-accent)] animate-ping rounded-full" />
          <div>
            <p className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-white font-bold">
              GFG × BENNETT UNIVERSITY
            </p>
            <p className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[var(--color-text-muted)]">
              HALIDE_CORE // PROTOCOL ARCHIVE 2026
            </p>
          </div>
        </div>

        {/* Top-Right: Telemetry Coordinates */}
        <div className="text-right font-mono text-[10px] sm:text-xs tracking-widest text-[var(--color-accent)] self-start space-y-0.5">
          <div>LATITUDE: 28.4595° N // 77.5141° E</div>
          <div className="text-[var(--color-text-muted)]">FOCAL DEPTH: 80MM // TOPOGRAPHICAL LIGHT</div>
          <div className="text-white/80">SECURITY CLEARANCE: LEVEL 8</div>
        </div>

        {/* Center / Right: Right-Shifted Headline */}
        <div className="col-span-1 md:col-span-2 self-center flex flex-col items-end text-right my-auto py-12 md:py-0">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm tracking-[0.35em] text-[var(--color-accent)] font-mono uppercase mb-3">
              [ CLASSIFIED TECHNICAL RECRUITMENT ]
            </p>
            <h1 className="display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] font-black tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
              The Hero
              <br />
              <span style={{ color: 'var(--color-accent)' }}>Protocol</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-[var(--color-text-muted)] tracking-wide max-w-lg ml-auto font-sans">
              Every hero has a first mission. Explore the multi-layered arena and claim your clearance.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Classified Mission Intel & Brutalist CTA Button */}
        <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 self-end pt-8 border-t border-white/10">
          
          {/* Bottom Left Dossier Stamp */}
          <div className="font-mono text-xs sm:text-sm space-y-1">
            <p className="text-white font-bold tracking-widest">[ SQUADRON ALPHA // DEPLOYED ]</p>
            <p className="text-[10px] sm:text-xs text-[var(--color-text-muted)] tracking-wider">
              SURFACE TENSION & TOPOGRAPHICAL MISSION MATRIX
            </p>
          </div>

          {/* Bottom Right Brutalist Angled CTA Button */}
          <div className="pointer-events-auto">
            <button
              onClick={handleEnterMission}
              className="px-8 sm:px-12 py-3.5 sm:py-4 bg-[var(--color-text)] text-[var(--color-bg)] font-bold text-xs sm:text-sm font-mono tracking-[0.25em] uppercase transition-all duration-300 hover:bg-[var(--color-accent)] hover:text-white hover:-translate-y-1 cursor-pointer shadow-2xl flex items-center gap-3 group"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%)',
              }}
            >
              <span>ENTER THE MISSION</span>
              <span className="transform group-hover:translate-x-1.5 transition-transform">&rarr;</span>
            </button>
          </div>

        </div>

      </div>

      {/* 5. Flowing Vertical Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-20 flex flex-col items-center gap-1.5">
        <span className="text-[9px] font-mono tracking-[0.3em] text-[var(--color-text-muted)] uppercase">
          SCROLL
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--color-accent)] to-transparent animate-pulse" />
      </div>
    </section>
  )
}