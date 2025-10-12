'use server'

import { redirect } from 'next/navigation'

import { deckStorage } from '@/utils/deckStorage'

import type { WordDeck } from '@/types/deck'

export type CreateDeckResult = {
  success: boolean
  error?: string
  deck?: WordDeck
}

export async function createDeck(formData: FormData): Promise<CreateDeckResult> {
  const name = formData.get('name') as string
  const description = formData.get('description') as string

  // バリデーション
  if (!name?.trim()) {
    return {
      success: false,
      error: 'デッキ名は必須です',
    }
  }

  if (name.length > 50) {
    return {
      success: false,
      error: 'デッキ名は50文字以内で入力してください',
    }
  }

  try {
    // ローカルストレージにデッキを保存
    const newDeck = deckStorage.createDeck(name, description || '')

    console.log('Creating deck:', newDeck)

    // 成功時にリダイレクト
    redirect('/decks')
  } catch (error) {
    console.error('Error creating deck:', error)
    return {
      success: false,
      error: 'デッキの作成に失敗しました',
    }
  }
}

export async function redirectToDecks() {
  redirect('/decks')
}
