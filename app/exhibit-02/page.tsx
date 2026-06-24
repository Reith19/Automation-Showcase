'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const productNames = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F', 'Product G', 'Product H', 'Product I', 'Product J', 'Product K']

function randomSales() { return Math.floor(Math.random() * 18000) + 2000 }
function randomQty() { return Math.floor(Math.random() * 500) + 50 }
function randomStatus() { return ['In Stock', 'Low Stock', 'Out of Stock'][Math.floor(Math.random() * 3)] }

function generateData() {
  return productNames.map((name, i) => ({
    id: i + 1,
    name,
    sales: randomSales(),
    qty: randomQty(),
    status: randomStatus(),
  }))
}

export default function Exhibit02() {
  const [systemData, setSystemData] = useState(generateData())
  const [sheetData, setSheetData] = useState(generateData())
  const [systemPulse, setSystemPulse] = useState(false)
  const [sheetPulse, setSheetPulse] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    // System updates every 6 seconds
    const systemInterval = setInterval(() => {
      setSystemData(generateData())
      setSystemPulse(true)
      setTimeout(() => setSystemPulse(false), 600)

      // Sheet updates 2 seconds after system
      setTimeout(() => {
        setSheetData(generateData())
        setSheetPulse(true)
        setLastUpdated(new Date())
        setTimeout(() => setSheetPulse(false), 600)
      }, 2000)
    }, 6000)

    return () => clearInterval(systemInterval)
  }, [])

  return (
    <main className="exhibit-page">

      <div className="exhibit-nav">
        <Link href="/" className="exhibit-back">← Back to Exhibits</Link>
        <span className="exhibit-nav-label">02 — Your data, on autopilot</span>
      </div>

      <div className="exhibit-top">

        {/* LEFT — SYSTEM VIEW */}
        <div className="exhibit-system">
          <div className="system-header">
            <div className="system-header-left">
              <span className="system-logo">⬡</span>
              <div>
                <span className="system-name">InventoryOS</span>
                <span className="system-sub">Product Management</span>
              </div>
            </div>
            <span className={`system-live ${systemPulse ? 'system-live-pulse' : ''}`}>● LIVE</span>
          </div>

          <div className="system-toolbar">
            <span className="system-toolbar-item active">All Products</span>
            <span className="system-toolbar-item">Orders</span>
            <span className="system-toolbar-item">Reports</span>
          </div>

          <div className="system-list">
            {systemData.map((row) => (
              <div key={row.id} className={`system-row ${systemPulse ? 'system-row-pulse' : ''}`}>
                <div className="system-row-left">
                  <span className="system-row-id">#{String(row.id).padStart(3, '0')}</span>
                  <span className="system-row-name">{row.name}</span>
                </div>
                <div className="system-row-right">
                  <span className="system-row-sales">${row.sales.toLocaleString()}</span>
                  <span className="system-row-qty">Qty: {row.qty}</span>
                  <span className={`system-row-status status-${row.status.toLowerCase().replace(' ', '-')}`}>
                    {row.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="system-footer">
            <span>Auto-refreshing every 6s</span>
            <span>GET /api/products</span>
          </div>
        </div>

        {/* RIGHT — SHEET VIEW */}
        <div className="exhibit-sheet">
          <div className="exhibit-sheet-header">
            <div className="sheet-dots">
              <span /><span /><span />
            </div>
            <span className="sheet-title">inventory-report.xlsx — Google Sheets</span>
            <span className={`sheet-sync ${sheetPulse ? 'sheet-sync-active' : ''}`}>
              {sheetPulse ? '↻ Syncing...' : `Last sync: ${lastUpdated.toLocaleTimeString()}`}
            </span>
          </div>

          <table className="sheet-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Sales</th>
                <th>Qty</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sheetData.map((row) => (
                <tr key={row.id} className={sheetPulse ? 'sheet-row-active' : ''}>
                  <td className="sheet-id">#{String(row.id).padStart(3, '0')}</td>
                  <td>{row.name}</td>
                  <td className="sheet-sales">${row.sales.toLocaleString()}</td>
                  <td>{row.qty}</td>
                  <td>
                    <span className={`sheet-badge sheet-badge-${row.status.toLowerCase().replace(' ', '-')}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="exhibit-bottom">
        <div className="exhibit-bottom-inner">
          <h2 className="exhibit-bottom-title">How this works</h2>
          <div className="exhibit-explainer-grid">

            <div className="explainer-card">
              <span className="explainer-method get">GET</span>
              <h3>Pull from any system</h3>
              <p>Apps Script sends a GET request to your ERP or any system with an API — pulling the latest data on a schedule you set.</p>
            </div>

            <div className="explainer-card">
              <span className="explainer-method trigger">TRIGGER</span>
              <h3>Runs on a timer</h3>
              <p>No one needs to press anything. Set it to run every hour, every morning, or on demand — the sheet updates itself.</p>
            </div>

            <div className="explainer-card">
              <span className="explainer-method report">REPORT</span>
              <h3>Auto-generates output</h3>
              <p>Once the data lands in the sheet, formatting, calculations, and even email delivery can all fire automatically.</p>
            </div>

          </div>
          <p className="exhibit-bottom-note">
            Works with any system that has an API — ERPs, e-commerce platforms, CRMs, custom databases. If it has an endpoint, we can pull from it.
          </p>
        </div>
      </div>

    </main>
  )
}