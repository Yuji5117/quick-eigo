'use client'

import { DeckCreateForm } from '@/components/forms/DeckCreateForm'

export default function DeckCreatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-2xl px-6 py-8">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">新しいデッキを作成</h2>
          </div>

          <DeckCreateForm />
        </div>
      </main>
    </div>
  )
}
