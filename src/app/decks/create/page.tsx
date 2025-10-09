'use client'

import Link from 'next/link'

export default function DeckCreatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/decks" className="flex items-center text-gray-600 hover:text-gray-900">
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Decks
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Create New Deck</h1>
            <div className="w-20"></div> {/* Spacer for center alignment */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-6 py-8">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">新しいデッキを作成</h2>
            <p className="text-gray-600">
              あなただけの単語デッキを作成して、効率的に学習しましょう
            </p>
          </div>

          {/* TODO: DeckCreateForm コンポーネントをここに配置 */}
          <div className="space-y-6">
            <div className="py-12 text-center text-gray-500">
              <p>フォームコンポーネントを実装中...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
