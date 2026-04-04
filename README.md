# FinFlow — Personal Finance Dashboard

> A clean, modern, and fully responsive personal finance dashboard built with React 18, Tailwind CSS, and Recharts. Track income, expenses, insights, and more — all in one place.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2-22C55E?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Usage Guide](#-usage-guide)
- [Project Structure](#-project-structure)
- [Design System](#-design-system)
- [Configuration](#-configuration)
- [Available Scripts](#-available-scripts)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**FinFlow** is a frontend-only personal finance dashboard that helps you visualize and manage your money. It uses mock/static data (no backend required) and persists all changes to your browser's localStorage so your data survives page refreshes.

Built as a junior-to-mid level showcase project demonstrating:
- Clean component architecture
- Global state management with Context API + useReducer
- Role-based UI (Admin vs Viewer)
- Responsive design for mobile and desktop
- Data visualization with Recharts
- Dark mode with localStorage persistence

---

## ✨ Features

### 📊 Dashboard Overview
- Total Balance, Income, and Expenses summary cards with month-over-month % change
- 12-month balance trend line chart (balance / income / expenses)
- Top 6 spending categories donut chart with interactive legend
- Recent transactions list with quick "View all" link

### 💳 Transactions
- Full transaction list with date, description, category, type, and amount
- **Search** — filter by category or description in real time
- **Type Filter** — show All / Income / Expense only
- **Sort** — by date or amount, ascending or descending
- **Export** — download filtered data as CSV or JSON
- **Add / Edit / Delete** — full CRUD via modal forms (Admin role only)
- Form validation with inline error messages

### 🔐 Role-Based UI

| Feature | 👑 Admin | 👁 Viewer |
|---------|----------|---------|
| View all pages | ✅ | ✅ |
| Add transactions | ✅ | ❌ |
| Edit transactions | ✅ | ❌ |
| Delete transactions | ✅ | ❌ |
| Export data | ✅ | ✅ |

Switch roles instantly from the sidebar dropdown. Viewer mode shows a read-only warning banner.

### 💡 Insights
- Highest spending category with total amount
- Month-over-month expense and income % change
- Savings rate calculation with personalized advice
- Consecutive months of balance growth (saving streak)
- Per-category spending change analysis with progress bars
- Monthly income vs expenses bar chart (last 6 months)

### 🎨 UX & Polish
- 🌙 Dark mode toggle (preference saved to localStorage)
- 💾 Full localStorage persistence — nothing is lost on refresh
- 📱 Fully responsive — collapsible sidebar drawer on mobile
- ⌨️ Keyboard accessible — `Escape` closes any open modal
- ✅ Empty states — friendly messages when no data matches filters
- 🎬 Staggered entrance animations on every page load

---

## 🧩 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| [React](https://react.dev) | 18 | UI framework with functional components and hooks |
| [Vite](https://vitejs.dev) | 5 | Lightning-fast dev server and bundler |
| [Tailwind CSS](https://tailwindcss.com) | 3 | Utility-first CSS for styling |
| [Recharts](https://recharts.org) | 2 | Composable chart library (Line, Bar, Pie) |
| [Lucide React](https://lucide.dev) | 0.383 | Clean SVG icon library |
| Context API + useReducer | built-in | Global state management (no Redux needed) |

---

## ✅ Prerequisites

Before you begin, make sure you have the following installed:

| Tool | Minimum Version | How to Check |
|------|----------------|--------------|
| [Node.js](https://nodejs.org) | **18.x or higher** | `node --version` |
| npm | 9.x or higher | `npm --version` |

> **Don't have Node.js?**
> Download the **LTS** version from [nodejs.org](https://nodejs.org). npm is included automatically.

---

## 🚀 Installation

Follow these steps exactly to get the project running on your machine.

### Step 1 — Download & Extract the ZIP

After downloading `finance-dashboard.zip`:

- **Windows:** Right-click the zip → `Extract All` → `Extract`
- **Mac:** Double-click the zip file
- **Linux:** Run `unzip finance-dashboard.zip` in terminal

### Step 2 — Open a Terminal

- **Windows:** Press `Win + R` → type `cmd` → press `Enter`
- **Mac:** Press `Cmd + Space` → type `Terminal` → press `Enter`
- **Linux:** Press `Ctrl + Alt + T`

### Step 3 — Navigate Into the Project Folder

```bash
# Windows
cd Downloads\finance-dashboard

# Mac / Linux
cd ~/Downloads/finance-dashboard
```

### Step 4 — Install Dependencies

```bash
npm install
```

> This downloads all required packages. It may take 1–3 minutes. You only need to do this **once**.

### Step 5 — Start the Development Server

```bash
npm run dev
```

You will see output like this:

```
  VITE v5.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 6 — Open in Your Browser

Visit this URL:

```
http://localhost:5173
```

**🎉 FinFlow is now running on your machine!**

To stop the server at any time, press `Ctrl + C` in the terminal.

---

## 📖 Usage Guide

### Switching Roles
1. Look at the **bottom of the sidebar** (or open the menu on mobile)
2. Click the **Role** dropdown
3. Choose `👑 Admin` or `👁 Viewer`
4. The UI instantly updates — Viewer mode hides all edit controls

### Adding a Transaction (Admin only)
1. Go to the **Transactions** page
2. Click the **"Add Transaction"** button (top right)
3. Fill in: Type → Description → Category → Amount → Date
4. Click **"Add Transaction"** to save

### Editing or Deleting (Admin only)
- Hover over any transaction row — **Edit** (pencil) and **Delete** (trash) icons appear on the right

### Searching & Filtering
- Type in the **search bar** to instantly filter by description or category
- Use the **type dropdown** to show only income or only expenses
- Click **Date** or **Amount** sort buttons to reorder — click again to reverse direction
- Click **Clear** to reset all filters at once

### Exporting Data
1. Go to the **Transactions** page
2. Click the **"Export"** dropdown button
3. Choose **CSV** (best for Excel / Google Sheets) or **JSON** (best for developers)
4. The file downloads automatically

### Dark Mode
- Click the 🌙 **Moon** icon in the sidebar to switch to dark mode
- Click the ☀️ **Sun** icon to switch back to light mode
- Your preference is automatically saved and remembered

---

## 🗂 Project Structure

```
finance-dashboard/
│
├── index.html                         # HTML entry point
├── vite.config.js                     # Vite bundler configuration
├── tailwind.config.js                 # Tailwind theme, dark mode, custom tokens
├── postcss.config.js                  # PostCSS (required by Tailwind)
├── package.json                       # Project dependencies and scripts
├── README.md                          # This file
│
└── src/
    ├── main.jsx                       # App entry — ReactDOM.createRoot
    ├── App.jsx                        # Root layout: sidebar + topbar + page router
    ├── index.css                      # Global styles, Tailwind layers, shared classes
    │
    ├── context/
    │   └── FinanceContext.jsx         # Global state via useReducer
    │                                  # Manages: transactions, role, dark mode, filters
    │                                  # Auto-persists to localStorage
    │
    ├── data/
    │   └── transactions.js            # 53 mock transactions across 3 months
    │                                  # + 12-month chart data
    │                                  # + CATEGORIES list + CATEGORY_COLORS map
    │
    ├── hooks/
    │   └── useInsights.js             # Custom hook for derived analytics
    │                                  # (savings rate, streaks, category deltas)
    │
    ├── utils/
    │   └── format.js                  # Pure utility functions:
    │                                  # formatCurrency, formatDate, exportCSV, exportJSON
    │
    ├── pages/
    │   ├── DashboardPage.jsx          # Stat cards + charts + recent transactions
    │   ├── TransactionsPage.jsx       # Full list + filters + modals + export
    │   └── InsightsPage.jsx           # Insight cards + category analysis + charts
    │
    └── components/
        ├── layout/
        │   ├── Sidebar.jsx            # Fixed desktop sidebar: nav links, role picker, dark toggle
        │   └── Topbar.jsx             # Mobile sticky header with hamburger + dark toggle
        │
        ├── charts/
        │   ├── BalanceTrendChart.jsx        # LineChart — 12-month balance/income/expense
        │   ├── CategoryChart.jsx            # PieChart donut — top spending categories
        │   └── MonthlyComparisonChart.jsx   # BarChart — income vs expenses last 6 months
        │
        ├── transactions/
        │   ├── TransactionRow.jsx           # Single row: category dot, info, amount, actions
        │   ├── TransactionFilters.jsx       # Search + type dropdown + sort buttons + clear
        │   └── TransactionForm.jsx          # Add/Edit modal form with full validation
        │
        ├── insights/
        │   └── InsightCard.jsx             # Colored card: icon + title + value + sub-text
        │
        └── ui/
            ├── StatCard.jsx                # Summary metric card (Balance/Income/Expense)
            ├── Modal.jsx                   # Accessible dialog (Escape key, backdrop click)
            └── EmptyState.jsx              # Empty/no-results placeholder UI
```

---

## 🎨 Design System

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Emerald | `#10b981` | Income, positive values, primary buttons |
| Rose | `#f43f5e` | Expenses, negative values, delete actions |
| Violet | `#8b5cf6` | Balance, neutral accent, trend line |
| Amber | `#f59e0b` | Warnings, investment highlights |
| Ink 50–900 | gray scale | Text, backgrounds, borders, dividers |

### Typography

| Font | Role | Character |
|------|------|-----------|
| [Syne](https://fonts.google.com/specimen/Syne) | Headings & logo | Bold geometric display font |
| [DM Sans](https://fonts.google.com/specimen/DM+Sans) | Body & UI text | Clean, highly readable sans-serif |
| [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) | Amounts & numbers | Monospaced for perfect alignment |

### Component Conventions

```
Cards:    rounded-2xl + subtle shadow + 1px border
Buttons:  rounded-xl + hover bg change + active:scale-95
Inputs:   rounded-xl + focus:ring-2 (emerald) + transition
Badges:   rounded-full + color-coded (income=green, expense=red)
```

---

## ⚙️ Configuration

### Editing Mock Transactions

Open `src/data/transactions.js` and modify `INITIAL_TRANSACTIONS`:

```js
{
  id: '99',                    // unique string ID
  date: '2024-09-15',          // YYYY-MM-DD format
  description: 'Grocery Run',  // display name
  category: 'Food & Dining',   // must exist in CATEGORIES array
  type: 'expense',             // 'income' or 'expense'
  amount: 85,                  // always a positive number
}
```

### Adding a New Category

```js
// Step 1: Add to the CATEGORIES array
export const CATEGORIES = [
  ...existingCategories,
  'Subscriptions',   // ← add here
]

// Step 2: Add a color to CATEGORY_COLORS
export const CATEGORY_COLORS = {
  ...existingColors,
  'Subscriptions': '#0ea5e9',  // ← any hex color
}
```

### Adding a New Page

```js
// 1. Create the page file
// src/pages/BudgetPage.jsx

// 2. Register in Sidebar.jsx
import { Target } from 'lucide-react'
const NAV_ITEMS = [
  ...existing,
  { id: 'budget', label: 'Budget', icon: Target },
]

// 3. Register in App.jsx
import BudgetPage from './pages/BudgetPage'
const pages = {
  ...existing,
  budget: <BudgetPage />,
}
```

### Clearing All Saved Data

Open browser DevTools (`F12`) → **Application** tab → **Local Storage** → find `finflow_state` → click **Delete** → refresh the page.

---

## 📜 Available Scripts

Run all commands from inside the `finance-dashboard/` folder:

| Command | What it does |
|---------|-------------|
| `npm run dev` | Starts the dev server at `http://localhost:5173` with hot reload |
| `npm run build` | Builds optimized production files into the `dist/` folder |
| `npm run preview` | Locally previews the production build before deploying |

---

## 🔧 Troubleshooting

### `npm` or `node` is not recognized
**Cause:** Node.js is not installed.
**Fix:** Download and install from [nodejs.org](https://nodejs.org) (choose LTS). Restart your terminal after installing.

---

### `npm install` fails with permission errors (Mac/Linux)
**Fix:**
```bash
sudo npm install
```

---

### Port 5173 is already in use
**Cause:** Another app is using that port.
**Fix:** Vite will automatically try 5174, 5175, etc. Check your terminal for the actual URL.

---

### Blank white screen in browser
**Fix:**
1. Check the terminal for red error messages
2. Open DevTools in browser (`F12`) → **Console** tab — look for errors
3. Stop server (`Ctrl + C`) and run `npm run dev` again

---

### Module not found / `node_modules` errors
**Fix:** Delete and reinstall dependencies:
```bash
# Mac / Linux
rm -rf node_modules
npm install

# Windows (Command Prompt)
rmdir /s /q node_modules
npm install
```

---

### Changes not reflecting in browser
**Cause:** Browser cache or HMR issue.
**Fix:** Hard refresh — `Ctrl + Shift + R` on Windows/Linux, `Cmd + Shift + R` on Mac.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

**Workflow:**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit with a clear message: `git commit -m "feat: add budget tracking page"`
5. Push the branch: `git push origin feature/your-feature-name`
6. Open a Pull Request with a description of what you changed and why

**Code style rules:**
- Functional components with hooks only — no class components
- Keep components small and single-purpose
- Logic in hooks/utils, not inside JSX return
- `PascalCase` for component names and files
- Tailwind classes only — avoid inline `style={{}}` props
- Comment complex logic; skip obvious comments

---

## 📄 License

This project is licensed under the **MIT License**.

You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of this software for personal or commercial purposes.

---

## 🙏 Acknowledgements

- [Recharts](https://recharts.org) — Composable, declarative chart components for React
- [Lucide Icons](https://lucide.dev) — Beautifully consistent open-source icons
- [Tailwind CSS](https://tailwindcss.com) — A utility-first CSS framework
- [Google Fonts](https://fonts.google.com) — Syne, DM Sans, JetBrains Mono

---

<div align="center">

**Built with ❤️ using React + Vite + Tailwind CSS**

Divyanshu Gupta © 2024 

</div>
