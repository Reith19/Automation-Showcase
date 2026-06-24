import AnnouncementBar from '@/components/AnnouncementBar'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ExhibitCards from '@/components/ExhibitCards'
import RightPanel from '@/components/RightPanel'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <AnnouncementBar />
      <Nav />
      <Hero />
      <div className="section-label" id="exhibits">
        <span>Exhibits — select to explore</span>
        <span>05 available</span>
      </div>
      <div className="gallery-split">
        <div className="gallery-left">
          <ExhibitCards />
        </div>
        <div className="gallery-divider">
          <div className="divider-line" />
          <div className="divider-badge">RexS</div>
          <div className="divider-line" />
        </div>
        <div className="gallery-right">
          <RightPanel />
        </div>
      </div>
      <div className="strip">
        <span>Free to explore — no login needed</span>
        <span>·</span>
        <span>Fictional data — safe demos</span>
        <span>·</span>
        <span>Built for teams of 1 to 50</span>
      </div>
      <Footer />
    </main>
  )
}