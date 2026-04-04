import React from 'react'

export default function InsightCard({ icon, title, value, sub, accent = 'emerald', delay = '' }) {
  const accents = {
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900/40',
    rose:    'bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-900/40',
    violet:  'bg-violet-50 dark:bg-violet-900/20 border-violet-100 dark:border-violet-900/40',
    amber:   'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/40',
    ink:     'bg-ink-50 dark:bg-ink-700/30 border-ink-100 dark:border-ink-700',
  }

  const iconAccents = {
    emerald: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
    rose:    'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400',
    violet:  'bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400',
    amber:   'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400',
    ink:     'bg-ink-200 dark:bg-ink-600 text-ink-600 dark:text-ink-300',
  }

  return (
    <div className={`animate-in ${delay} rounded-2xl border p-5 ${accents[accent]}`}>
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base ${iconAccents[accent]}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-ink-500 dark:text-ink-400 uppercase tracking-wider mb-0.5">{title}</p>
          <p className="font-display font-bold text-ink-800 dark:text-white leading-snug">{value}</p>
          {sub && <p className="text-xs text-ink-500 dark:text-ink-400 mt-1">{sub}</p>}
        </div>
      </div>
    </div>
  )
}
