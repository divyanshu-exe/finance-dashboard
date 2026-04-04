import React from 'react'
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Moon, Sun, ChevronDown, TrendingUp, Target } from 'lucide-react'
import { useFinance } from '../../context/FinanceContext'

const NAV_ITEMS = [
  { id: 'dashboard',    label: 'Dashboard',    icon: LayoutDashboard, shortcut: '1' },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight,  shortcut: '2' },
  { id: 'insights',     label: 'Insights',     icon: Lightbulb,       shortcut: '3' },
  { id: 'budget',       label: 'Budget',       icon: Target,          shortcut: '4' },
]

export default function Sidebar() {
  const { activeTab, setActiveTab, role, setRole, darkMode, toggleDarkMode } = useFinance()

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex flex-col w-64 bg-white dark:bg-ink-800 border-r border-ink-100 dark:border-ink-700 shadow-sm transition-colors duration-300">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-ink-100 dark:border-ink-700">
        <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center shadow-glow">
          <TrendingUp size={16} className="text-white" strokeWidth={2.5} />
        </div>
        <span className="font-display font-bold text-lg text-ink-800 dark:text-white tracking-tight">
          Fin<span className="text-emerald-500">Flow</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
        <p className="label px-3 mb-3">Menu</p>
        {NAV_ITEMS.map(({ id, label, icon: Icon, shortcut }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
              activeTab === id
                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                : 'text-ink-500 dark:text-ink-400 hover:bg-ink-50 dark:hover:bg-ink-700 hover:text-ink-700 dark:hover:text-ink-200'
            }`}
          >
            <Icon size={18} className={activeTab === id ? 'text-emerald-500' : 'text-ink-400 dark:text-ink-500 group-hover:text-ink-600 dark:group-hover:text-ink-300'} strokeWidth={activeTab === id ? 2.5 : 2} />
            {label}
            <span className="ml-auto flex items-center gap-1.5">
              {activeTab === id && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
              <kbd className="hidden group-hover:inline-flex items-center px-1.5 py-0.5 rounded text-xs font-mono bg-ink-100 dark:bg-ink-700 text-ink-400 dark:text-ink-500">
                {shortcut}
              </kbd>
            </span>
          </button>
        ))}
      </nav>

      {/* Keyboard shortcut hint */}
      <div className="px-4 py-2 mx-3 mb-2 rounded-xl bg-ink-50 dark:bg-ink-700/50 text-xs text-ink-400 dark:text-ink-500">
        💡 Press <kbd className="font-mono bg-ink-100 dark:bg-ink-700 px-1 rounded">1–4</kbd> to switch tabs
      </div>

      {/* Bottom controls */}
      <div className="px-4 py-5 border-t border-ink-100 dark:border-ink-700 space-y-3">
        <div>
          <label className="label">Role</label>
          <div className="relative">
            <select value={role} onChange={e => setRole(e.target.value)} className="select pr-8 appearance-none">
              <option value="admin">👑 Admin</option>
              <option value="viewer">👁 Viewer</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
          </div>
          {role === 'viewer' && (
            <p className="mt-1.5 text-xs text-amber-600 dark:text-amber-400">⚠️ Read-only mode</p>
          )}
        </div>
        <button onClick={toggleDarkMode} className="btn-secondary w-full justify-center gap-2">
          {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </aside>
  )
}
