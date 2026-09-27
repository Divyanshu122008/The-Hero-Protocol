/**
 * HeroVisual Component
 * 
 * Handles character rendering with a complete asset abstraction system:
 * - If `hero.image` is present: renders the high-res character visual with atmospheric glow.
 * - If `hero.image` is null: renders a cinematic, vector-drawn Marvel HUD hologram
 *   specifically tailored to each hero's identity and color palette.
 */
export default function HeroVisual({ hero }) {
  if (!hero) return null

  // If real image asset is provided, render it cleanly
  if (hero.image) {
    return (
      <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
        {/* Ambient back-glow */}
        <div
          className="absolute inset-0 blur-3xl opacity-40 rounded-full transition-all duration-700 pointer-events-none"
          style={{ background: hero.accentColor }}
        />
        <img
          src={hero.image}
          alt={hero.name}
          className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-out hover:scale-105"
        />
      </div>
    )
  }

  // Fallback: Signature cinematic Marvel HUD Hologram
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[500px] aspect-square flex items-center justify-center p-4">
      {/* Dynamic ambient radial lighting */}
      <div
        className="absolute inset-0 rounded-full blur-[90px] opacity-30 transition-all duration-700 pointer-events-none animate-pulse-glow"
        style={{
          background: `radial-gradient(circle, ${hero.accentColor} 0%, ${hero.secondaryColor || 'transparent'} 70%, transparent 100%)`,
        }}
      />

      {/* Holographic Circular HUD Outer Frame */}
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Outer rotating telemetry ring */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin-slow pointer-events-none opacity-40"
          viewBox="0 0 400 400"
        >
          <circle
            cx="200"
            cy="200"
            r="185"
            fill="none"
            stroke={hero.accentColor}
            strokeWidth="1.5"
            strokeDasharray="4 8 16 8"
          />
          <circle
            cx="200"
            cy="200"
            r="165"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            strokeDasharray="40 20 60 20"
          />
        </svg>

        {/* Inner reverse rotating ring */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin-reverse pointer-events-none opacity-50"
          viewBox="0 0 400 400"
        >
          <circle
            cx="200"
            cy="200"
            r="140"
            fill="none"
            stroke={hero.secondaryColor || hero.accentColor}
            strokeWidth="1.5"
            strokeDasharray="2 12"
          />
          <circle
            cx="200"
            cy="200"
            r="115"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
        </svg>

        {/* Tactical Crosshair Axes */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-white to-transparent" />
        </div>

        {/* Hero Specific Emblem Centerpiece */}
        <div className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center">
          {renderHeroEmblem(hero)}
        </div>

        {/* Hologram Status Badges */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
          <div
            className="px-3 py-1 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase border font-mono backdrop-blur-md rounded-xs"
            style={{
              borderColor: hero.accentColor,
              color: hero.accentColor,
              backgroundColor: 'rgba(8, 9, 11, 0.85)',
            }}
          >
            {hero.protocolCode}
          </div>
          <span className="text-[9px] tracking-[0.2em] text-[var(--color-text-muted)] mt-1 font-mono">
            BIO-SIGNATURE // VERIFIED
          </span>
        </div>

        {/* Corner HUD Markers */}
        <div className="hud-corner-tl" style={{ borderColor: hero.accentColor }} />
        <div className="hud-corner-tr" style={{ borderColor: hero.accentColor }} />
        <div className="hud-corner-bl" style={{ borderColor: hero.accentColor }} />
        <div className="hud-corner-br" style={{ borderColor: hero.accentColor }} />
      </div>
    </div>
  )
}

/**
 * Vector Emblem Generator for all 7 Marvel Heroes
 */
function renderHeroEmblem(hero) {
  const color = hero.accentColor
  const secColor = hero.secondaryColor || '#ffffff'

  switch (hero.slug) {
    case 'spiderman':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_15px_rgba(226,54,54,0.6)]">
          {/* Subtle Web Radials */}
          <line x1="50" y1="10" x2="50" y2="90" stroke={secColor} strokeWidth="0.8" opacity="0.4" />
          <line x1="10" y1="50" x2="90" y2="50" stroke={secColor} strokeWidth="0.8" opacity="0.4" />
          <line x1="20" y1="20" x2="80" y2="80" stroke={secColor} strokeWidth="0.8" opacity="0.4" />
          <line x1="80" y1="20" x2="20" y2="80" stroke={secColor} strokeWidth="0.8" opacity="0.4" />
          {/* Spider Insignia */}
          <polygon points="50,38 46,45 54,45" fill={color} />
          <polygon points="50,45 44,65 50,72 56,65" fill={color} />
          {/* Spider Legs */}
          <path d="M46,42 Q30,30 20,40" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M54,42 Q70,30 80,40" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M45,46 Q28,42 16,54" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M55,46 Q72,42 84,54" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M45,52 Q28,58 22,74" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M55,52 Q72,58 78,74" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M46,60 Q34,70 32,84" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M54,60 Q66,70 68,84" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )

    case 'ironman':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_18px_rgba(200,16,46,0.7)]">
          {/* Outer Arc Reactor Frame */}
          <circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="3" />
          <circle cx="50" cy="50" r="36" fill="none" stroke={secColor} strokeWidth="1.5" strokeDasharray="6 4" />
          {/* Energy Segments */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="50"
              y1="50"
              x2={50 + 34 * Math.cos((deg * Math.PI) / 180)}
              y2={50 + 34 * Math.sin((deg * Math.PI) / 180)}
              stroke={color}
              strokeWidth="2"
              opacity="0.8"
            />
          ))}
          {/* Central Triangular Core */}
          <polygon points="50,26 68,60 32,60" fill="none" stroke="#ffffff" strokeWidth="2.5" />
          <polygon points="50,32 63,57 37,57" fill={secColor} opacity="0.3" />
          <circle cx="50" cy="48" r="8" fill="#ffffff" filter="drop-shadow(0 0 8px #ffffff)" />
        </svg>
      )

    case 'drstrange':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_20px_rgba(217,123,41,0.8)]">
          {/* Sacred Mystic Geometry Mandala */}
          <circle cx="50" cy="50" r="44" fill="none" stroke={color} strokeWidth="1.8" />
          <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
          {/* Interlocking Rotated Squares */}
          <rect x="25" y="25" width="50" height="50" fill="none" stroke={color} strokeWidth="1.5" />
          <rect
            x="25"
            y="25"
            width="50"
            height="50"
            fill="none"
            stroke={secColor}
            strokeWidth="1.5"
            transform="rotate(45 50 50)"
          />
          {/* Eye of Agamotto / Rune Center */}
          <ellipse cx="50" cy="50" rx="22" ry="14" fill="none" stroke="#ffffff" strokeWidth="2" />
          <circle cx="50" cy="50" r="6" fill={color} />
          <circle cx="50" cy="50" r="2.5" fill="#ffffff" />
          {/* Energy Sparks */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <circle
              key={deg}
              cx={50 + 44 * Math.cos((deg * Math.PI) / 180)}
              cy={50 + 44 * Math.sin((deg * Math.PI) / 180)}
              r="2.5"
              fill="#ffffff"
            />
          ))}
        </svg>
      )

    case 'blackpanther':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_20px_rgba(138,63,252,0.8)]">
          {/* Wakandan Vibranium Tooth Necklace Arc */}
          {[ -60, -40, -20, 0, 20, 40, 60 ].map((deg, i) => {
            const rad = (deg * Math.PI) / 180
            const x = 50 + 38 * Math.sin(rad)
            const y = 35 + 28 * Math.cos(rad)
            const len = i === 3 ? 16 : i === 2 || i === 4 ? 13 : 10
            return (
              <polygon
                key={deg}
                points={`${x - 3},${y} ${x + 3},${y} ${x},${y + len}`}
                fill={color}
              />
            )
          })}
          {/* Panther Mask Geometry */}
          <path
            d="M30,30 L50,18 L70,30 L66,54 L50,74 L34,54 Z"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
          />
          {/* Glowing Eyes */}
          <polygon points="38,42 45,46 41,50" fill="#ffffff" />
          <polygon points="62,42 55,46 59,50" fill="#ffffff" />
          {/* Whisker & Forehead Lines */}
          <line x1="50" y1="20" x2="50" y2="40" stroke={secColor} strokeWidth="1.5" />
          <line x1="38" y1="56" x2="50" y2="66" stroke={color} strokeWidth="1.5" />
          <line x1="62" y1="56" x2="50" y2="66" stroke={color} strokeWidth="1.5" />
        </svg>
      )

    case 'scarletwitch':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_22px_rgba(201,24,74,0.85)]">
          {/* Chaos Magic Hex Star */}
          <polygon
            points="50,14 78,30 78,70 50,86 22,70 22,30"
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
          <polygon
            points="50,22 72,35 72,65 50,78 28,65 28,35"
            fill="none"
            stroke={secColor}
            strokeWidth="1.5"
            opacity="0.8"
          />
          {/* Tiara / Crown Geometry */}
          <path
            d="M26,38 L36,52 L50,30 L64,52 L74,38 L68,62 L50,72 L32,62 Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.2"
          />
          <circle cx="50" cy="50" r="7" fill={color} />
          <circle cx="50" cy="50" r="3" fill="#ffffff" />
          {/* Orbiting Chaos Energy Motes */}
          <circle cx="34" cy="30" r="2.5" fill="#ffffff" />
          <circle cx="66" cy="30" r="2.5" fill="#ffffff" />
          <circle cx="50" cy="80" r="2.5" fill="#ffffff" />
        </svg>
      )

    case 'blackwidow':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_18px_rgba(229,56,59,0.8)]">
          {/* Tactical Scope Outer Grid */}
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <circle cx="50" cy="50" r="34" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="8 6" />
          {/* Sniper Reticle Ticks */}
          <line x1="50" y1="12" x2="50" y2="24" stroke="#ffffff" strokeWidth="2" />
          <line x1="50" y1="76" x2="50" y2="88" stroke="#ffffff" strokeWidth="2" />
          <line x1="12" y1="50" x2="24" y2="50" stroke="#ffffff" strokeWidth="2" />
          <line x1="76" y1="50" x2="88" y2="50" stroke="#ffffff" strokeWidth="2" />
          {/* Stylized Red Hourglass Emblem */}
          <polygon points="34,28 66,28 50,48" fill={color} />
          <polygon points="50,52 66,72 34,72" fill={color} />
          <polygon points="38,32 62,32 50,46" fill="#ffffff" opacity="0.35" />
          <polygon points="50,54 62,68 38,68" fill="#ffffff" opacity="0.35" />
        </svg>
      )

    case 'captainamerica':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_20px_rgba(58,134,255,0.7)]">
          {/* Concentric Vibranium Shield Rings */}
          <circle cx="50" cy="50" r="44" fill={secColor} stroke="#ffffff" strokeWidth="1" />
          <circle cx="50" cy="50" r="36" fill="#dedede" />
          <circle cx="50" cy="50" r="28" fill={secColor} />
          <circle cx="50" cy="50" r="20" fill={color} />
          {/* Center Star */}
          <polygon
            points="
              50,33 53.5,43 64,43 55.5,49.5 
              59,60 50,53.5 41,60 44.5,49.5 
              36,43 46.5,43
            "
            fill="#ffffff"
          />
        </svg>
      )

    default:
      return (
        <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/50 flex items-center justify-center font-mono text-xs">
          HERO
        </div>
      )
  }
}
