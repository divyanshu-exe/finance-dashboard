import React from 'react'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { formatCurrency } from '../../utils/format'

const configs = {
  balance: {
    label: 'Total Balance',
    icon: Wallet,
    iconBg: 'bg-violet-50 dark:bg-violet-900/30',
    iconColor: 'text-violet-500',
    valueColor: 'text-ink-800 dark:text-white',
  },
  income: {
    label: 'Total Income',
    icon: TrendingUp,
    iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-500',
    valueColor: 'text-emerald-600 dark:text-emerald-400',
  },
  expense: {
    label: 'Total Expenses',
    icon: TrendingDown,
    iconBg: 'bg-rose-50 dark:bg-rose-900/30',
    iconColor: 'text-rose-500',
    valueColor: 'text-rose-600 dark:text-rose-400',
  },
}

export default function StatCard({ type, amount, pctChange }) {
  const cfg = configs[type]
  const Icon = cfg.icon
  const isPositive = pctChange >= 0

  return (
    <div className="card animate-in">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${cfg.iconBg} flex items-center justify-center`}>
          <Icon size={20} className={cfg.iconColor} strokeWidth={2} />
        </div>
        {pctChange !== undefined && (
          <span className={`
            text-xs font-medium px-2 py-0.5 rounded-full
            ${isPositive
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
              : 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
            }
          `}>
            {isPositive ? '↑' : '↓'} {Math.abs(pctChange).toFixed(1)}%
          </span>
        )}
      </div>

      <p className="text-sm text-ink-400 dark:text-ink-500 mb-1 font-medium">{cfg.label}</p>
      <p className={`text-2xl font-display font-bold ${cfg.valueColor} tabular-nums`}>
        {formatCurrency(amount)}
      </p>
    </div>
  )
}
