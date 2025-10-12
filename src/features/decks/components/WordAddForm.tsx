'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { deckStorage } from '@/utils/deckStorage'

import { Button } from '@/components/ui/Button'

import type { DeckCard } from '@/types/deck'

type WordFormData = Omit<DeckCard, 'id'>

type ValidationErrors = {
  japanese?: string
  english?: string
}

type WordAddFormProps = {
  deckId: string
}

export function WordAddForm({ deckId }: WordAddFormProps) {
  const router = useRouter()

  const [formData, setFormData] = useState<WordFormData>({
    japanese: '',
    english: '',
  })

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {}

    if (!formData.japanese.trim()) {
      newErrors.japanese = '日本語は必須です'
    }

    if (!formData.english.trim()) {
      newErrors.english = '英語は必須です'
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    try {
      // クライアントサイドで直接deckStorageを使用
      const newCard = deckStorage.addCardToDeck(deckId, formData.japanese, formData.english)

      if (newCard) {
        // 成功時の処理
        alert('単語が追加されました！')

        // フォームをリセットして次の単語を追加できるようにする
        setFormData({
          japanese: '',
          english: '',
        })

        // ページを再読み込みして更新された情報を反映
        window.location.reload()
      } else {
        alert('デッキが見つかりません')
      }
    } catch (error) {
      console.error('Error adding word:', error)
      alert('単語の追加に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 単語入力 */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">単語情報</h3>

        <div>
          <label htmlFor="japanese" className="mb-2 block text-sm font-medium text-gray-700">
            日本語 *
          </label>
          <input
            type="text"
            id="japanese"
            required
            value={formData.japanese}
            onChange={e => {
              setFormData(prev => ({ ...prev, japanese: e.target.value }))
              if (errors.japanese) {
                setErrors(prev => ({ ...prev, japanese: undefined }))
              }
            }}
            className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:outline-none ${
              errors.japanese
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
            placeholder="例: こんにちは"
          />
          {errors.japanese && <p className="mt-1 text-sm text-red-600">{errors.japanese}</p>}
        </div>

        <div>
          <label htmlFor="english" className="mb-2 block text-sm font-medium text-gray-700">
            英語 *
          </label>
          <input
            type="text"
            id="english"
            required
            value={formData.english}
            onChange={e => {
              setFormData(prev => ({ ...prev, english: e.target.value }))
              if (errors.english) {
                setErrors(prev => ({ ...prev, english: undefined }))
              }
            }}
            className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:outline-none ${
              errors.english
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
            placeholder="例: hello"
          />
          {errors.english && <p className="mt-1 text-sm text-red-600">{errors.english}</p>}
        </div>
      </div>

      {/* 送信ボタン */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={() => router.push('/decks')}>
          完了
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '追加中...' : '単語を追加'}
        </Button>
      </div>
    </form>
  )
}
