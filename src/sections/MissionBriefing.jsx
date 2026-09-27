import SpaceBackground from '../components/SpaceBackground'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function MissionBriefing() {
  const [labelRef, labelVisible] = useScrollReveal()
  const [headingRef, headingVisible] = useScrollReveal()
  const [textRef, textVisible] = useScrollReveal()
  const [panelsRef, panelsVisible] = useScrollReveal()

  // Shared fade/slide-up transition, controlled by whether the element is visible
  const reveal = (visible) =>
    `transition-all duration-700 ease-out ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`

  return (
    <section
      id="mission"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-28 bg-[var(--color-bg)] overflow-hidden"
    >
      <SpaceBackground />

      <p
        ref={labelRef}
        className={`relative z-10 text-xs md:text-sm tracking-[0.3em] text-[var(--color-accent)] font-mono mb-6 ${reveal(labelVisible)}`}
      >
        CLASSIFIED // MISSION BRIEFING
      </p>

      <h2
        ref={headingRef}
        className={`display relative z-10 text-center text-4xl sm:text-6xl md:text-8xl font-black mb-8 ${reveal(headingVisible)}`}
      >
        The Mission
      </h2>

      <p
        ref={textRef}
        className={`relative z-10 max-w-2xl text-center text-[var(--color-text-muted)] text-base md:text-lg leading-relaxed mb-16 ${reveal(textVisible)}`}
      >
        Full mission details are still being finalized. Every recruit will be
        briefed the moment intel is declassified — check back soon for the
        complete objective.
      </p>

      <div
        ref={panelsRef}
        className={`relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl ${reveal(panelsVisible)}`}
      >
        {[
          { label: 'Date', value: 'TO BE ANNOUNCED' },
          { label: 'Venue', value: 'TO BE ANNOUNCED' },
          { label: 'Time', value: 'COMING SOON' },
        ].map((item) => (
          <div
            key={item.label}
            className="border border-[var(--color-border)] bg-[var(--color-bg-card)] backdrop-blur-md px-6 py-8 text-center relative group hover:border-[var(--color-border-glow)] transition-all duration-300"
          >
            <div className="hud-corner-tl" />
            <div className="hud-corner-br" />
            <p className="text-[10px] tracking-[0.3em] text-[var(--color-text-muted)] mb-3 font-mono">
              {item.label.toUpperCase()}
            </p>
            <p className="text-sm font-semibold tracking-wide text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}