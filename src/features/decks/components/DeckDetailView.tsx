'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { deckStorage } from '@/utils/deckStorage'

import { Button } from '@/components/ui/Button'

import type { DeckCard, WordDeck } from '@/types/deck'

type DeckDetailViewProps = {
  deckId: string
}

export function DeckDetailView({ deckId }: DeckDetailViewProps) {
  const [deck, setDeck] = useState<WordDeck | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [editingCard, setEditingCard] = useState<DeckCard | null>(null)
  const [editFormData, setEditFormData] = useState<{ japanese: string; english: string }>({
    japanese: '',
    english: '',
  })

  useEffect(() => {
    const loadedDeck = deckStorage.getDeck(deckId)
    setDeck(loadedDeck)
  }, [deckId])

  if (!deck) {
    return (
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">デッキが見つかりません</h1>
        <Link href="/decks" className="text-blue-600 hover:text-blue-800">
          デッキ一覧に戻る
        </Link>
      </div>
    )
  }

  const filteredCards = deck.cards.filter(
    card =>
      card.japanese.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.english.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteCard = (cardId: string) => {
    if (confirm('この単語を削除しますか？')) {
      const success = deckStorage.removeCardFromDeck(deckId, cardId)
      if (success) {
        const updatedDeck = deckStorage.getDeck(deckId)
        setDeck(updatedDeck)
      }
    }
  }

  const handleEditCard = (card: DeckCard) => {
    setEditingCard(card)
    setEditFormData({
      japanese: card.japanese,
      english: card.english,
    })
  }

  const handleSaveEdit = () => {
    if (!editingCard) return

    const success = deckStorage.updateCard(deckId, editingCard.id, {
      japanese: editFormData.japanese.trim(),
      english: editFormData.english.trim(),
    })

    if (success) {
      const updatedDeck = deckStorage.getDeck(deckId)
      setDeck(updatedDeck)
      setEditingCard(null)
      setEditFormData({ japanese: '', english: '' })
    }
  }

  const handleCancelEdit = () => {
    setEditingCard(null)
    setEditFormData({ japanese: '', english: '' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <nav className="mb-2 flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/decks" className="hover:text-gray-700">
              デッキ
            </Link>
            <span>/</span>
            <span className="text-gray-900">{deck.name}</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">{deck.name}</h1>
          {deck.description && <p className="mt-2 text-gray-600">{deck.description}</p>}
          <p className="mt-1 text-sm text-gray-500">{deck.cardCount}個の単語</p>
        </div>
        <div className="flex space-x-3">
          <Link
            href={`/decks/${deckId}/add-word`}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            単語を追加
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="単語を検索..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white py-3 pr-4 pl-10 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Words List */}
      <div className="rounded-lg bg-white shadow-sm">
        {filteredCards.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">
              {searchQuery
                ? '検索条件に一致する単語が見つかりません'
                : 'まだ単語が登録されていません'}
            </p>
            {!searchQuery && (
              <Link
                href={`/decks/${deckId}/add-word`}
                className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                最初の単語を追加する
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredCards.map(card => (
              <div key={card.id} className="p-6">
                {editingCard?.id === card.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          日本語
                        </label>
                        <input
                          type="text"
                          value={editFormData.japanese}
                          onChange={e =>
                            setEditFormData(prev => ({ ...prev, japanese: e.target.value }))
                          }
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">英語</label>
                        <input
                          type="text"
                          value={editFormData.english}
                          onChange={e =>
                            setEditFormData(prev => ({ ...prev, english: e.target.value }))
                          }
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSaveEdit}
                        disabled={!editFormData.japanese.trim() || !editFormData.english.trim()}
                      >
                        保存
                      </Button>
                      <Button onClick={handleCancelEdit} variant="secondary">
                        キャンセル
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <div className="text-lg font-medium text-gray-900">{card.japanese}</div>
                        </div>
                        <div>
                          <div className="text-lg text-gray-600">{card.english}</div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex gap-2">
                      <button
                        onClick={() => handleEditCard(card)}
                        className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        編集
                      </button>
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="flex items-center gap-1 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 hover:bg-red-100"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        削除
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
