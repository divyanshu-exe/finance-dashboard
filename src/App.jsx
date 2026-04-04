import React, { useState, Component } from 'react'
import { FinanceProvider, useFinance } from './context/FinanceContext'
import { ToastProvider } from './context/ToastContext'
import Sidebar from './components/layout/Sidebar'
import Topbar from './components/layout/Topbar'
import LoadingScreen from './components/ui/LoadingScreen'
import DashboardPage from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import InsightsPage from './pages/InsightsPage'
import BudgetPage from './pages/BudgetPage'

// ── Error Boundary ────────────────────────────────────────────────────────────
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null } }
  static getDerivedStateFromError(error) { return { hasError: true, error } }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-ink-50 dark:bg-ink-900">
          <div className="card max-w-md w-full text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="font-display font-bold text-xl text-ink-800 dark:text-white mb-2">Something went wrong</h1>
            <p className="text-sm text-ink-500 dark:text-ink-400 mb-5">{this.state.error?.message || 'An unexpected error occurred.'}</p>
            <button onClick={() => window.location.reload()} className="btn-primary mx-auto">
              Reload App
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// ── Main shell ────────────────────────────────────────────────────────────────
function AppShell() {
  const { activeTab, loading } = useFinance()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (loading) return <LoadingScreen />

  const pages = {
    dashboard:    <DashboardPage />,
    transactions: <TransactionsPage />,
    insights:     <InsightsPage />,
    budget:       <BudgetPage />,
  }

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-900 transition-colors duration-300">
      <div className="hidden lg:block"><Sidebar /></div>

      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 z-20 bg-ink-900/40 backdrop-blur-sm lg:hidden" onClick={() => setMobileMenuOpen(false)} />
          <div className="lg:hidden"><Sidebar /></div>
        </>
      )}

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Topbar onMenuToggle={() => setMobileMenuOpen(o => !o)} menuOpen={mobileMenuOpen} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {pages[activeTab] || <DashboardPage />}
        </main>
        <footer className="px-6 pb-6 text-center text-xs text-ink-300 dark:text-ink-600">
          Divyanshu Gupta © 2024 · Built with React + Tailwind
        </footer>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <FinanceProvider>
        <ToastProvider>
          <AppShell />
        </ToastProvider>
      </FinanceProvider>
    </ErrorBoundary>
  )
}
