import { useMemo } from 'react'
import { useFinance } from '../context/FinanceContext'

export function useInsights() {
  const { transactions, categoryBreakdown, balanceTrend } = useFinance()

  return useMemo(() => {
    // Highest spending category
    const topCategory = categoryBreakdown[0] || null

    // Month-over-month from derived balanceTrend
    const last  = balanceTrend[balanceTrend.length - 1]
    const prev  = balanceTrend[balanceTrend.length - 2]

    const expenseDelta = last && prev && prev.expenses
      ? ((last.expenses - prev.expenses) / prev.expenses) * 100
      : 0
    const incomeDelta = last && prev && prev.income
      ? ((last.income - prev.income) / prev.income) * 100
      : 0
    const savingsRate = last && last.income
      ? ((last.income - last.expenses) / last.income) * 100
      : 0

    // Per-category month-over-month from raw transactions
    const now   = new Date()
    const thisM = now.getMonth()
    const lastM = thisM === 0 ? 11 : thisM - 1

    const txThisMonth = transactions.filter(t => new Date(t.date).getMonth() === thisM  && t.type === 'expense')
    const txLastMonth = transactions.filter(t => new Date(t.date).getMonth() === lastM  && t.type === 'expense')

    const catThis = {}
    txThisMonth.forEach(t => { catThis[t.category] = (catThis[t.category] || 0) + t.amount })
    const catLast = {}
    txLastMonth.forEach(t => { catLast[t.category] = (catLast[t.category] || 0) + t.amount })

    const categoryChanges = Object.entries(catThis)
      .map(([cat, amount]) => {
        const p = catLast[cat] || 0
        const delta = p ? ((amount - p) / p) * 100 : null
        return { category: cat, amount, prevAmount: p, delta }
      })
      .filter(c => c.delta !== null)
      .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
      .slice(0, 3)

    // Savings streak — consecutive months where balance grew
    let savingStreak = 0
    for (let i = balanceTrend.length - 1; i > 0; i--) {
      if (balanceTrend[i].balance > balanceTrend[i - 1].balance) savingStreak++
      else break
    }

    return {
      topCategory,
      expenseDelta,
      incomeDelta,
      savingsRate,
      categoryChanges,
      savingStreak,
      currentMonth:  last?.month  || '',
      previousMonth: prev?.month  || '',
    }
  }, [transactions, categoryBreakdown, balanceTrend])
}
