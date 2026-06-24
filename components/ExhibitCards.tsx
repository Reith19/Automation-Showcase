'use client'

import { useEffect, useRef } from 'react'

const cards = [
  {
    index: 0,
    tag: '01',
    title: 'Stop doing it manually',
    label: 'Task Automation',
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
    ],
    position: 'right',
  },
  {
    index: 1,
    tag: '02',
    title: 'Your data, on autopilot',
    label: 'Live Dashboards',
    images: [
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    ],
    position: 'left',
  },
  {
    index: 2,
    tag: '03',
    title: 'What if your browser worked for you',
    label: 'Browser Extensions',
    images: [
      'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    ],
    position: 'right',
  },
  {
    index: 3,
    tag: '04',
    title: 'Bridge any two systems',
    label: 'System → Sheets → System',
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    ],
    position: 'left',
  },
  {
    index: 4,
    tag: '05',
    title: "If it lives in a browser and solves a problem, let's build it",
    label: 'Web Apps · Websites · Dashboards · Portals',
    images: [
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80',
      'https://images.unsplash.com/photo-1545665277-5937489579f2?w=800&q=80',
    ],
    position: 'right',
  },
]

function ExhibitCard({ card }: { card: typeof cards[0] }) {
  const bgRef = useRef<HTMLDivElement>(null)
  const imgIndex = useRef(0)
  const isHovered = useRef(false)

  useEffect(() => {
    if (bgRef.current) {
      bgRef.current.style.backgroundImage = `url(${card.images[0]})`
    }
    const interval = setInterval(() => {
      if (!isHovered.current && bgRef.current) {
        imgIndex.current = (imgIndex.current + 1) % card.images.length
        bgRef.current.style.backgroundImage = `url(${card.images[imgIndex.current]})`
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [card.images])

  return (
    <div
      className="card"
      onMouseEnter={() => { isHovered.current = true }}
      onMouseLeave={() => { isHovered.current = false }}
      onClick={() => console.log(`Opening exhibit ${card.index}`)}
    >
      <div ref={bgRef} className="card-bg" />
      <div className="card-content">
        <span className="card-tag">{card.tag}</span>
        <h2 className="card-title">{card.title}</h2>
        <p className="card-label">{card.label}</p>
        <span className="card-enter">Enter ↗</span>
      </div>
    </div>
  )
}

export default function ExhibitCards() {
  return (
    <section className="cards-section">
      {cards.map((card) => (
        <div className="card-row" key={card.index}>
          {card.position === 'right' && <div className="card-spacer" />}
          <ExhibitCard card={card} />
          {card.position === 'left' && <div className="card-spacer" />}
        </div>
      ))}
    </section>
  )
}