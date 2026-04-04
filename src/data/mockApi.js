import { INITIAL_TRANSACTIONS } from './transactions'

// ─── Simulated network delay ──────────────────────────────────────────────────
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// ─── Mock API ─────────────────────────────────────────────────────────────────

export const mockApi = {
  /**
   * Simulates fetching all transactions from a backend.
   * Returns after a realistic 800ms delay.
   */
  fetchTransactions: async () => {
    await delay(800)
    // Simulate occasional slow network (1 in 5 chance of 1.5s delay)
    if (Math.random() < 0.2) await delay(700)
    return [...INITIAL_TRANSACTIONS]
  },

  /**
   * Simulates adding a transaction via POST request.
   */
  createTransaction: async (transaction) => {
    await delay(400)
    return { ...transaction, id: Date.now().toString() }
  },

  /**
   * Simulates updating a transaction via PUT request.
   */
  updateTransaction: async (transaction) => {
    await delay(400)
    return transaction
  },

  /**
   * Simulates deleting a transaction via DELETE request.
   */
  deleteTransaction: async (id) => {
    await delay(300)
    return { success: true, id }
  },
}
