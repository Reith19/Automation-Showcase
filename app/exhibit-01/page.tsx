'use client'

import { useState } from 'react'
import Link from 'next/link'

const sheetData = [
  { id: 1, name: 'Sarah Mitchell', email: 'sarah@acmecorp.com', status: 'Active', value: '$4,200' },
  { id: 2, name: 'James Okafor', email: 'james@blueridge.io', status: 'Lead', value: '$1,800' },
  { id: 3, name: 'Priya Nambiar', email: 'priya@tandem.co', status: 'Active', value: '$6,500' },
  { id: 4, name: 'Tom Delacroix', email: 'tom@greyowl.com', status: 'Inactive', value: '$900' },
  { id: 5, name: 'Lisa Huang', email: 'lisa@novatech.ai', status: 'Lead', value: '$3,100' },
]

export default function Exhibit01() {
  const [pushed, setPushed] = useState(false)
  const [pushing, setPushing] = useState(false)
  const [activeRow, setActiveRow] = useState(-1)

  async function handleUpdate() {
    setPushing(true)
    setPushed(false)
    setActiveRow(-1)
    for (let i = 0; i < sheetData.length; i++) {
      await new Promise(r => setTimeout(r, 300))
      setActiveRow(i)
    }
    await new Promise(r => setTimeout(r, 300))
    setPushed(true)
    setPushing(false)
    setActiveRow(-1)
  }

  function handleClear() {
    setPushed(false)
    setPushing(false)
    setActiveRow(-1)
  }

  return (
    <main className="exhibit-page">

      {/* NAV */}
      <div className="exhibit-nav">
        <Link href="/" className="exhibit-back">← Back to Exhibits</Link>
        <span className="exhibit-nav-label">01 — Stop doing it manually</span>
      </div>

      {/* TOP SPLIT */}
      <div className="exhibit-top">

        {/* LEFT — FAKE SHEET */}
        <div className="exhibit-sheet">
          <div className="exhibit-sheet-header">
            <div className="sheet-dots">
              <span /><span /><span />
            </div>
            <span className="sheet-title">customers.xlsx — Google Sheets</span>
          </div>
          <table className="sheet-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {sheetData.map((row, i) => (
                <tr key={row.id} className={activeRow === i ? 'sheet-row-active' : ''}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>
                    <span className={`sheet-badge sheet-badge-${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* BUTTONS */}
          <div className="sheet-actions">
            <button
              className="sheet-btn sheet-btn-update"
              onClick={handleUpdate}
              disabled={pushing}
            >
              {pushing ? 'Pushing...' : 'Update System →'}
            </button>
            <button
              className="sheet-btn sheet-btn-clear"
              onClick={handleClear}
              disabled={pushing}
            >
              Clear
            </button>
          </div>
        </div>

        {/* RIGHT — FAKE CRM */}
        <div className="exhibit-crm">
          <div className="crm-header">
            <span className="crm-title">CRM Dashboard</span>
            <span className={`crm-status ${pushed ? 'crm-status-live' : ''}`}>
              {pushed ? '● Live' : '○ Waiting for data'}
            </span>
          </div>

          {!pushed && !pushing && (
            <div className="crm-empty">
              <div className="crm-empty-icon">⬡</div>
              <p>No data received yet.</p>
              <p>Hit <strong>Update System</strong> to push from the sheet.</p>
            </div>
          )}

          {pushing && (
            <div className="crm-empty">
              <div className="crm-pushing-dots">
                <span /><span /><span />
              </div>
              <p>Receiving data...</p>
            </div>
          )}

          {pushed && (
            <div className="crm-cards">
              {sheetData.map((row, i) => (
                <div key={row.id} className="crm-card" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="crm-card-avatar">
                    {row.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="crm-card-info">
                    <span className="crm-card-name">{row.name}</span>
                    <span className="crm-card-email">{row.email}</span>
                  </div>
                  <div className="crm-card-right">
                    <span className={`crm-badge crm-badge-${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                    <span className="crm-card-value">{row.value}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* BOTTOM — EXPLANATION */}
      <div className="exhibit-bottom">
        <div className="exhibit-bottom-inner">
          <h2 className="exhibit-bottom-title">How this works</h2>
          <div className="exhibit-explainer-grid">

            <div className="explainer-card">
              <span className="explainer-method get">GET</span>
              <h3>Fetch from any system</h3>
              <p>Pull live data from an external API or system directly into Google Sheets on a schedule — no manual export needed.</p>
            </div>

            <div className="explainer-card">
              <span className="explainer-method post">POST</span>
              <h3>Push to any system</h3>
              <p>Send data from your Sheet to any platform that has an API — CRMs, project tools, databases, custom apps. One trigger, bulk update.</p>
            </div>

            <div className="explainer-card">
              <span className="explainer-method delete">DELETE</span>
              <h3>Clean up automatically</h3>
              <p>Remove outdated records, archive old entries, or reset data across systems — all triggered from a single Apps Script function.</p>
            </div>

          </div>
          <p className="exhibit-bottom-note">
            Built with Google Apps Script. No third-party tools. No monthly subscription. Just a script that runs when you need it.
          </p>
        </div>
      </div>

    </main>
  )
}