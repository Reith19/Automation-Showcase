'use client'

import { useEffect, useRef } from 'react'

const seasons = ['winter', 'spring', 'summer', 'fall'] as const
type Season = typeof seasons[number]

let currentSeason = 0

export default function Nav() {
  const rexRef = useRef<SVGSVGElement>(null)
  const geckoRef = useRef<SVGSVGElement>(null)

  function renderRexDino(svg: SVGSVGElement, season: Season) {
    const outfits: Record<Season, string> = {
      winter: `<rect x="29" y="1" width="13" height="5" rx="2" fill="#90b8d8"/><rect x="27" y="5" width="17" height="2.5" rx="1" fill="#708aaa"/><path d="M31 5 Q29 2 33 1" stroke="#b0d0e8" stroke-width="1.2" fill="none"/><rect x="16" y="17" width="22" height="4" rx="1.5" fill="#90b8d8" opacity="0.7"/>`,
      spring: `<circle cx="36" cy="2" r="3.5" fill="#f8b4c8"/><circle cx="33" cy="0" r="2" fill="#fcd8e8"/><circle cx="39" cy="0" r="2" fill="#fcd8e8"/><circle cx="36" cy="0" r="1.5" fill="#f890b0"/>`,
      summer: `<ellipse cx="36" cy="3.5" rx="7.5" ry="2.8" fill="#f8d050"/><rect x="28" y="3.5" width="15" height="2" rx="1" fill="#d89820"/><ellipse cx="36" cy="3.5" rx="4.5" ry="1.4" fill="#fce890"/>`,
      fall: `<rect x="28" y="2" width="15" height="7.5" rx="3" fill="#7a3c10"/><rect x="26" y="8" width="19" height="2" rx="1" fill="#5a2a08"/><circle cx="43" cy="3" r="2" fill="#e05010"/>`,
    }
    svg.innerHTML = `
      <g transform="translate(1,6)">
        <rect x="17" y="17" width="21" height="13" rx="4" fill="#4a4a4a"/>
        <rect x="27" y="8" width="17" height="12" rx="3" fill="#4a4a4a"/>
        <rect x="40" y="12" width="8" height="5" rx="2" fill="#4a4a4a"/>
        <rect x="44" y="13" width="2" height="1.5" fill="#888" rx="0.5"/>
        <rect x="44" y="15" width="2" height="1.5" fill="#888" rx="0.5"/>
        <rect x="39" y="9" width="3" height="3" rx="1" fill="#fff"/>
        <rect x="39.5" y="9.5" width="2" height="2" rx="0.5" fill="#111"/>
        <rect x="34" y="22" width="4" height="3" rx="1" fill="#3a3a3a"/>
        <rect x="36" y="24" width="4" height="2" rx="0.5" fill="#3a3a3a"/>
        <rect x="20" y="29" width="5" height="9" rx="2" fill="#3a3a3a"/>
        <rect x="29" y="29" width="5" height="9" rx="2" fill="#3a3a3a"/>
        <rect x="18" y="36" width="8" height="3" rx="1.5" fill="#2a2a2a"/>
        <rect x="27" y="36" width="8" height="3" rx="1.5" fill="#2a2a2a"/>
        <path d="M17 23 Q7 26 3 32" stroke="#4a4a4a" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path d="M3 32 Q0 36 2 38" stroke="#4a4a4a" stroke-width="3" stroke-linecap="round" fill="none"/>
        ${outfits[season]}
      </g>`
  }

  function renderGeckoDino(svg: SVGSVGElement, season: Season) {
    const outfits: Record<Season, string> = {
      winter: `<rect x="30" y="0" width="14" height="5" rx="2" fill="#90b8d8"/><path d="M32 5 Q30 2 34 0" stroke="#b0d0e8" stroke-width="1.2" fill="none"/><rect x="14" y="18" width="20" height="3.5" rx="1.5" fill="#90b8d8" opacity="0.7"/>`,
      spring: `<circle cx="37" cy="2" r="3" fill="#90ee90"/><circle cx="34" cy="0" r="1.8" fill="#b0f0a0"/><circle cx="40" cy="0" r="1.8" fill="#b0f0a0"/>`,
      summer: `<ellipse cx="37" cy="3" rx="7" ry="2.5" fill="#f8d050"/><rect x="30" y="3" width="14" height="1.8" rx="1" fill="#d89820"/>`,
      fall: `<rect x="28" y="2" width="14" height="7" rx="3" fill="#7a3c10"/><rect x="26" y="8" width="18" height="2" rx="1" fill="#5a2a08"/>`,
    }
    svg.innerHTML = `
      <g transform="translate(2,5)">
        <ellipse cx="28" cy="26" rx="14" ry="9" fill="#5a9a40"/>
        <ellipse cx="28" cy="27" rx="9" ry="6" fill="#8acc60" opacity="0.55"/>
        <rect x="32" y="16" width="8" height="8" rx="3" fill="#5a9a40"/>
        <ellipse cx="42" cy="13" rx="11" ry="9" fill="#5a9a40"/>
        <ellipse cx="52" cy="15" rx="5" ry="4" fill="#4a8a30"/>
        <circle cx="47" cy="10" r="4.5" fill="#f8f0c0"/>
        <circle cx="47.5" cy="10" r="2.8" fill="#1a1a1a"/>
        <circle cx="46" cy="8.8" r="1" fill="#fff"/>
        <circle cx="53" cy="14" r="0.8" fill="#3a7020"/>
        <path d="M50 17 Q52 19 54 17" stroke="#3a7020" stroke-width="1" fill="none" stroke-linecap="round"/>
        <path d="M16 30 L8 38" stroke="#4a8a30" stroke-width="4" stroke-linecap="round"/>
        <circle cx="6" cy="39" r="2.5" fill="#4a8a30"/>
        <circle cx="8" cy="41" r="2" fill="#4a8a30"/>
        <circle cx="10" cy="41.5" r="2" fill="#4a8a30"/>
        <path d="M38 30 L44 38" stroke="#4a8a30" stroke-width="4" stroke-linecap="round"/>
        <circle cx="43" cy="40" r="2.5" fill="#4a8a30"/>
        <circle cx="45" cy="41.5" r="2" fill="#4a8a30"/>
        <circle cx="47" cy="41" r="2" fill="#4a8a30"/>
        <path d="M20 20 L12 26" stroke="#4a8a30" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="10" cy="27" r="2" fill="#4a8a30"/>
        <circle cx="12" cy="29" r="1.8" fill="#4a8a30"/>
        <path d="M36 20 L44 24" stroke="#4a8a30" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="45" cy="25" r="2" fill="#4a8a30"/>
        <circle cx="47" cy="27" r="1.8" fill="#4a8a30"/>
        <path d="M14 24 Q4 28 0 24 Q-3 22 0 18 Q2 15 4 17" stroke="#5a9a40" stroke-width="6" stroke-linecap="round" fill="none"/>
        <path d="M4 17 Q5 13 3 11" stroke="#5a9a40" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <path d="M3 11 Q4 9 3 8" stroke="#5a9a40" stroke-width="2" stroke-linecap="round" fill="none"/>
        <ellipse cx="26" cy="25" rx="8" ry="5" fill="#6aaa5a" opacity="0.5"/>
        <circle cx="22" cy="24" r="2" fill="#3a7a28" opacity="0.5"/>
        <circle cx="30" cy="22" r="1.5" fill="#3a7a28" opacity="0.4"/>
        <circle cx="34" cy="26" r="2" fill="#3a7a28" opacity="0.5"/>
        ${outfits[season]}
      </g>`
  }

  useEffect(() => {
    const season = seasons[currentSeason]
    if (rexRef.current) renderRexDino(rexRef.current, season)
    if (geckoRef.current) renderGeckoDino(geckoRef.current, season)

    const interval = setInterval(() => {
      currentSeason = (currentSeason + 1) % 4
      const s = seasons[currentSeason]
      if (rexRef.current) renderRexDino(rexRef.current, s)
      if (geckoRef.current) renderGeckoDino(geckoRef.current, s)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="nav">
      <div className="nav-left">
        <svg ref={rexRef} className="dino" viewBox="0 0 60 50" xmlns="http://www.w3.org/2000/svg" />
        <div className="nav-logo">RexS</div>
      </div>
      <div className="nav-links">
        <a href="https://www.fiverr.com/rexsumpio" target="_blank" rel="noopener noreferrer" className="nav-link nav-contact">Contact</a>
      </div>
      <div className="nav-right">
        <div className="nav-right-stack">
          <svg ref={geckoRef} className="dino" viewBox="0 0 70 55" xmlns="http://www.w3.org/2000/svg" />
          <a href="https://www.fiverr.com/rexsumpio" target="_blank" rel="noopener noreferrer" className="nav-link fiverr-link">Fiverr</a>
        </div>
      </div>
    </nav>
  )
}
