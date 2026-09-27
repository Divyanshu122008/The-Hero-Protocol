import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Timeline() {
  const [headerRef, headerVisible] = useScrollReveal(0.15)
  const [timelineRef, timelineVisible] = useScrollReveal(0.1)

  const reveal = (visible) =>
    `transition-all duration-700 ease-out ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`

  const STEPS = [
    {
      phase: "01",
      title: "REGISTRATION",
      status: "COMING SOON",
      statusColor: "text-[var(--color-accent)] border-[var(--color-accent)] bg-[var(--color-accent-soft)]",
      desc: "Candidate recruitment portal declassification. All Bennett University aspirants submit technical dossiers and credentials.",
      indicator: "PRIMARY INTAKE",
    },
    {
      phase: "02",
      title: "EVENT BEGINS",
      status: "TO BE ANNOUNCED",
      statusColor: "text-[var(--color-text-muted)] border-white/20 bg-white/5",
      desc: "Opening keynote, protocol activation, and assignment of classified briefing tracks.",
      indicator: "KEYNOTE & CONVERGENCE",
    },
    {
      phase: "03",
      title: "MAIN EXPERIENCE",
      status: "TO BE ANNOUNCED",
      statusColor: "text-[var(--color-text-muted)] border-white/20 bg-white/5",
      desc: "Recruits enter the live arena for core algorithmic and system engineering challenges.",
      indicator: "TACTICAL SPRINT",
    },
    {
      phase: "04",
      title: "FINAL MISSION",
      status: "TO BE ANNOUNCED",
      statusColor: "text-[var(--color-text-muted)] border-white/20 bg-white/5",
      desc: "Final jury evaluation, technical debriefing, and official induction into the GFG Core Team.",
      indicator: "CORE INDUCTION",
    },
  ]

  return (
    <section
      id="timeline"
      className="relative min-h-screen flex flex-col justify-center px-6 py-28 bg-[var(--color-bg-elevated)] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="hud-grid absolute inset-0 opacity-10 pointer-events-none" />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-15"
        style={{ background: 'var(--color-accent)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <div ref={headerRef} className={`text-center mb-20 ${reveal(headerVisible)}`}>
          <p className="text-xs md:text-sm tracking-[0.35em] text-[var(--color-accent)] font-mono uppercase mb-4">
            OPERATION SCHEDULE // TIMELINE
          </p>
          <h2 className="display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[var(--color-text)]">
            Mission Trajectory
          </h2>
          <p className="mt-4 text-sm md:text-base text-[var(--color-text-muted)] tracking-wider max-w-md mx-auto">
            Sequential phases for the recruitment protocol. Official dates declassifying soon.
          </p>
          <div className="w-16 h-0.5 bg-[var(--color-accent)] mx-auto mt-6" />
        </div>

        {/* Vertical Timeline Structure */}
        <div ref={timelineRef} className={`relative ${reveal(timelineVisible)}`}>
          {/* Vertical central spine line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--color-accent)] to-transparent opacity-40" />

          <div className="space-y-12">
            {STEPS.map((step, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={step.phase}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Glowing Node Marker */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-accent)]">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-ping" />
                  </div>

                  {/* Spacer for other side on desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card Content */}
                  <div
                    className={`ml-12 md:ml-0 w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] ${
                      isEven ? 'md:pr-10' : 'md:pl-10'
                    }`}
                  >
                    <div className="border border-[var(--color-border)] bg-[var(--color-bg)] p-6 sm:p-8 relative group hover:border-[var(--color-border-glow)] transition-all duration-300">
                      <div className="hud-corner-tl" />
                      <div className="hud-corner-br" />

                      {/* Header row with Phase and Status */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="display text-xl sm:text-2xl text-[var(--color-accent)]">
                          {step.phase} — {step.title}
                        </span>
                        <span
                          className={`font-mono text-[10px] tracking-widest px-2.5 py-1 border uppercase font-medium ${step.statusColor}`}
                        >
                          {step.status}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                        {step.desc}
                      </p>

                      {/* Indicator tag */}
                      <div className="flex items-center gap-2 pt-3 border-t border-[var(--color-border)] text-[10px] font-mono text-[var(--color-text-muted)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] opacity-70" />
                        <span className="tracking-widest uppercase">{step.indicator}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
