import React, { useState } from 'react'
import { CATEGORIES } from '../../data/transactions'
import { getTodayStr } from '../../utils/format'
import { useFinance } from '../../context/FinanceContext'

const emptyForm = {
  date: getTodayStr(),
  description: '',
  category: CATEGORIES[0],
  type: 'expense',
  amount: '',
}

export default function TransactionForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || emptyForm)
  const [errors, setErrors] = useState({})

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: null }))
  }

  function validate() {
    const errs = {}
    if (!form.description.trim())         errs.description = 'Description is required'
    if (!form.amount || Number(form.amount) <= 0) errs.amount = 'Enter a valid amount'
    if (!form.date)                        errs.date = 'Date is required'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSubmit({ ...form, amount: parseFloat(form.amount) })
  }

  const fieldCls = (err) => `input ${err ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''}`

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Type toggle */}
      <div>
        <label className="label">Type</label>
        <div className="flex rounded-xl border border-ink-200 dark:border-ink-600 overflow-hidden">
          {['expense', 'income'].map(t => (
            <button
              key={t}
              type="button"
              onClick={() => set('type', t)}
              className={`
                flex-1 py-2.5 text-sm font-medium transition-colors capitalize
                ${form.type === t
                  ? t === 'income'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-rose-500 text-white'
                  : 'bg-white dark:bg-ink-700 text-ink-500 dark:text-ink-400 hover:bg-ink-50 dark:hover:bg-ink-600'
                }
              `}
            >
              {t === 'income' ? '↑ Income' : '↓ Expense'}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="label">Description</label>
        <input
          type="text"
          value={form.description}
          onChange={e => set('description', e.target.value)}
          placeholder="e.g. Grocery Store"
          className={fieldCls(errors.description)}
        />
        {errors.description && <p className="mt-1 text-xs text-rose-500">{errors.description}</p>}
      </div>

      {/* Category */}
      <div>
        <label className="label">Category</label>
        <select
          value={form.category}
          onChange={e => set('category', e.target.value)}
          className="select"
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Amount */}
      <div>
        <label className="label">Amount ($)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={form.amount}
          onChange={e => set('amount', e.target.value)}
          placeholder="0.00"
          className={`${fieldCls(errors.amount)} font-mono`}
        />
        {errors.amount && <p className="mt-1 text-xs text-rose-500">{errors.amount}</p>}
      </div>

      {/* Date */}
      <div>
        <label className="label">Date</label>
        <input
          type="date"
          value={form.date}
          onChange={e => set('date', e.target.value)}
          className={fieldCls(errors.date)}
        />
        {errors.date && <p className="mt-1 text-xs text-rose-500">{errors.date}</p>}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1 justify-center">
          Cancel
        </button>
        <button type="submit" className="btn-primary flex-1 justify-center">
          {initial ? 'Save Changes' : 'Add Transaction'}
        </button>
      </div>
    </form>
  )
}
