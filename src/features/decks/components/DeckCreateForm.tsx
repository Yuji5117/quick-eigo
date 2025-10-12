'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'

import type { WordDeck } from '@/types/deck'

type DeckFormData = Omit<WordDeck, 'id' | 'cardCount'>

type ValidationErrors = {
  name?: string
}

export function DeckCreateForm() {
  const router = useRouter()

  const [formData, setFormData] = useState<DeckFormData>({
    name: '',
    description: '',
    cards: [],
  })

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'デッキ名は必須です'
    } else if (formData.name.length > 50) {
      newErrors.name = 'デッキ名は50文字以内で入力してください'
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
      // TODO: 実際の保存処理を実装
      const newDeck: WordDeck = {
        ...formData,
        id: Date.now().toString(),
        cardCount: 0,
      }
      console.log('Creating deck:', newDeck)

      // 成功時の処理（一覧ページへリダイレクトなど）
      alert('デッキが作成されました！後で単語を追加できます。')
      router.push('/decks')
    } catch (error) {
      console.error('Error creating deck:', error)
      alert('デッキの作成に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* デッキ基本情報 */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">デッキ基本情報</h3>

        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
            デッキ名 *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={e => {
              setFormData(prev => ({ ...prev, name: e.target.value }))
              if (errors.name) {
                setErrors(prev => ({ ...prev, name: undefined }))
              }
            }}
            className={`w-full rounded-lg border px-3 py-2 focus:ring-2 focus:outline-none ${
              errors.name
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
            placeholder="例: TOEIC基礎単語"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
            説明
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="このデッキの内容や目的を説明してください"
          />
        </div>
      </div>

      {/* 送信ボタン */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={() => router.push('/decks')}>
          キャンセル
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '作成中...' : 'デッキを作成'}
        </Button>
      </div>
    </form>
  )
}
