import React from 'react'
import { Search, X, ArrowUpDown, Calendar } from 'lucide-react'
import { useFinance } from '../../context/FinanceContext'

const DATE_PRESETS = [
  { label: 'Last 7 days',  days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'This month',   days: 0 },
]

function getPresetDates(days) {
  const now = new Date()
  const to  = now.toISOString().split('T')[0]
  if (days === 0) {
    const from = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
    return { dateFrom: from, dateTo: to }
  }
  const from = new Date(now - days * 864e5).toISOString().split('T')[0]
  return { dateFrom: from, dateTo: to }
}

export default function TransactionFilters() {
  const { filters, setFilter, resetFilters } = useFinance()
  const hasActiveFilters = filters.search || filters.type !== 'all' || filters.dateFrom || filters.dateTo

  function toggleSort(field) {
    if (filters.sortBy === field) {
      setFilter({ sortOrder: filters.sortOrder === 'desc' ? 'asc' : 'desc' })
    } else {
      setFilter({ sortBy: field, sortOrder: 'desc' })
    }
  }

  return (
    <div className="space-y-3 relative z-0">
      {/* Row 1: Search + Type + Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by category or description…"
            value={filters.search}
            onChange={e => setFilter({ search: e.target.value })}
            className="input pl-9"
          />
          {filters.search && (
            <button onClick={() => setFilter({ search: '' })} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600 dark:hover:text-ink-200">
              <X size={14} />
            </button>
          )}
        </div>

        <select
          value={filters.type}
          onChange={e => setFilter({ type: e.target.value })}
          className="select sm:w-40"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <div className="flex gap-2">
          {['date', 'amount'].map(field => (
            <button
              key={field}
              onClick={() => toggleSort(field)}
              className={`
                inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all
                ${filters.sortBy === field
                  ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400'
                  : 'bg-white dark:bg-ink-700 border-ink-200 dark:border-ink-600 text-ink-500 dark:text-ink-400 hover:border-ink-300'
                }
              `}
            >
              <ArrowUpDown size={13} />
              <span className="capitalize">{field}</span>
              {filters.sortBy === field && <span className="text-xs">{filters.sortOrder === 'desc' ? '↓' : '↑'}</span>}
            </button>
          ))}
          {hasActiveFilters && (
            <button onClick={resetFilters} className="btn-secondary">
              <X size={14} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Row 2: Date range */}
      <div className="flex flex-wrap items-center gap-2">
        <Calendar size={14} className="text-ink-400 dark:text-ink-500" />
        <span className="text-xs text-ink-500 dark:text-ink-400 font-medium">Date Range:</span>

        {/* Quick presets */}
        {DATE_PRESETS.map(p => {
          const preset = getPresetDates(p.days)
          const isActive = filters.dateFrom === preset.dateFrom && filters.dateTo === preset.dateTo
          return (
            <button
              key={p.label}
              onClick={() => isActive ? setFilter({ dateFrom: '', dateTo: '' }) : setFilter(preset)}
              className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                isActive
                  ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400'
                  : 'bg-white dark:bg-ink-700 border-ink-200 dark:border-ink-600 text-ink-500 dark:text-ink-400 hover:border-ink-300'
              }`}
            >
              {p.label}
            </button>
          )
        })}

        <span className="text-xs text-ink-300 dark:text-ink-600">|</span>

        {/* Manual date pickers */}
        <input
          type="date"
          value={filters.dateFrom}
          onChange={e => setFilter({ dateFrom: e.target.value })}
          className="input py-1.5 text-xs w-36"
          placeholder="From"
        />
        <span className="text-xs text-ink-400">→</span>
        <input
          type="date"
          value={filters.dateTo}
          onChange={e => setFilter({ dateTo: e.target.value })}
          className="input py-1.5 text-xs w-36"
          placeholder="To"
        />
      </div>
    </div>
  )
}
