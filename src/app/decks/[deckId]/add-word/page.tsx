'use client'

import Link from 'next/link'
import { use } from 'react'

import { WORD_DECKS } from '@/constants/wordDecks'
import { WordAddForm } from '@/features/decks'

type AddWordPageProps = {
  params: Promise<{ deckId: string }>
}

export default function AddWordPage({ params }: AddWordPageProps) {
  const { deckId } = use(params)

  // プリセットデッキかどうかを判定
  const isPresetDeck = WORD_DECKS.some(presetDeck => presetDeck.id === deckId)

  if (isPresetDeck) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="mx-auto max-w-2xl px-6 py-8">
          <div className="rounded-lg bg-white p-6 text-center shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">アクセスエラー</h2>
            <p className="mb-6 text-gray-600">
              プリセットデッキには単語を追加できません。
              <br />
              カスタムデッキを作成して単語を追加してください。
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/decks"
                className="inline-flex items-center gap-2 rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
              >
                デッキ一覧に戻る
              </Link>
              <Link
                href="/decks/create"
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                新しいデッキを作成
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

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
