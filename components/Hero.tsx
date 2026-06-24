'use client'

import { useEffect, useRef } from 'react'

const seasons = ['winter', 'spring', 'summer', 'fall'] as const
type Season = typeof seasons[number]

let currentSeason = 0
let particles: any[] = []

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      if (!canvas || !section) return
      canvas.width = section.offsetWidth
      canvas.height = section.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const seasonSkies: Record<Season, string[]> = {
      winter: ['#0d1b2a', '#1a2a3a', '#2c3e50'],
      spring: ['#0a2a1a', '#1a4a2a', '#3a7a4a'],
      summer: ['#0a2040', '#1a4a80', '#3a80c0'],
      fall:   ['#2a0a00', '#5a1a00', '#a03010'],
    }

    function spawnParticle(season: Season) {
      const w = canvas!.width
      if (season === 'winter') return { x: Math.random()*w, y: -10, size: Math.random()*3+1.5, speedX: (Math.random()-0.5)*0.6, speedY: Math.random()*1.2+0.4, opacity: Math.random()*0.9+0.1, type: 'snow' }
      if (season === 'spring') return { x: Math.random()*w, y: -10, size: Math.random()*5+2, speedX: (Math.random()-0.3)*1.0, speedY: Math.random()*1.0+0.3, opacity: Math.random()*0.8+0.2, rotation: Math.random()*Math.PI*2, rotSpeed: (Math.random()-0.5)*0.05, type: 'petal', hue: Math.random()>0.5?'#f8b4c8':'#f8d4e8' }
      if (season === 'summer') return { x: Math.random()*w, y: Math.random()*canvas!.height*0.5, size: Math.random()*2+0.5, speedX: (Math.random()-0.5)*0.2, speedY: (Math.random()-0.5)*0.2, opacity: Math.random()*0.3+0.05, type: 'dust' }
      return { x: Math.random()*w, y: -10, size: Math.random()*9+4, speedX: (Math.random()-0.3)*1.8, speedY: Math.random()*1.3+0.4, opacity: Math.random()*0.9+0.1, rotation: Math.random()*Math.PI*2, rotSpeed: (Math.random()-0.5)*0.07, type: 'leaf', hue: ['#e85a10','#d4a020','#c84010','#e8a030'][Math.floor(Math.random()*4)] }
    }

    function drawBareTree(x: number, groundY: number, scale: number) {
      const th = 48*scale
      ctx!.strokeStyle = '#2a2820'; ctx!.lineWidth = 2.5*scale
      ctx!.beginPath(); ctx!.moveTo(x,groundY); ctx!.lineTo(x,groundY-th); ctx!.stroke()
      ctx!.lineWidth = 1.2*scale
      ;[[x-14*scale,groundY-th*0.52],[x+12*scale,groundY-th*0.62],[x-9*scale,groundY-th*0.76],[x+7*scale,groundY-th*0.84]].forEach(([bx,by]) => {
        ctx!.beginPath(); ctx!.moveTo(x,by+4*scale); ctx!.lineTo(bx,by); ctx!.stroke()
      })
    }

    function drawBloomTree(x: number, groundY: number, color: string, scale: number) {
      const th = 44*scale
      ctx!.strokeStyle = '#4a3018'; ctx!.lineWidth = 2.5*scale
      ctx!.beginPath(); ctx!.moveTo(x,groundY); ctx!.lineTo(x,groundY-th); ctx!.stroke()
      ctx!.fillStyle = color; ctx!.globalAlpha = 0.88
      ctx!.beginPath(); ctx!.arc(x,groundY-th-14*scale,20*scale,0,Math.PI*2); ctx!.fill()
      ctx!.beginPath(); ctx!.arc(x-12*scale,groundY-th-7*scale,13*scale,0,Math.PI*2); ctx!.fill()
      ctx!.beginPath(); ctx!.arc(x+12*scale,groundY-th-7*scale,13*scale,0,Math.PI*2); ctx!.fill()
      ctx!.globalAlpha = 1
    }

    function drawFullTree(x: number, groundY: number, color1: string, color2: string, scale: number) {
      const th = 50*scale
      ctx!.fillStyle = '#301808'; ctx!.fillRect(x-3.5*scale,groundY-th*0.48,7*scale,th*0.48)
      ctx!.fillStyle = color1; ctx!.beginPath(); ctx!.arc(x,groundY-th-2*scale,23*scale,0,Math.PI*2); ctx!.fill()
      ctx!.fillStyle = color2
      ctx!.beginPath(); ctx!.arc(x-11*scale,groundY-th+5*scale,16*scale,0,Math.PI*2); ctx!.fill()
      ctx!.beginPath(); ctx!.arc(x+11*scale,groundY-th+5*scale,16*scale,0,Math.PI*2); ctx!.fill()
    }

    function drawFallTree(x: number, groundY: number, color1: string, color2: string, scale: number) {
      const th = 50*scale
      ctx!.fillStyle = '#301808'; ctx!.fillRect(x-3.5*scale,groundY-th*0.48,7*scale,th*0.48)
      ctx!.fillStyle = color1; ctx!.globalAlpha = 0.88
      ctx!.beginPath(); ctx!.arc(x,groundY-th-2*scale,22*scale,0,Math.PI*2); ctx!.fill()
      ctx!.fillStyle = color2
      ctx!.beginPath(); ctx!.arc(x-9*scale,groundY-th+7*scale,15*scale,0,Math.PI*2); ctx!.fill()
      ctx!.beginPath(); ctx!.arc(x+9*scale,groundY-th+7*scale,15*scale,0,Math.PI*2); ctx!.fill()
      ctx!.globalAlpha = 1
    }

    function drawCloud(x: number, y: number, scale: number, color: string) {
      ctx!.fillStyle = color
      ctx!.beginPath()
      ctx!.arc(x,y,20*scale,0,Math.PI*2); ctx!.arc(x+25*scale,y-4*scale,16*scale,0,Math.PI*2)
      ctx!.arc(x+46*scale,y,18*scale,0,Math.PI*2); ctx!.arc(x+22*scale,y+9*scale,14*scale,0,Math.PI*2)
      ctx!.fill()
    }

    function drawLeafShape(x: number, y: number, size: number, color: string, rotation: number) {
      ctx!.save(); ctx!.translate(x,y); ctx!.rotate(rotation)
      ctx!.fillStyle = color; ctx!.beginPath(); ctx!.ellipse(0,0,size,size*0.5,0,0,Math.PI*2); ctx!.fill()
      ctx!.restore()
    }

    function drawScene(season: Season) {
      const w = canvas!.width; const h = canvas!.height
      const sky = seasonSkies[season]
      const grad = ctx!.createLinearGradient(0,0,0,h)
      grad.addColorStop(0,sky[0]); grad.addColorStop(0.5,sky[1]); grad.addColorStop(1,sky[2])
      ctx!.fillStyle = grad; ctx!.fillRect(0,0,w,h)
      const groundY = h*0.68

      if (season === 'winter') {
        ctx!.fillStyle = '#1a2a3a'
        ctx!.beginPath(); ctx!.moveTo(0,groundY)
        ctx!.lineTo(w*0.12,groundY*0.38); ctx!.lineTo(w*0.28,groundY*0.58)
        ctx!.lineTo(w*0.42,groundY*0.28); ctx!.lineTo(w*0.58,groundY*0.50)
        ctx!.lineTo(w*0.72,groundY*0.22); ctx!.lineTo(w*0.88,groundY*0.45)
        ctx!.lineTo(w,groundY*0.35); ctx!.lineTo(w,groundY)
        ctx!.closePath(); ctx!.fill()
        ctx!.fillStyle = 'rgba(220,235,255,0.92)'
        ;[[w*0.12,groundY*0.38],[w*0.42,groundY*0.28],[w*0.72,groundY*0.22]].forEach(([px,py]) => {
          ctx!.beginPath(); ctx!.moveTo(px,py); ctx!.lineTo(px-16,py+20); ctx!.lineTo(px+16,py+20); ctx!.closePath(); ctx!.fill()
        })
        drawBareTree(w*0.06,groundY,0.85); drawBareTree(w*0.19,groundY,0.70)
        drawBareTree(w*0.80,groundY,0.80); drawBareTree(w*0.93,groundY,0.65)
        const snowGrad = ctx!.createLinearGradient(0,groundY,0,h)
        snowGrad.addColorStop(0,'#c8dcea'); snowGrad.addColorStop(1,'#e4f0f8')
        ctx!.fillStyle = snowGrad
        ctx!.beginPath(); ctx!.moveTo(0,groundY+6)
        for (let x=0;x<=w;x+=25) ctx!.lineTo(x,groundY+Math.sin(x*0.05)*4+6)
        ctx!.lineTo(w,h); ctx!.lineTo(0,h); ctx!.closePath(); ctx!.fill()

      } else if (season === 'spring') {
        const hillGrad = ctx!.createLinearGradient(0,groundY*0.65,0,h)
        hillGrad.addColorStop(0,'#52a030'); hillGrad.addColorStop(1,'#307018')
        ctx!.fillStyle = hillGrad
        ctx!.beginPath(); ctx!.moveTo(0,h); ctx!.lineTo(0,groundY*0.78)
        ctx!.bezierCurveTo(w*0.18,groundY*0.55,w*0.32,groundY*0.88,w*0.48,groundY*0.68)
        ctx!.bezierCurveTo(w*0.64,groundY*0.48,w*0.80,groundY*0.78,w,groundY*0.62)
        ctx!.lineTo(w,h); ctx!.closePath(); ctx!.fill()
        drawBloomTree(w*0.08,groundY,'#f8b4c8',0.85); drawBloomTree(w*0.25,groundY,'#f8d4e8',0.70)
        drawBloomTree(w*0.74,groundY,'#f8b4c8',0.80); drawBloomTree(w*0.90,groundY,'#f0a0c0',0.65)
        ctx!.fillStyle = 'rgba(255,228,80,0.80)'
        ctx!.beginPath(); ctx!.arc(w*0.84,h*0.18,22,0,Math.PI*2); ctx!.fill()
        ctx!.fillStyle = 'rgba(255,240,140,0.28)'
        ctx!.beginPath(); ctx!.arc(w*0.84,h*0.18,36,0,Math.PI*2); ctx!.fill()

      } else if (season === 'summer') {
        drawCloud(w*0.10,h*0.16,1.0,'rgba(255,255,255,0.88)')
        drawCloud(w*0.52,h*0.11,0.85,'rgba(255,255,255,0.78)')
        drawCloud(w*0.80,h*0.20,0.65,'rgba(255,255,255,0.72)')
        ctx!.fillStyle = 'rgba(255,218,40,0.98)'
        ctx!.beginPath(); ctx!.arc(w*0.76,h*0.15,28,0,Math.PI*2); ctx!.fill()
        ctx!.strokeStyle = 'rgba(255,218,40,0.38)'; ctx!.lineWidth = 2
        for (let i=0;i<8;i++) {
          const angle = (i/8)*Math.PI*2
          ctx!.beginPath()
          ctx!.moveTo(w*0.76+Math.cos(angle)*34,h*0.15+Math.sin(angle)*34)
          ctx!.lineTo(w*0.76+Math.cos(angle)*50,h*0.15+Math.sin(angle)*50)
          ctx!.stroke()
        }
        const summerGrad = ctx!.createLinearGradient(0,groundY,0,h)
        summerGrad.addColorStop(0,'#429818'); summerGrad.addColorStop(1,'#286008')
        ctx!.fillStyle = summerGrad; ctx!.fillRect(0,groundY,w,h-groundY)
        drawFullTree(w*0.06,groundY,'#287808','#185004',0.95)
        drawFullTree(w*0.18,groundY,'#389818','#287008',0.78)
        drawFullTree(w*0.80,groundY,'#287808','#185004',0.88)
        drawFullTree(w*0.92,groundY,'#389818','#287008',0.72)

      } else if (season === 'fall') {
        const fallHills = ctx!.createLinearGradient(0,groundY*0.58,0,h)
        fallHills.addColorStop(0,'#7a4010'); fallHills.addColorStop(1,'#4a2808')
        ctx!.fillStyle = fallHills
        ctx!.beginPath(); ctx!.moveTo(0,h); ctx!.lineTo(0,groundY*0.72)
        ctx!.bezierCurveTo(w*0.22,groundY*0.52,w*0.38,groundY*0.82,w*0.52,groundY*0.65)
        ctx!.bezierCurveTo(w*0.68,groundY*0.48,w*0.84,groundY*0.76,w,groundY*0.60)
        ctx!.lineTo(w,h); ctx!.closePath(); ctx!.fill()
        drawFallTree(w*0.06,groundY,'#e85a10','#c04010',0.95)
        drawFallTree(w*0.20,groundY,'#d4a020','#a08010',0.78)
        drawFallTree(w*0.78,groundY,'#e85a10','#c04010',0.82)
        drawFallTree(w*0.92,groundY,'#d4a020','#906010',0.70)
        for (let i=0;i<10;i++) drawLeafShape((i/10)*w+Math.random()*35,groundY+4+Math.random()*8,7,'#b05010',Math.random()*0.6)
      }
    }

    function drawParticles() {
      particles.forEach((p: any) => {
        ctx!.save(); ctx!.globalAlpha = p.opacity
        if (p.type==='snow') { ctx!.fillStyle='#e8f4ff'; ctx!.beginPath(); ctx!.arc(p.x,p.y,p.size,0,Math.PI*2); ctx!.fill() }
        else if (p.type==='petal') { ctx!.translate(p.x,p.y); ctx!.rotate(p.rotation); ctx!.fillStyle=p.hue; ctx!.beginPath(); ctx!.ellipse(0,0,p.size,p.size*0.5,0,0,Math.PI*2); ctx!.fill() }
        else if (p.type==='dust') { ctx!.fillStyle='rgba(255,225,140,0.5)'; ctx!.beginPath(); ctx!.arc(p.x,p.y,p.size,0,Math.PI*2); ctx!.fill() }
        else if (p.type==='leaf') { ctx!.translate(p.x,p.y); ctx!.rotate(p.rotation); ctx!.fillStyle=p.hue; ctx!.beginPath(); ctx!.ellipse(0,0,p.size,p.size*0.48,0,0,Math.PI*2); ctx!.fill() }
        ctx!.restore()
      })
    }

    function updateParticles(season: Season) {
      const maxP = season==='summer' ? 10 : 38
      if (particles.length < maxP && Math.random() > 0.55) particles.push(spawnParticle(season))
      particles = particles.filter((p: any) => {
        p.x += p.speedX; p.y += p.speedY
        if (p.rotation !== undefined) p.rotation += p.rotSpeed
        return p.y < canvas!.height+20 && p.x > -20 && p.x < canvas!.width+20
      })
    }

    let animId: number
    function animate() {
      const season = seasons[currentSeason]
      ctx!.clearRect(0,0,canvas!.width,canvas!.height)
      drawScene(season)
      updateParticles(season)
      drawParticles()
      animId = requestAnimationFrame(animate)
    }
    animate()

    const seasonInterval = setInterval(() => {
      currentSeason = (currentSeason + 1) % 4
      particles = []
    }, 10000)

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(seasonInterval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="hero" ref={sectionRef}>
      <canvas ref={canvasRef} id="seasonCanvas" />
      <div className="hero-inner">
        <p className="hero-eyebrow">Automation Portfolio</p>
        <h1 className="hero-headline">
          Your most painful<br />
          <em>manual tasks,</em><br />
          automated.
        </h1>
        <p className="hero-sub">Built for small teams who have better things to do than copy-paste data all day.</p>
        <a href="#exhibits" className="hero-cta">Browse exhibits</a>
      </div>
      <div className="hero-scroll-hint">↓</div>
    </section>
  )
}