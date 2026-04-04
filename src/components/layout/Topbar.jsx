import React, { useState } from 'react'
import { Menu, X, TrendingUp, Moon, Sun } from 'lucide-react'
import { useFinance } from '../../context/FinanceContext'

const TAB_LABELS = { dashboard: 'Dashboard', transactions: 'Transactions', insights: 'Insights' }

export default function Topbar({ onMenuToggle, menuOpen }) {
  const { activeTab, darkMode, toggleDarkMode } = useFinance()

  return (
    <header className="
      sticky top-0 z-20 h-16 flex items-center justify-between
      px-4 md:px-6 bg-white/80 dark:bg-ink-800/80 backdrop-blur-md
      border-b border-ink-100 dark:border-ink-700 lg:hidden
    ">
      <button
        onClick={onMenuToggle}
        className="p-2 rounded-xl hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors"
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
          <TrendingUp size={14} className="text-white" strokeWidth={2.5} />
        </div>
        <span className="font-display font-bold text-ink-800 dark:text-white">
          Fin<span className="text-emerald-500">Flow</span>
        </span>
      </div>

      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-xl hover:bg-ink-100 dark:hover:bg-ink-700 transition-colors"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  )
}
