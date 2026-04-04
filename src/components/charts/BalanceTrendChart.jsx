import React from 'react'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
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
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-ink-500 dark:text-ink-400 capitalize">{p.name}:</span>
          <span className="font-mono font-medium" style={{ color: p.color }}>
            {formatCurrency(p.value)}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function BalanceTrendChart() {
  // ✅ Uses live balanceTrend derived from real transactions — not static data
  const { darkMode, balanceTrend } = useFinance()
  const axisColor = darkMode ? '#52525b' : '#d1d1d6'
  const textColor = darkMode ? '#71717a' : '#a1a1aa'

  return (
    <div className="card animate-in stagger-2">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-display font-semibold text-ink-800 dark:text-white">Balance Trend</h2>
          <p className="text-xs text-ink-400 dark:text-ink-500 mt-0.5">
            Derived from your actual transactions
          </p>
        </div>
        <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-ink-100 dark:bg-ink-700 text-ink-500 dark:text-ink-400">
          Last {balanceTrend.length} months
        </span>
      </div>

      {balanceTrend.length === 0 ? (
        <div className="h-60 flex items-center justify-center text-ink-400 dark:text-ink-500 text-sm">
          No transaction data to display
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={balanceTrend} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
            <CartesianGrid stroke={axisColor} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: textColor, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: textColor, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
              width={42}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 16 }}
              formatter={v => <span className="text-ink-500 dark:text-ink-400 capitalize">{v}</span>}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#f43f5e"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
