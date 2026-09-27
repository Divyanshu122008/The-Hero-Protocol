import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import MissionBriefing from './sections/MissionBriefing'
import ChooseYourHero from './sections/ChooseYourHero'
import EventHighlights from './sections/EventHighlights'
import Timeline from './sections/Timeline'
import Registration from './sections/Registration'
import Footer from './sections/Footer'
import { HEROES } from './data/heroes'

function App() {
  // Recruits can choose any Marvel hero, defaulting to Iron Man
  const [selectedHero, setSelectedHero] = useState(HEROES[1])

  return (
    <div
      className={`relative w-full bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen selection:bg-[var(--color-accent)] selection:text-white transition-colors duration-700 ${
        selectedHero ? selectedHero.themeClass : ''
      }`}
    >
      {/* Tactical Top Navigation with Active Recruit Badge */}
      <Navbar selectedHero={selectedHero} />

      <main className="relative w-full">
        {/* 01 — Cinematic Hero (Right-shifted text with 3D flying spaceship in space) */}
        <Hero />

        {/* 02 — Mission Briefing */}
        <MissionBriefing />

        {/* 03 — Choose Your Hero (Browse heroes and lock in recruit choice) */}
        <ChooseYourHero
          selectedHero={selectedHero}
          onSelectHero={setSelectedHero}
        />

        {/* Dynamic Themed Sub-Sections: Match the chosen hero's theme! */}
        <div className={`transition-colors duration-700 ${selectedHero ? selectedHero.themeClass : ''}`}>
          {/* 04 — Event Highlights */}
          <EventHighlights />

          {/* 05 — Event Timeline */}
          <Timeline />

          {/* 06 — Final Registration CTA */}
          <Registration selectedHero={selectedHero} />
        </div>
      </main>

      {/* 07 — Minimal Premium Footer */}
      <div className={`transition-colors duration-700 ${selectedHero ? selectedHero.themeClass : ''}`}>
        <Footer />
      </div>
    </div>
  )
}

export default App