import React from 'react'
import { useInsights } from '../hooks/useInsights'
import { useFinance } from '../context/FinanceContext'
import InsightCard from '../components/insights/InsightCard'
import MonthlyComparisonChart from '../components/charts/MonthlyComparisonChart'
import CategoryChart from '../components/charts/CategoryChart'
import { formatCurrency } from '../utils/format'

export default function InsightsPage() {
  const {
    topCategory,
    expenseDelta,
    incomeDelta,
    savingsRate,
    categoryChanges,
    savingStreak,
    currentMonth,
    previousMonth,
  } = useInsights()

  const { summary } = useFinance()

  const expenseDir  = expenseDelta  >= 0 ? 'up'   : 'down'
  const incomeDir   = incomeDelta   >= 0 ? 'up'   : 'down'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-in">
        <h1 className="font-display font-bold text-2xl text-ink-800 dark:text-white">Insights</h1>
        <p className="text-sm text-ink-400 dark:text-ink-500 mt-0.5">
          Smart observations based on your spending patterns
        </p>
      </div>

      {/* Key insight cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topCategory && (
          <InsightCard
            icon="🔥"
            title="Highest Spending"
            value={topCategory.name}
            sub={`Total: ${formatCurrency(topCategory.value)}`}
            accent="rose"
            delay="stagger-1"
          />
        )}

        <InsightCard
          icon={expenseDir === 'up' ? '📈' : '📉'}
          title="Expense Change"
          value={`${expenseDir === 'up' ? '+' : ''}${expenseDelta.toFixed(1)}% vs ${previousMonth}`}
          sub={expenseDir === 'up'
            ? `You spent more in ${currentMonth} than ${previousMonth}`
            : `You spent less in ${currentMonth} — great work!`}
          accent={expenseDir === 'up' ? 'rose' : 'emerald'}
          delay="stagger-2"
        />

        <InsightCard
          icon={incomeDir === 'up' ? '💹' : '📊'}
          title="Income Change"
          value={`${incomeDir === 'up' ? '+' : ''}${incomeDelta.toFixed(1)}% vs ${previousMonth}`}
          sub={`Income in ${currentMonth} compared to ${previousMonth}`}
          accent={incomeDir === 'up' ? 'emerald' : 'amber'}
          delay="stagger-3"
        />

        <InsightCard
          icon="💰"
          title="Savings Rate"
          value={`${savingsRate.toFixed(1)}%`}
          sub={savingsRate > 20
            ? 'Excellent! You\'re saving well above 20%'
            : savingsRate > 10
            ? 'Good progress — aim for 20%+ savings'
            : 'Try to reduce expenses to increase savings'}
          accent={savingsRate > 20 ? 'emerald' : savingsRate > 10 ? 'amber' : 'rose'}
          delay="stagger-4"
        />

        <InsightCard
          icon="🏆"
          title="Saving Streak"
          value={`${savingStreak} month${savingStreak !== 1 ? 's' : ''}`}
          sub={savingStreak > 0
            ? 'Consecutive months with balance growth'
            : 'Start growing your balance month-over-month'}
          accent={savingStreak >= 3 ? 'emerald' : savingStreak >= 1 ? 'violet' : 'ink'}
          delay="stagger-5"
        />

        <InsightCard
          icon="📊"
          title="Net Balance"
          value={formatCurrency(summary.balance)}
          sub={`From ${formatCurrency(summary.income)} income, ${formatCurrency(summary.expenses)} spent`}
          accent="violet"
          delay="stagger-5"
        />
      </div>

      {/* Category changes */}
      {categoryChanges.length > 0 && (
        <div className="card animate-in stagger-3">
          <h2 className="font-display font-semibold text-ink-800 dark:text-white mb-1">Category Observations</h2>
          <p className="text-xs text-ink-400 dark:text-ink-500 mb-5">Month-over-month spending shifts</p>
          <div className="space-y-4">
            {categoryChanges.map(c => {
              const up = c.delta > 0
              return (
                <div key={c.category} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-ink-700 dark:text-ink-200">{c.category}</span>
                      <span className={`text-xs font-medium ${up ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                        {up ? '▲' : '▼'} {Math.abs(c.delta).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-ink-100 dark:bg-ink-700 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${up ? 'bg-rose-400' : 'bg-emerald-400'}`}
                        style={{ width: `${Math.min(Math.abs(c.delta), 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-ink-400 dark:text-ink-500 mt-1.5">
                      {up
                        ? `You spent ${Math.abs(c.delta).toFixed(0)}% more on ${c.category} this month`
                        : `You spent ${Math.abs(c.delta).toFixed(0)}% less on ${c.category} this month`}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <MonthlyComparisonChart />
        </div>
        <div className="lg:col-span-2">
          <CategoryChart />
        </div>
      </div>
    </div>
  )
}
