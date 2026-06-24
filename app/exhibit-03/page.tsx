'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const steps = [
  { id: 0, label: 'Opening CRM', cursor: { x: 180, y: 120 }, view: 'crm-list' },
  { id: 1, label: 'Opening customer record', cursor: { x: 420, y: 280 }, view: 'customer-detail' },
  { id: 2, label: 'Clicking delete', cursor: { x: 680, y: 380 }, view: 'delete-hover' },
  { id: 3, label: 'Confirming delete', cursor: { x: 500, y: 400 }, view: 'confirm-delete' },
]

const customers = [
  { id: 1, name: 'Sarah Mitchell', email: 'sarah@acmecorp.com', status: 'Active', value: '$4,200' },
  { id: 2, name: 'James Okafor', email: 'james@blueridge.io', status: 'Lead', value: '$1,800' },
  { id: 3, name: 'Priya Nambiar', email: 'priya@tandem.co', status: 'Active', value: '$6,500' },
  { id: 4, name: 'Tom Delacroix', email: 'tom@greyowl.com', status: 'Inactive', value: '$900' },
  { id: 5, name: 'Lisa Huang', email: 'lisa@novatech.ai', status: 'Lead', value: '$3,100' },
]

export default function Exhibit03() {
  const [step, setStep] = useState(0)
  const [cursor, setCursor] = useState({ x: 180, y: 120 })
  const [clicking, setClicking] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const reset = useCallback(() => {
    setDeleted(false)
    setStep(0)
    setCursor(steps[0].cursor)
    setClicking(false)
  }, [])

  useEffect(() => {
    if (!deleted) return
    const t = setTimeout(() => reset(), 2000)
    return () => clearTimeout(t)
  }, [deleted, reset])

  useEffect(() => {
    if (deleted) return
    const interval = setInterval(() => {
      setStep(prev => {
        const next = prev + 1
        if (next >= steps.length) {
          setDeleted(true)
          return prev
        }
        setCursor(steps[next].cursor)
        setClicking(true)
        setTimeout(() => setClicking(false), 400)
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [deleted])

  return (
    <main className="exhibit-page">
      <div className="exhibit-nav">
        <Link href="/" className="exhibit-back">← Back to Exhibits</Link>
        <span className="exhibit-nav-label">03 — What if your browser worked for you</span>
      </div>

      <div className="browser-wrap">
        <div className="browser-chrome">
          <div className="browser-dots"><span /><span /><span /></div>
          <div className="browser-bar">
            <span className="browser-lock">🔒</span>
            <span className="browser-url">app.inventoryos.com/crm</span>
          </div>
          <div className="browser-ext">
            <span className="ext-badge">⚡ RexS Extension</span>
            <span className={`ext-status ${deleted ? 'ext-done' : 'ext-running'}`}>
              {deleted ? '✓ Done — restarting...' : `Running — ${steps[step].label}...`}
            </span>
          </div>
        </div>

        <div className="browser-content">
          <div className="step-indicator">
            {steps.map((s, i) => (
              <div key={s.id} className={`step-dot ${i <= step ? 'step-dot-active' : ''} ${i === step && !deleted ? 'step-dot-current' : ''}`}>
                <span>{i + 1}</span>
                <p>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="erp-frame">
            <div className="erp-sidebar">
              <div className="erp-logo">⬡ InventoryOS</div>
              <nav className="erp-nav">
                <span className={`erp-nav-item ${step >= 0 ? 'erp-nav-active' : ''}`}>CRM</span>
                <span className="erp-nav-item">Orders</span>
                <span className="erp-nav-item">Products</span>
                <span className="erp-nav-item">Reports</span>
                <span className="erp-nav-item">Settings</span>
              </nav>
            </div>

            <div className="erp-main">
              {(step === 0 || step === 1) && !deleted && (
                <div className="erp-view">
                  <div className="erp-view-header">
                    <h3>Customers</h3>
                    <span className="erp-count">{customers.length} records</span>
                  </div>
                  <table className="erp-table">
                    <thead>
                      <tr><th>Name</th><th>Email</th><th>Status</th><th>Value</th></tr>
                    </thead>
                    <tbody>
                      {customers.map((c) => (
                        <tr key={c.id} className={step === 1 && c.id === 4 ? 'erp-row-selected' : ''}>
                          <td>{c.name}</td>
                          <td>{c.email}</td>
                          <td><span className={`erp-badge erp-badge-${c.status.toLowerCase()}`}>{c.status}</span></td>
                          <td>{c.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {(step === 2 || step === 3) && !deleted && (
                <div className="erp-view">
                  <div className="erp-view-header">
                    <h3>Tom Delacroix</h3>
                    <div className="erp-actions">
                      <button className="erp-btn erp-btn-edit">Edit</button>
                      <button className={`erp-btn erp-btn-delete ${step >= 2 ? 'erp-btn-delete-hover' : ''}`}>Delete</button>
                    </div>
                  </div>
                  <div className="erp-detail-grid">
                    <div className="erp-detail-item"><span className="erp-detail-label">Email</span><span className="erp-detail-value">tom@greyowl.com</span></div>
                    <div className="erp-detail-item"><span className="erp-detail-label">Status</span><span className="erp-badge erp-badge-inactive">Inactive</span></div>
                    <div className="erp-detail-item"><span className="erp-detail-label">Value</span><span className="erp-detail-value">$900</span></div>
                    <div className="erp-detail-item"><span className="erp-detail-label">ID</span><span className="erp-detail-value">#004</span></div>
                  </div>
                  {step === 3 && (
                    <div className="erp-modal-overlay">
                      <div className="erp-modal">
                        <h4>Confirm Delete</h4>
                        <p>Are you sure you want to delete Tom Delacroix? This action cannot be undone.</p>
                        <div className="erp-modal-actions">
                          <button className="erp-btn erp-btn-cancel">Cancel</button>
                          <button className="erp-btn erp-btn-confirm">Yes, Delete</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {deleted && (
                <div className="erp-view erp-deleted">
                  <div className="erp-deleted-icon">✓</div>
                  <h3>Customer deleted successfully</h3>
                  <p>Tom Delacroix has been removed from the CRM.</p>
                </div>
              )}
            </div>
          </div>

          <div
            className={`auto-cursor ${clicking ? 'auto-cursor-click' : ''}`}
            style={{ left: cursor.x, top: cursor.y }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 2L16 10L10 11L8 18L4 2Z" fill="white" stroke="#333" strokeWidth="1"/>
            </svg>
            {clicking && <div className="cursor-ripple" />}
          </div>
        </div>
      </div>

      <div className="exhibit-bottom">
        <div className="exhibit-bottom-inner">
          <h2 className="exhibit-bottom-title">How this works</h2>
          <div className="exhibit-explainer-grid">
            <div className="explainer-card">
              <span className="explainer-method ext">EXTENSION</span>
              <h3>Lives in your browser</h3>
              <p>A custom Chrome extension runs silently in the background, triggering actions on any web-based system without touching the API.</p>
            </div>
            <div className="explainer-card">
              <span className="explainer-method auto">AUTOMATE</span>
              <h3>Clicks so you don't have to</h3>
              <p>Navigation, form fills, button clicks, confirmations — anything a human does manually in a browser can be scripted and automated.</p>
            </div>
            <div className="explainer-card">
              <span className="explainer-method trigger">TRIGGER</span>
              <h3>Run on demand or on schedule</h3>
              <p>Fire the extension manually with one click, or set it to run on a timer. Bulk actions that took hours now take seconds.</p>
            </div>
          </div>
          <p className="exhibit-bottom-note">
            Works on any web-based system — no API access needed. If you can see it in a browser, it can be automated.
          </p>
        </div>
      </div>
    </main>
  )
}