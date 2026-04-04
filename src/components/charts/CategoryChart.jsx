import React, { useState } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { useFinance } from '../../context/FinanceContext'
import { CATEGORY_COLORS } from '../../data/transactions'
import { formatCurrency, pct } from '../../utils/format'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div className="bg-white dark:bg-ink-800 border border-ink-100 dark:border-ink-700 rounded-xl p-3 shadow-lg text-sm">
      <p className="font-semibold text-ink-700 dark:text-ink-200">{d.name}</p>
      <p className="font-mono font-medium mt-1" style={{ color: d.payload.fill }}>
        {formatCurrency(d.value)}
      </p>
    </div>
  )
}

export default function CategoryChart() {
  const { categoryBreakdown } = useFinance()
  const [activeIndex, setActiveIndex] = useState(null)
  const total = categoryBreakdown.reduce((s, c) => s + c.value, 0)
  const top6 = categoryBreakdown.slice(0, 6)

  return (
    <div className="card animate-in stagger-3">
      <div className="mb-5">
        <h2 className="font-display font-semibold text-ink-800 dark:text-white">Spending by Category</h2>
        <p className="text-xs text-ink-400 dark:text-ink-500 mt-0.5">Top 6 expense categories</p>
      </div>

      {top6.length === 0 ? (
        <div className="h-40 flex items-center justify-center text-ink-400 dark:text-ink-500 text-sm">
          No expense data available
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Donut */}
          <div className="w-44 h-44 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={top6}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={72}
                  paddingAngle={3}
                  dataKey="value"
                  onMouseEnter={(_, i) => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {top6.map((entry, i) => (
                    <Cell
                      key={entry.name}
                      fill={CATEGORY_COLORS[entry.name] || '#94a3b8'}
                      opacity={activeIndex === null || activeIndex === i ? 1 : 0.4}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex-1 w-full space-y-2.5">
            {top6.map((entry, i) => {
              const color = CATEGORY_COLORS[entry.name] || '#94a3b8'
              const share = pct(entry.value, total)
              return (
                <div
                  key={entry.name}
                  className="flex items-center gap-2.5"
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-xs text-ink-600 dark:text-ink-300 flex-1 truncate">{entry.name}</span>
                  <span className="text-xs font-mono font-medium text-ink-700 dark:text-ink-200">
                    {formatCurrency(entry.value, true)}
                  </span>
                  <span className="text-xs text-ink-400 dark:text-ink-500 w-8 text-right">{share}%</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
