import React from 'react'
import StatCard from '../components/ui/StatCard'
import BalanceTrendChart from '../components/charts/BalanceTrendChart'
import CategoryChart from '../components/charts/CategoryChart'
import TransactionRow from '../components/transactions/TransactionRow'
import { useFinance } from '../context/FinanceContext'

export default function DashboardPage() {
  const { summary, transactions, balanceTrend, setActiveTab } = useFinance()

  // Pct change derived from live balanceTrend
  const last  = balanceTrend[balanceTrend.length - 1]
  const prev  = balanceTrend[balanceTrend.length - 2]
  const incomePct  = last && prev && prev.income   ? ((last.income   - prev.income)   / prev.income)   * 100 : 0
  const expensePct = last && prev && prev.expenses ? ((last.expenses - prev.expenses) / prev.expenses) * 100 : 0
  const balancePct = last && prev && prev.balance  ? ((last.balance  - prev.balance)  / Math.abs(prev.balance)) * 100 : 0

  const recentTx = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="animate-in">
        <h1 className="font-display font-bold text-2xl text-ink-800 dark:text-white">Dashboard</h1>
        <p className="text-sm text-ink-400 dark:text-ink-500 mt-0.5">Here's your financial overview</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stagger-1 animate-in">
          <StatCard type="balance"  amount={summary.balance}  pctChange={balancePct} />
        </div>
        <div className="stagger-2 animate-in">
          <StatCard type="income"   amount={summary.income}   pctChange={incomePct} />
        </div>
        <div className="stagger-3 animate-in">
          <StatCard type="expense"  amount={summary.expenses} pctChange={expensePct} />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <BalanceTrendChart />
        </div>
        <div className="lg:col-span-2">
          <CategoryChart />
        </div>
      </div>

      {/* Recent transactions */}
      <div className="card animate-in stagger-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display font-semibold text-ink-800 dark:text-white">Recent Transactions</h2>
            <p className="text-xs text-ink-400 dark:text-ink-500 mt-0.5">Latest 5 entries</p>
          </div>
          <button
            onClick={() => setActiveTab('transactions')}
            className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            View all →
          </button>
        </div>

        <div className="-mx-6 -mb-6">
          {recentTx.length === 0 ? (
            <div className="py-10 text-center text-sm text-ink-400 dark:text-ink-500">
              No transactions yet
            </div>
          ) : (
            recentTx.map(tx => (
              <TransactionRow key={tx.id} transaction={tx} isAdmin={false} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
