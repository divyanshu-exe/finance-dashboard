import React, { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ isOpen, onClose, title, children }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink-900/40 dark:bg-ink-900/60 backdrop-blur-sm animate-fade-in" />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-ink-800 rounded-2xl shadow-2xl animate-scale-in border border-ink-100 dark:border-ink-700">
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100 dark:border-ink-700">
          <h2 className="font-display font-semibold text-ink-800 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-700 text-ink-400 hover:text-ink-600 dark:hover:text-ink-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
