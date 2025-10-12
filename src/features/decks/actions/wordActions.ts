'use server'

import { redirect } from 'next/navigation'

import { deckStorage } from '@/utils/deckStorage'

import type { DeckCard } from '@/types/deck'

export type AddWordResult = {
  success: boolean
  error?: string
  card?: DeckCard
}

export async function addWordToDeck(deckId: string, formData: FormData): Promise<AddWordResult> {
  const japanese = formData.get('japanese') as string
  const english = formData.get('english') as string

  // バリデーション
  if (!japanese?.trim()) {
    return {
      success: false,
      error: '日本語は必須です',
    }
  }

  if (!english?.trim()) {
    return {
      success: false,
      error: '英語は必須です',
    }
  }

  try {
    // ローカルストレージのデッキに単語を追加
    const newCard = deckStorage.addCardToDeck(deckId, japanese, english)

    if (!newCard) {
      return {
        success: false,
        error: 'デッキが見つかりません',
      }
    }

    console.log('Adding word to deck:', deckId, newCard)

    // 成功時の戻り値
    return {
      success: true,
      card: newCard,
    }
  } catch (error) {
    console.error('Error adding word to deck:', error)
    return {
      success: false,
      error: '単語の追加に失敗しました',
    }
  }
}

export async function redirectToDecks() {
  redirect('/decks')
}
