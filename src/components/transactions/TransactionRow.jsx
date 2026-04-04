import React from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { formatCurrency, formatShortDate } from '../../utils/format'
import { CATEGORY_COLORS } from '../../data/transactions'

export default function TransactionRow({ transaction, isAdmin, onEdit, onDelete }) {
  const { date, description, category, type, amount } = transaction
  const isIncome = type === 'income'
  const color = CATEGORY_COLORS[category] || '#6b7280'

  return (
    <div className="
      flex items-center gap-3 px-4 py-3.5
      hover:bg-ink-50/80 dark:hover:bg-ink-700/50
      border-b border-ink-100/80 dark:border-ink-700/60
      last:border-0 transition-colors duration-100 group
    ">
      {/* Category dot */}
      <div
        className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
        style={{ backgroundColor: color + '22', color }}
      >
        {category.charAt(0)}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-ink-800 dark:text-ink-100 truncate">{description}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-ink-400 dark:text-ink-500">{formatShortDate(date)}</span>
          <span className="w-1 h-1 rounded-full bg-ink-200 dark:bg-ink-600" />
          <span className="text-xs" style={{ color }}>{category}</span>
        </div>
      </div>

      {/* Amount */}
      <div className={`
        font-mono font-semibold text-sm tabular-nums whitespace-nowrap
        ${isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}
      `}>
        {isIncome ? '+' : '−'}{formatCurrency(amount)}
      </div>

      {/* Admin actions */}
      {isAdmin && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-1">
          <button
            onClick={() => onEdit(transaction)}
            className="p-1.5 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-600 text-ink-400 hover:text-ink-700 dark:hover:text-ink-200 transition-colors"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete(transaction.id)}
            className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/30 text-ink-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
