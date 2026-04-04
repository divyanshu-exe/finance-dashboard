import React, { useState } from 'react'
import { Plus, Download, ChevronDown } from 'lucide-react'
import { useFinance } from '../context/FinanceContext'
import { useToast } from '../context/ToastContext'
import TransactionFilters from '../components/transactions/TransactionFilters'
import TransactionRow from '../components/transactions/TransactionRow'
import TransactionForm from '../components/transactions/TransactionForm'
import Modal from '../components/ui/Modal'
import EmptyState from '../components/ui/EmptyState'
import { exportCSV, exportJSON } from '../utils/format'

export default function TransactionsPage() {
  const { filteredTransactions, role, addTransaction, updateTransaction, deleteTransaction } = useFinance()
  const toast = useToast()

  const isAdmin = role === 'admin'
  const [showAdd, setShowAdd]       = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [exportOpen, setExportOpen] = useState(false)
  const [saving, setSaving]         = useState(false)

  async function handleAdd(data) {
    setSaving(true)
    try {
      await addTransaction(data)
      setShowAdd(false)
      toast('Transaction added successfully!', 'success')
    } catch {
      toast('Failed to add transaction', 'error')
    } finally { setSaving(false) }
  }

  async function handleEdit(data) {
    setSaving(true)
    try {
      await updateTransaction({ ...editTarget, ...data })
      setEditTarget(null)
      toast('Transaction updated!', 'success')
    } catch {
      toast('Failed to update transaction', 'error')
    } finally { setSaving(false) }
  }

  async function confirmDelete() {
    try {
      await deleteTransaction(deleteTarget)
      setDeleteTarget(null)
      toast('Transaction deleted', 'warning')
    } catch {
      toast('Failed to delete transaction', 'error')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in relative z-10">
        <div>
          <h1 className="font-display font-bold text-2xl text-ink-800 dark:text-white">Transactions</h1>
          <p className="text-sm text-ink-400 dark:text-ink-500 mt-0.5">
            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Export dropdown */}
          <div className="relative">
            <button onClick={() => setExportOpen(o => !o)} className="btn-secondary">
              <Download size={15} /> Export <ChevronDown size={13} />
            </button>
            {exportOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setExportOpen(false)} />
                <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-ink-800 border border-ink-100 dark:border-ink-700 rounded-xl shadow-xl z-50 overflow-hidden">
                  <button
                    onClick={() => { exportCSV(filteredTransactions); setExportOpen(false); toast('Exported as CSV!', 'success') }}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-ink-50 dark:hover:bg-ink-700 text-ink-700 dark:text-ink-200 transition-colors"
                  >📄 Export CSV</button>
                  <button
                    onClick={() => { exportJSON(filteredTransactions); setExportOpen(false); toast('Exported as JSON!', 'success') }}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-ink-50 dark:hover:bg-ink-700 text-ink-700 dark:text-ink-200 transition-colors"
                  >📦 Export JSON</button>
                </div>
              </>
            )}
          </div>

          {isAdmin && (
            <button onClick={() => setShowAdd(true)} className="btn-primary">
              <Plus size={16} /> Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Role notice */}
      {!isAdmin && (
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-sm animate-in">
          <span>⚠️</span>
          <span>You're in <strong>Viewer</strong> mode. Switch to Admin to manage transactions.</span>
        </div>
      )}

      {/* Filters */}
      <div className="animate-in stagger-1">
        <TransactionFilters />
      </div>

      {/* List */}
      <div className="card p-0 animate-in stagger-2">
        {filteredTransactions.length === 0 ? (
          <EmptyState title="No transactions found" description="Try adjusting your filters or search query." />
        ) : (
          filteredTransactions.map(tx => (
            <TransactionRow key={tx.id} transaction={tx} isAdmin={isAdmin} onEdit={setEditTarget} onDelete={setDeleteTarget} />
          ))
        )}
      </div>

      {/* Add Modal */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add Transaction">
        <TransactionForm onSubmit={handleAdd} onCancel={() => setShowAdd(false)} saving={saving} />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Transaction">
        {editTarget && (
          <TransactionForm initial={editTarget} onSubmit={handleEdit} onCancel={() => setEditTarget(null)} saving={saving} />
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Transaction">
        <p className="text-sm text-ink-600 dark:text-ink-300 mb-6">
          Are you sure you want to delete this transaction? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={() => setDeleteTarget(null)} className="btn-secondary flex-1 justify-center">Cancel</button>
          <button onClick={confirmDelete} className="flex-1 justify-center inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 text-white font-medium text-sm hover:bg-rose-600 active:scale-95 transition-all">
            Delete
          </button>
        </div>
      </Modal>
    </div>
  )
}
