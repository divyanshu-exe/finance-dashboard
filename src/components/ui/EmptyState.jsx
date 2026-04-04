import React from 'react'
import { SearchX, PlusCircle } from 'lucide-react'

export default function EmptyState({ title = 'Nothing here', description = 'No data to display.', action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-ink-100 dark:bg-ink-700 flex items-center justify-center mb-4">
        <SearchX size={24} className="text-ink-400 dark:text-ink-500" />
      </div>
      <h3 className="font-display font-semibold text-ink-700 dark:text-ink-200 mb-1">{title}</h3>
      <p className="text-sm text-ink-400 dark:text-ink-500 max-w-xs">{description}</p>
      {action && (
        <button onClick={action.onClick} className="btn-primary mt-5">
          <PlusCircle size={15} />
          {action.label}
        </button>
      )}
    </div>
  )
}
