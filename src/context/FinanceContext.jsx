import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { mockApi } from '../data/mockApi'
import { CATEGORIES } from '../data/transactions'

const STORAGE_KEY = 'finflow_state'

// Default budget limits per category (monthly)
const DEFAULT_BUDGETS = {
  'Food & Dining':    500,
  'Transportation':   200,
  'Shopping':         300,
  'Entertainment':    150,
  'Health & Medical': 200,
  'Housing':         1500,
  'Utilities':        200,
  'Education':        250,
  'Travel':           400,
}

const defaultState = {
  transactions: [],
  loading: true,
  apiError: null,
  role: 'admin',
  darkMode: false,
  activeTab: 'dashboard',
  budgets: DEFAULT_BUDGETS,
  filters: {
    search: '',
    type: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
    dateFrom: '',
    dateTo: '',
  },
}

const getInitialState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return { ...defaultState, ...parsed, loading: true, apiError: null }
    }
  } catch (_) {}
  return defaultState
}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, apiError: null, transactions: action.payload }
    case 'FETCH_ERROR':
      return { ...state, loading: false, apiError: action.payload }
    case 'SET_ROLE':
      return { ...state, role: action.payload }
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode }
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload }
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } }
    case 'RESET_FILTERS':
      return { ...state, filters: defaultState.filters }
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] }
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      }
    case 'DELETE_TRANSACTION':
      return { ...state, transactions: state.transactions.filter(t => t.id !== action.payload) }
    case 'SET_BUDGET':
      return { ...state, budgets: { ...state.budgets, [action.payload.category]: action.payload.amount } }
    default:
      return state
  }
}

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function deriveBalanceTrend(transactions) {
  if (!transactions.length) return []
  const monthMap = {}
  transactions.forEach(t => {
    const key = t.date.slice(0, 7)
    if (!monthMap[key]) monthMap[key] = { income: 0, expenses: 0 }
    if (t.type === 'income')  monthMap[key].income   += t.amount
    if (t.type === 'expense') monthMap[key].expenses += t.amount
  })
  const sortedKeys = Object.keys(monthMap).sort()
  const last12 = sortedKeys.slice(-12)
  let runningBalance = 0
  return last12.map(key => {
    const [year, month] = key.split('-')
    const { income, expenses } = monthMap[key]
    runningBalance = runningBalance + income - expenses
    return {
      month: MONTH_NAMES[parseInt(month, 10) - 1],
      year: parseInt(year, 10),
      income: Math.round(income),
      expenses: Math.round(expenses),
      balance: Math.round(runningBalance),
    }
  })
}

const FinanceContext = createContext(null)

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState)

  useEffect(() => {
    let cancelled = false
    mockApi.fetchTransactions()
      .then(data => { if (!cancelled) dispatch({ type: 'FETCH_SUCCESS', payload: data }) })
      .catch(err  => { if (!cancelled) dispatch({ type: 'FETCH_ERROR', payload: err.message }) })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (state.loading) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch (_) {}
  }, [state])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.darkMode)
  }, [state.darkMode])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return
      if (e.key === '1') dispatch({ type: 'SET_ACTIVE_TAB', payload: 'dashboard' })
      if (e.key === '2') dispatch({ type: 'SET_ACTIVE_TAB', payload: 'transactions' })
      if (e.key === '3') dispatch({ type: 'SET_ACTIVE_TAB', payload: 'insights' })
      if (e.key === '4') dispatch({ type: 'SET_ACTIVE_TAB', payload: 'budget' })
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const setRole        = useCallback(role => dispatch({ type: 'SET_ROLE', payload: role }), [])
  const toggleDarkMode = useCallback(() => dispatch({ type: 'TOGGLE_DARK_MODE' }), [])
  const setActiveTab   = useCallback(tab => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab }), [])
  const setFilter      = useCallback(f => dispatch({ type: 'SET_FILTER', payload: f }), [])
  const resetFilters   = useCallback(() => dispatch({ type: 'RESET_FILTERS' }), [])
  const setBudget      = useCallback((category, amount) => dispatch({ type: 'SET_BUDGET', payload: { category, amount } }), [])

  const addTransaction = useCallback(async (tx) => {
    const created = await mockApi.createTransaction(tx)
    dispatch({ type: 'ADD_TRANSACTION', payload: created })
  }, [])

  const updateTransaction = useCallback(async (tx) => {
    const updated = await mockApi.updateTransaction(tx)
    dispatch({ type: 'UPDATE_TRANSACTION', payload: updated })
  }, [])

  const deleteTransaction = useCallback(async (id) => {
    await mockApi.deleteTransaction(id)
    dispatch({ type: 'DELETE_TRANSACTION', payload: id })
  }, [])

  const filteredTransactions = React.useMemo(() => {
    let list = [...state.transactions]
    if (state.filters.search) {
      const q = state.filters.search.toLowerCase()
      list = list.filter(t =>
        t.category.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      )
    }
    if (state.filters.type !== 'all') list = list.filter(t => t.type === state.filters.type)
    if (state.filters.dateFrom) list = list.filter(t => t.date >= state.filters.dateFrom)
    if (state.filters.dateTo)   list = list.filter(t => t.date <= state.filters.dateTo)
    list.sort((a, b) => {
      let cmp = 0
      if (state.filters.sortBy === 'date')   cmp = new Date(a.date) - new Date(b.date)
      if (state.filters.sortBy === 'amount') cmp = a.amount - b.amount
      return state.filters.sortOrder === 'desc' ? -cmp : cmp
    })
    return list
  }, [state.transactions, state.filters])

  const summary = React.useMemo(() => {
    const income   = state.transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const expenses = state.transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    return { income, expenses, balance: income - expenses }
  }, [state.transactions])

  const categoryBreakdown = React.useMemo(() => {
    const map = {}
    state.transactions.filter(t => t.type === 'expense')
      .forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount })
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
  }, [state.transactions])

  const balanceTrend = React.useMemo(() => deriveBalanceTrend(state.transactions), [state.transactions])

  // Budget usage for current month
  const budgetUsage = React.useMemo(() => {
    const now = new Date()
    const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    const spent = {}
    state.transactions
      .filter(t => t.type === 'expense' && t.date.startsWith(currentMonthKey))
      .forEach(t => { spent[t.category] = (spent[t.category] || 0) + t.amount })

    return CATEGORIES.filter(cat => state.budgets[cat]).map(cat => {
      const limit = state.budgets[cat] || 0
      const used  = spent[cat] || 0
      const pct   = limit > 0 ? Math.min((used / limit) * 100, 100) : 0
      return { category: cat, limit, used, pct, over: used > limit }
    })
  }, [state.transactions, state.budgets])

  const value = {
    ...state,
    filteredTransactions,
    summary,
    categoryBreakdown,
    balanceTrend,
    budgetUsage,
    setRole,
    toggleDarkMode,
    setActiveTab,
    setFilter,
    resetFilters,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setBudget,
  }

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

export function useFinance() {
  const ctx = useContext(FinanceContext)
  if (!ctx) throw new Error('useFinance must be used inside FinanceProvider')
  return ctx
}
