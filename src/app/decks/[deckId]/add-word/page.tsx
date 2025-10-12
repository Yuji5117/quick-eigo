'use client'

import { use } from 'react'

import { WordAddForm } from '@/features/decks'

type AddWordPageProps = {
  params: Promise<{ deckId: string }>
}

export default function AddWordPage({ params }: AddWordPageProps) {
  const { deckId } = use(params)

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-2xl px-6 py-8">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">単語を追加</h2>
          </div>

          <WordAddForm deckId={deckId} />
        </div>
      </main>
    </div>
  )
}
