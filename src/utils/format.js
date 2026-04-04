// ─── Formatting ──────────────────────────────────────────────────────────────

export function formatCurrency(amount, compact = false) {
  if (compact && Math.abs(amount) >= 1000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount)
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatShortDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

// ─── CSV / JSON Export ────────────────────────────────────────────────────────

export function exportCSV(transactions) {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount']
  const rows = transactions.map(t => [
    t.date,
    `"${t.description}"`,
    t.category,
    t.type,
    t.type === 'expense' ? -t.amount : t.amount,
  ])
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
  downloadFile(csv, 'transactions.csv', 'text/csv')
}

export function exportJSON(transactions) {
  const json = JSON.stringify(transactions, null, 2)
  downloadFile(json, 'transactions.json', 'application/json')
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

// ─── Misc ─────────────────────────────────────────────────────────────────────

export function pct(value, total) {
  if (!total) return 0
  return Math.round((value / total) * 100)
}

export function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max)
}

export function getTodayStr() {
  return new Date().toISOString().split('T')[0]
}
