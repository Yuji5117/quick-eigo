'use client'

import { use } from 'react'

import { DeckDetailView } from '@/features/decks'

type DeckDetailPageProps = {
  params: Promise<{ deckId: string }>
}

export default function DeckDetailPage({ params }: DeckDetailPageProps) {
  const { deckId } = use(params)

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-4xl px-6 py-8">
        <DeckDetailView deckId={deckId} />
      </main>
    </div>
  )
}
