import React from 'react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts'
import { formatCurrency } from '../../utils/format'
import { useFinance } from '../../context/FinanceContext'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-ink-800 border border-ink-100 dark:border-ink-700 rounded-xl p-3 shadow-lg text-sm">
      <p className="font-semibold text-ink-700 dark:text-ink-200 mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: p.fill }} />
          <span className="text-ink-500 dark:text-ink-400 capitalize">{p.name}:</span>
          <span className="font-mono font-medium" style={{ color: p.fill }}>
            {formatCurrency(p.value)}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function MonthlyComparisonChart() {
  // ✅ Uses live balanceTrend derived from real transactions
  const { darkMode, balanceTrend } = useFinance()
  const axisColor = darkMode ? '#52525b' : '#d1d1d6'
  const textColor = darkMode ? '#71717a' : '#a1a1aa'
  const last6 = balanceTrend.slice(-6)

  return (
    <div className="card animate-in stagger-2">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-display font-semibold text-ink-800 dark:text-white">Monthly Comparison</h2>
          <p className="text-xs text-ink-400 dark:text-ink-500 mt-0.5">Income vs Expenses — last 6 months</p>
        </div>
      </div>

      {last6.length === 0 ? (
        <div className="h-56 flex items-center justify-center text-ink-400 dark:text-ink-500 text-sm">
          No transaction data to display
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={last6} margin={{ top: 5, right: 5, bottom: 0, left: 0 }} barGap={4}>
            <CartesianGrid stroke={axisColor} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: textColor, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: textColor, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} width={40} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} formatter={v => <span className="text-ink-500 dark:text-ink-400 capitalize">{v}</span>} />
            <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={28} />
            <Bar dataKey="expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
