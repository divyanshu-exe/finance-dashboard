import React, { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'

const ToastContext = createContext(null)

const ICONS = {
  success: <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />,
  error:   <XCircle size={16} className="text-rose-500 flex-shrink-0" />,
  warning: <AlertCircle size={16} className="text-amber-500 flex-shrink-0" />,
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])

  const remove = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl
                       bg-white dark:bg-ink-800 shadow-xl border border-ink-100 dark:border-ink-700
                       animate-slide-up min-w-[240px] max-w-xs"
          >
            {ICONS[t.type]}
            <span className="text-sm font-medium text-ink-700 dark:text-ink-200 flex-1">{t.message}</span>
            <button
              onClick={() => remove(t.id)}
              className="text-ink-300 hover:text-ink-500 dark:hover:text-ink-300 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx.toast
}
