import React, { useState } from 'react'
import { Target, Pencil, Check, X, AlertTriangle, TrendingUp } from 'lucide-react'
import { useFinance } from '../context/FinanceContext'
import { useToast } from '../context/ToastContext'
import { formatCurrency } from '../utils/format'
import { CATEGORY_COLORS } from '../data/transactions'

function BudgetRow({ item, isAdmin, onSave }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(String(item.limit))
  const toast = useToast()

  function handleSave() {
    const num = parseFloat(value)
    if (!num || num <= 0) { toast('Enter a valid budget amount', 'error'); return }
    onSave(item.category, num)
    setEditing(false)
    toast(`Budget updated for ${item.category}`, 'success')
  }

  const color = CATEGORY_COLORS[item.category] || '#6b7280'
  const barColor = item.over ? '#f43f5e' : item.pct > 80 ? '#f59e0b' : color
  const status = item.over ? 'over' : item.pct > 80 ? 'warning' : 'ok'

  return (
    <div className="flex flex-col gap-2 p-4 rounded-xl border border-ink-100 dark:border-ink-700 bg-ink-50/50 dark:bg-ink-700/30 hover:bg-ink-50 dark:hover:bg-ink-700/50 transition-colors">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
          <span className="text-sm font-medium text-ink-700 dark:text-ink-200 truncate">{item.category}</span>
          {status === 'over' && (
            <span className="badge-expense text-xs">Over!</span>
          )}
          {status === 'warning' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
              <AlertTriangle size={10} /> Near limit
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-ink-500 dark:text-ink-400 font-mono">
            {formatCurrency(item.used)} / {editing ? '' : formatCurrency(item.limit)}
          </span>

          {isAdmin && (
            editing ? (
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  className="input w-24 py-1 text-xs"
                  autoFocus
                  onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') setEditing(false) }}
                />
                <button onClick={handleSave} className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 transition-colors">
                  <Check size={13} />
                </button>
                <button onClick={() => setEditing(false)} className="p-1.5 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-600 text-ink-400 transition-colors">
                  <X size={13} />
                </button>
              </div>
            ) : (
              <button onClick={() => { setValue(String(item.limit)); setEditing(true) }} className="p-1.5 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-600 text-ink-400 hover:text-ink-600 dark:hover:text-ink-300 transition-colors">
                <Pencil size={13} />
              </button>
            )
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-ink-200 dark:bg-ink-600 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${item.pct}%`, backgroundColor: barColor }}
        />
      </div>
      <div className="flex justify-between text-xs text-ink-400 dark:text-ink-500">
        <span>{item.pct.toFixed(0)}% used</span>
        <span>{item.over ? `${formatCurrency(item.used - item.limit)} over budget` : `${formatCurrency(item.limit - item.used)} remaining`}</span>
      </div>
    </div>
  )
}

export default function BudgetPage() {
  const { budgetUsage, setBudget, role } = useFinance()
  const isAdmin = role === 'admin'

  const totalBudget  = budgetUsage.reduce((s, b) => s + b.limit, 0)
  const totalSpent   = budgetUsage.reduce((s, b) => s + b.used,  0)
  const overCount    = budgetUsage.filter(b => b.over).length
  const onTrackCount = budgetUsage.filter(b => !b.over && b.pct <= 80).length

  return (
    <div className="space-y-6">
      <div className="animate-in">
        <h1 className="font-display font-bold text-2xl text-ink-800 dark:text-white">Budget Tracker</h1>
        <p className="text-sm text-ink-400 dark:text-ink-500 mt-0.5">Monthly spending limits per category</p>
      </div>

      {!isAdmin && (
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-sm">
          <span>⚠️</span>
          <span>You're in <strong>Viewer</strong> mode — budget limits are read-only.</span>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in stagger-1">
        <div className="card">
          <div className="w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center mb-3">
            <Target size={18} className="text-violet-500" />
          </div>
          <p className="text-xs text-ink-400 dark:text-ink-500 mb-1">Total Budget</p>
          <p className="font-display font-bold text-xl text-ink-800 dark:text-white">{formatCurrency(totalBudget)}</p>
        </div>
        <div className="card">
          <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center mb-3">
            <TrendingUp size={18} className="text-rose-500" />
          </div>
          <p className="text-xs text-ink-400 dark:text-ink-500 mb-1">Total Spent (This Month)</p>
          <p className="font-display font-bold text-xl text-rose-600 dark:text-rose-400">{formatCurrency(totalSpent)}</p>
        </div>
        <div className="card">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mb-3">
            <Check size={18} className="text-emerald-500" />
          </div>
          <p className="text-xs text-ink-400 dark:text-ink-500 mb-1">Categories Status</p>
          <p className="font-display font-bold text-xl text-ink-800 dark:text-white">
            <span className="text-emerald-600 dark:text-emerald-400">{onTrackCount} on track</span>
            {overCount > 0 && <span className="text-rose-500 ml-2">{overCount} over</span>}
          </p>
        </div>
      </div>

      {/* Budget rows */}
      <div className="card animate-in stagger-2">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-semibold text-ink-800 dark:text-white">Category Budgets</h2>
          {isAdmin && <p className="text-xs text-ink-400 dark:text-ink-500">Click ✏️ to edit any limit</p>}
        </div>
        <div className="space-y-3">
          {budgetUsage.length === 0 ? (
            <p className="text-center py-8 text-ink-400 dark:text-ink-500 text-sm">No budget data available</p>
          ) : (
            budgetUsage.map(item => (
              <BudgetRow key={item.category} item={item} isAdmin={isAdmin} onSave={setBudget} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
