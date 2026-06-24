'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const orders = [
  { id: '#001', product: 'Product A', qty: 12, amount: '$1,400', remarks: 'Rush order' },
  { id: '#002', product: 'Product B', qty: 5, amount: '$820', remarks: 'Standard' },
  { id: '#003', product: 'Product C', qty: 30, amount: '$3,600', remarks: 'Bulk discount' },
  { id: '#004', product: 'Product D', qty: 8, amount: '$960', remarks: 'Priority' },
  { id: '#005', product: 'Product E', qty: 15, amount: '$2,250', remarks: 'Backorder' },
]

const chartData = [
  { label: 'Product A', value: 1400, pct: 39 },
  { label: 'Product B', value: 820, pct: 23 },
  { label: 'Product C', value: 3600, pct: 100 },
  { label: 'Product D', value: 960, pct: 27 },
  { label: 'Product E', value: 2250, pct: 63 },
]

type Phase = 'erp1-only' | 'sheet-filled' | 'erp2-filled' | 'clearing'

export default function Exhibit04() {
  const [phase, setPhase] = useState<Phase>('erp1-only')

  useEffect(() => {
    const timings: Record<Phase, number> = {
      'erp1-only': 3000,
      'sheet-filled': 3000,
      'erp2-filled': 2000,
      'clearing': 1000,
    }
    const next: Record<Phase, Phase> = {
      'erp1-only': 'sheet-filled',
      'sheet-filled': 'erp2-filled',
      'erp2-filled': 'clearing',
      'clearing': 'erp1-only',
    }
    const t = setTimeout(() => setPhase(next[phase]), timings[phase])
    return () => clearTimeout(t)
  }, [phase])

  const sheetVisible = phase === 'sheet-filled' || phase === 'erp2-filled'
  const erp2Visible = phase === 'erp2-filled'

  return (
    <main className="exhibit-page">
      <div className="exhibit-nav">
        <Link href="/" className="exhibit-back">← Back to Exhibits</Link>
        <span className="exhibit-nav-label">04 — Bridge any two systems</span>
      </div>

      {/* FLOW INDICATOR */}
      <div className="flow-indicator">
        <div className={`flow-node ${phase !== 'clearing' ? 'flow-node-active' : ''}`}>
          <span>ERP 1</span>
          <p>InventoryOS</p>
        </div>
        <div className={`flow-arrow ${sheetVisible ? 'flow-arrow-active' : ''}`}>
          <div className="flow-arrow-line" />
          <span>GET</span>
          <div className="flow-arrow-head">→</div>
        </div>
        <div className={`flow-node ${sheetVisible ? 'flow-node-active' : ''}`}>
          <span>Sheet</span>
          <p>Google Sheets</p>
        </div>
        <div className={`flow-arrow ${erp2Visible ? 'flow-arrow-active' : ''}`}>
          <div className="flow-arrow-line" />
          <span>POST</span>
          <div className="flow-arrow-head">→</div>
        </div>
        <div className={`flow-node ${erp2Visible ? 'flow-node-active' : ''}`}>
          <span>ERP 2</span>
          <p>FulfillPro</p>
        </div>
      </div>

      {/* THREE COLUMN LAYOUT */}
      <div className="bridge-columns">

        {/* ERP 1 */}
        <div className="bridge-col">
          <div className="bridge-col-header">
            <span className="bridge-col-tag erp1-tag">ERP 1</span>
            <span className="bridge-col-name">InventoryOS</span>
            <span className="bridge-col-live">● Live</span>
          </div>
          <div className="erp1-body">
            {orders.map((o) => (
              <div key={o.id} className="erp1-card">
                <div className="erp1-card-top">
                  <span className="erp1-order-id">{o.id}</span>
                  <span className="erp1-amount">{o.amount}</span>
                </div>
                <div className="erp1-card-mid">
                  <span className="erp1-product">{o.product}</span>
                  <span className="erp1-qty">Qty: {o.qty}</span>
                </div>
                <div className="erp1-card-bottom">
                  <span className="erp1-remark">{o.remarks}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SHEET */}
        <div className="bridge-col">
          <div className="bridge-col-header">
            <span className="bridge-col-tag sheet-tag">Sheet</span>
            <span className="bridge-col-name">orders-sync.xlsx</span>
            <span className={`bridge-col-sync ${sheetVisible ? 'bridge-col-sync-active' : ''}`}>
              {sheetVisible ? '↻ Synced' : '○ Waiting'}
            </span>
          </div>
          <div className={`sheet-body ${sheetVisible ? 'sheet-body-visible' : ''}`}>
            <div className="sheet-header-row">
              <span></span>
              <span>A</span><span>B</span><span>C</span><span>D</span><span>E</span>
            </div>
            <div className="sheet-label-row">
              <span>1</span>
              <span>Order</span><span>Product</span><span>Qty</span><span>Amount</span><span>Remarks</span>
            </div>
            {orders.map((o, i) => (
              <div key={o.id} className="sheet-data-row" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="sheet-row-num">{i + 2}</span>
                <span>{o.id}</span>
                <span>{o.product}</span>
                <span>{o.qty}</span>
                <span>{o.amount}</span>
                <span>{o.remarks}</span>
              </div>
            ))}
          </div>
          {!sheetVisible && (
            <div className="bridge-empty">
              <p>Waiting for GET request...</p>
            </div>
          )}
        </div>

        {/* ERP 2 */}
        <div className="bridge-col">
          <div className="bridge-col-header">
            <span className="bridge-col-tag erp2-tag">ERP 2</span>
            <span className="bridge-col-name">FulfillPro</span>
            <span className={`bridge-col-sync ${erp2Visible ? 'bridge-col-sync-active' : ''}`}>
              {erp2Visible ? '● Updated' : '○ Waiting'}
            </span>
          </div>

          {erp2Visible && (
            <div className="erp2-body">
              <div className="erp2-stats">
                <div className="erp2-stat">
                  <span className="erp2-stat-value">5</span>
                  <span className="erp2-stat-label">Orders received</span>
                </div>
                <div className="erp2-stat">
                  <span className="erp2-stat-value">$9,030</span>
                  <span className="erp2-stat-label">Total value</span>
                </div>
                <div className="erp2-stat">
                  <span className="erp2-stat-value">70</span>
                  <span className="erp2-stat-label">Total units</span>
                </div>
              </div>

              <div className="erp2-chart-section">
                <span className="erp2-chart-title">Revenue by product</span>
                <div className="erp2-chart">
                  {chartData.map((d, i) => (
                    <div key={d.label} className="erp2-bar-row" style={{ animationDelay: `${i * 0.1}s` }}>
                      <span className="erp2-bar-label">{d.label}</span>
                      <div className="erp2-bar-track">
                        <div className="erp2-bar-fill" style={{ width: `${d.pct}%` }} />
                      </div>
                      <span className="erp2-bar-val">${d.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="erp2-orders">
                <span className="erp2-orders-title">Order queue</span>
                {orders.map((o, i) => (
                  <div key={o.id} className="erp2-order-row" style={{ animationDelay: `${i * 0.08}s` }}>
                    <span className="erp2-order-id">{o.id}</span>
                    <span className="erp2-order-product">{o.product}</span>
                    <span className={`erp2-order-status ${o.remarks === 'Rush order' || o.remarks === 'Priority' ? 'erp2-status-urgent' : 'erp2-status-normal'}`}>
                      {o.remarks === 'Rush order' || o.remarks === 'Priority' ? 'Urgent' : 'Normal'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!erp2Visible && (
            <div className="bridge-empty">
              <p>{sheetVisible ? 'Waiting for POST request...' : 'Waiting for data...'}</p>
            </div>
          )}
        </div>

      </div>

      {/* BOTTOM */}
      <div className="exhibit-bottom">
        <div className="exhibit-bottom-inner">
          <h2 className="exhibit-bottom-title">How this works</h2>
          <div className="exhibit-explainer-grid">
            <div className="explainer-card">
              <span className="explainer-method get">GET</span>
              <h3>Pull from ERP 1</h3>
              <p>Apps Script sends a GET request to InventoryOS, pulling all current order data into Google Sheets automatically.</p>
            </div>
            <div className="explainer-card">
              <span className="explainer-method sheet-method">TRANSLATE</span>
              <h3>Sheet as the bridge</h3>
              <p>Google Sheets acts as the middleware — formatting, filtering, and preparing the data before it moves to the next system.</p>
            </div>
            <div className="explainer-card">
              <span className="explainer-method post">POST</span>
              <h3>Push to ERP 2</h3>
              <p>Once the sheet is updated, Apps Script fires a POST request to FulfillPro — updating orders, queues, and dashboards automatically.</p>
            </div>
          </div>
          <p className="exhibit-bottom-note">
            Works with any two systems that have APIs. Google Sheets becomes the universal translator between platforms that were never meant to talk to each other.
          </p>
        </div>
      </div>
    </main>
  )
}