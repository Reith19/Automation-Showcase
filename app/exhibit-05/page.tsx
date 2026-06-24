'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const screenshots = [
  { src: '/image/1.JPG', caption: 'Role-based dashboard each user sees their own view' },
  { src: '/image/2.JPG', caption: 'Client profile full training history and program access' },
  { src: '/image/3.JPG', caption: 'Program builder blocks weeks days exercise assignment' },
  { src: '/image/4.JPG', caption: 'Progress tracker logging analytics and performance data' },
]

const features = [
  { label: 'Auth', value: 'Role-based login, admin, coach, client' },
  { label: 'Database', value: 'Supabase with row-level security' },
  { label: 'Frontend', value: 'Vanilla HTML, CSS, JavaScript' },
  { label: 'Hosting', value: 'GitHub Pages, free, fast, no server' },
  { label: 'Importer', value: 'Excel bulk import for training programs' },
  { label: 'Features', value: 'Program builder, progress tracker, day logging' },
]

export default function Exhibit05() {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setActive(prev => (prev + 1) % screenshots.length)
        setFading(false)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  function goTo(i: number) {
    setFading(true)
    setTimeout(() => {
      setActive(i)
      setFading(false)
    }, 400)
  }

  return (
    <main className="exhibit-page">
      <div className="exhibit-nav">
        <Link href="/" className="exhibit-back">Back to Exhibits</Link>
        <span className="exhibit-nav-label">05 If it lives in a browser and solves a problem</span>
      </div>

      <div className="ex05-top">

        <div className="ex05-viewer">
          <div className="ex05-browser-bar">
            <div className="sheet-dots"><span /><span /><span /></div>
            <span className="ex05-url">reith19.github.io/Training-Application</span>
            <a href="https://reith19.github.io/Training-Application/home.html" target="_blank" rel="noopener noreferrer" className="ex05-open-btn">Open live</a>
          </div>
          <div className="ex05-screen">
            <img
              src={screenshots[active].src}
              alt={screenshots[active].caption}
              className={`ex05-img ${fading ? 'ex05-img-fading' : ''}`}
            />
          </div>
          <div className="ex05-caption">{screenshots[active].caption}</div>
          <div className="ex05-dots">
            {screenshots.map((_, i) => (
              <button key={i} className={`ex05-dot ${i === active ? 'ex05-dot-active' : ''}`} onClick={() => goTo(i)} />
            ))}
          </div>
        </div>

        <div className="ex05-info">
          <div className="ex05-info-header">
            <span className="ex05-tag">Real project</span>
            <h2 className="ex05-title">RS Fitness</h2>
            <p className="ex05-sub">A role-based fitness coaching web app, built from scratch.</p>
          </div>

          <div className="ex05-features">
            <span className="ex05-section-label">What was built</span>
            {features.map((f) => (
              <div key={f.label} className="ex05-feature-row">
                <span className="ex05-feature-label">{f.label}</span>
                <span className="ex05-feature-value">{f.value}</span>
              </div>
            ))}
          </div>

          <div className="ex05-callout">
            <p>This is what a lightweight web app looks like. No framework overkill, no enterprise stack, just a clean tool that works.</p>
          </div>

          <a href="https://reith19.github.io/Training-Application/home.html" target="_blank" rel="noopener noreferrer" className="ex05-cta">View live app</a>
        </div>

      </div>

      <div className="exhibit-bottom">
        <div className="exhibit-bottom-inner">
          <h2 className="exhibit-bottom-title">What I can build for you</h2>
          <div className="exhibit-explainer-grid">
            <div className="explainer-card">
              <span className="explainer-method ext">WEBSITES</span>
              <h3>Your online presence</h3>
              <p>Clean, fast landing pages and business sites. No bloat, no page builders, hand-built and actually yours.</p>
            </div>
            <div className="explainer-card">
              <span className="explainer-method auto">WEB APPS</span>
              <h3>Tools your team uses</h3>
              <p>Dashboards, portals, internal tools with login and roles. If your team uses a spreadsheet as a tool, this is the upgrade.</p>
            </div>
            <div className="explainer-card">
              <span className="explainer-method trigger">PORTALS</span>
              <h3>Client-facing systems</h3>
              <p>Give your clients their own login, their own view, their own data. Built light, built right, at a price that fits.</p>
            </div>
          </div>
          <p className="exhibit-bottom-note">
            Built with whatever fits. Vanilla HTML CSS JS for speed and simplicity, or Next.js and Supabase when you need more. Fair price. Clean build. No overkill.
          </p>
        </div>
      </div>

    </main>
  )
}
