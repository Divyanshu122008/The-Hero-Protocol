import { useScrollReveal } from '../hooks/useScrollReveal'

export default function EventHighlights() {
  const [headerRef, headerVisible] = useScrollReveal(0.15)
  const [cardsRef, cardsVisible] = useScrollReveal(0.1)

  const reveal = (visible) =>
    `transition-all duration-700 ease-out ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`

  const HIGHLIGHTS = [
    {
      code: "01 // MISSION",
      category: "MISSION",
      title: "CLASSIFIED OBJECTIVES",
      desc: "High-stakes technical problem-solving trials designed to test analytical grit, architectural thinking, and algorithmic execution.",
      status: "TACTICAL BRIEFING",
    },
    {
      code: "02 // EXPERIENCE",
      category: "EXPERIENCE",
      title: "CINEMATIC IMMERSION",
      desc: "A multi-phase superhero recruitment experience built from the ground up, turning standard technical challenges into an interactive mission.",
      status: "LIVE ARENA",
    },
    {
      code: "03 // NETWORK",
      category: "NETWORK",
      title: "THE HERO COALITION",
      desc: "Direct convergence with fellow student developers, AI/ML innovators, and the leadership of GeeksForGeeks Student Chapter, Bennett University.",
      status: "CORE ALLIANCE",
    },
    {
      code: "04 // CHALLENGE",
      category: "CHALLENGE",
      title: "TRIAL BY FIRE",
      desc: "Multi-tiered evaluations across specialized technical tracks to identify and induct the next echelon of core technical talent.",
      status: "SELECTION TRIAL",
    },
  ]

  return (
    <section
      id="highlights"
      className="relative min-h-screen flex flex-col justify-center px-6 py-28 bg-[var(--color-bg)] overflow-hidden"
    >
      {/* Background HUD elements */}
      <div className="hud-grid absolute inset-0 opacity-15 pointer-events-none" />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-15"
        style={{ background: 'var(--color-accent)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div ref={headerRef} className={`text-center mb-20 ${reveal(headerVisible)}`}>
          <p className="text-xs md:text-sm tracking-[0.35em] text-[var(--color-accent)] font-mono uppercase mb-4">
            CLASSIFIED // PROTOCOL BLUEPRINTS
          </p>
          <h2 className="display text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-[var(--color-text)]">
            Event Highlights
          </h2>
          <p className="mt-4 text-sm md:text-base text-[var(--color-text-muted)] tracking-wider max-w-xl mx-auto">
            Four foundational pillars defining The Hero Protocol experience at Bennett University.
          </p>
          <div className="w-16 h-0.5 bg-[var(--color-accent)] mx-auto mt-6" />
        </div>

        {/* Highlights Grid with Cinematic HUD Styling */}
        <div
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 ${reveal(cardsVisible)}`}
        >
          {HIGHLIGHTS.map((item, index) => (
            <div
              key={item.category}
              className="group relative border border-[var(--color-border)] bg-[var(--color-bg-card)] backdrop-blur-md p-8 sm:p-10 transition-all duration-500 hover:border-[var(--color-border-glow)] hover:-translate-y-1"
            >
              {/* Corner tactical brackets */}
              <div className="hud-corner-tl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="hud-corner-tr opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="hud-corner-bl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="hud-corner-br opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Top metadata line */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs tracking-[0.25em] text-[var(--color-accent)]">
                  {item.code}
                </span>
                <span className="font-mono text-[10px] tracking-widest px-2.5 py-1 uppercase bg-white/5 border border-white/10 text-[var(--color-text-muted)]">
                  {item.status}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="display text-2xl sm:text-3xl font-bold tracking-wide text-[var(--color-text)] mb-4 group-hover:text-white transition-colors">
                {item.title}
              </h3>
              <p className="text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed">
                {item.desc}
              </p>

              {/* Bottom decorative telemetry */}
              <div className="mt-8 pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-[10px] font-mono text-[var(--color-text-muted)] tracking-wider">
                <span>SECTOR // 0{index + 1}</span>
                <span className="text-[var(--color-accent)] group-hover:translate-x-1 transition-transform">
                  STATUS: PENDING BRIEFING &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
