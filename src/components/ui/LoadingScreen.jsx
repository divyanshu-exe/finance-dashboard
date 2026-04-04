import React from 'react'

function SkeletonBox({ className = '', style = {} }) {
  return (
    <div className={`animate-pulse bg-ink-100 dark:bg-ink-700 rounded-xl ${className}`} style={style} />
  )
}

export function SkeletonStatCard() {
  return (
    <div className="card space-y-4">
      <div className="flex items-start justify-between">
        <SkeletonBox className="w-10 h-10 rounded-xl" />
        <SkeletonBox className="w-14 h-5 rounded-full" />
      </div>
      <div className="space-y-2">
        <SkeletonBox className="w-24 h-3" />
        <SkeletonBox className="w-36 h-7" />
      </div>
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 border-b border-ink-100/80 dark:border-ink-700/60 last:border-0">
      <SkeletonBox className="w-9 h-9 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonBox className="w-40 h-3" />
        <SkeletonBox className="w-24 h-2.5" />
      </div>
      <SkeletonBox className="w-16 h-4" />
    </div>
  )
}

export function SkeletonChart() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-5">
        <div className="space-y-2">
          <SkeletonBox className="w-32 h-4" />
          <SkeletonBox className="w-24 h-3" />
        </div>
        <SkeletonBox className="w-20 h-6 rounded-lg" />
      </div>
      <div className="flex items-end gap-2 h-48 pt-4">
        {[60,80,50,90,70,85,55,75,65,88,72,95].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end">
            <SkeletonBox className="w-full rounded-t-md" style={{ height: `${h}%` }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LoadingScreen() {
  return (
    <div className="lg:pl-64 min-h-screen bg-ink-50 dark:bg-ink-900 p-4 md:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="space-y-2">
          <SkeletonBox className="w-40 h-7" />
          <SkeletonBox className="w-56 h-4" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SkeletonStatCard /><SkeletonStatCard /><SkeletonStatCard />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3"><SkeletonChart /></div>
          <div className="lg:col-span-2"><SkeletonChart /></div>
        </div>
        <div className="card p-0">
          {[...Array(5)].map((_, i) => <SkeletonRow key={i} />)}
        </div>
      </div>
    </div>
  )
}
