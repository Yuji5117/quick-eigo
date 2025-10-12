'use client'

import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'

import { LEVELS, TOPICS } from '@/constants/exerciseOptions'
import { WORD_DECKS } from '@/constants/wordDecks'
import { deckStorage } from '@/utils/deckStorage'

import { Button } from '@/components/ui'

import { generateQuestionAction, type GenerateQuestionState } from '../actions/generateQuestion'

import type { WordDeck } from '@/types/deck'

export function QuestionSetupForm() {
  const router = useRouter()
  const [selectedTopic, setSelectedTopic] = useState<string>(TOPICS[0].value)
  const [selectedLevel, setSelectedLevel] = useState<string>(LEVELS[1].value)
  const [selectedDeck, setSelectedDeck] = useState<string>(WORD_DECKS[0].id)
  const [grammarUnit, setGrammarUnit] = useState('')
  const [questionCount, setQuestionCount] = useState(5)
  const [allDecks, setAllDecks] = useState<WordDeck[]>(WORD_DECKS)

  const initialState: GenerateQuestionState = {}
  const [state, formAction, isPending] = useActionState(generateQuestionAction, initialState)

  // ユーザーデッキとプリセットデッキを統合
  useEffect(() => {
    const userDecks = deckStorage.getAllDecks()
    const combinedDecks = [...WORD_DECKS, ...userDecks]
    setAllDecks(combinedDecks)
  }, [])

  useEffect(() => {
    if (state.success && state.questions) {
      sessionStorage.setItem('practiceQuestions', JSON.stringify(state.questions))

      router.push('/practice/play')
    }
  }, [state, router])

  // 選択されたデッキの情報を取得
  const selectedDeckData = allDecks.find(deck => deck.id === selectedDeck)
  const isUserDeck =
    selectedDeckData && !WORD_DECKS.some(presetDeck => presetDeck.id === selectedDeck)

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">問題作成設定</h1>
        <p className="text-gray-600">お好みの設定で英作文問題を生成します</p>
      </div>

      <form action={formAction} className="space-y-8">
        <input type="hidden" name="topic" value={selectedTopic} />
        <input type="hidden" name="level" value={selectedLevel} />
        <input type="hidden" name="selectedDeck" value={selectedDeck} />
        <input type="hidden" name="grammarUnit" value={grammarUnit} />
        <input type="hidden" name="questionCount" value={questionCount} />

        {/* ユーザーデッキの場合、単語リストを送信 */}
        {isUserDeck && selectedDeckData && (
          <>
            <input
              type="hidden"
              name="deckWords"
              value={JSON.stringify(selectedDeckData.cards.map(card => card.japanese).slice(0, 10))}
            />
            <input type="hidden" name="deckName" value={selectedDeckData.name} />
          </>
        )}

        <div>
          <h2 className="mb-4 text-xl font-semibold">トピック</h2>
          <div className="grid grid-cols-2 gap-4">
            {TOPICS.map(topic => (
              <button
                key={topic.id}
                type="button"
                onClick={() => setSelectedTopic(topic.value)}
                className={`rounded-lg border-2 p-4 transition-all ${
                  selectedTopic === topic.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="mb-2 text-2xl">{topic.emoji}</div>
                <div className="font-medium">{topic.name}</div>
                <div className="text-sm text-gray-600">{topic.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">レベル</h2>
          <div className="flex gap-6">
            {LEVELS.map(level => (
              <label key={level.id} className="flex cursor-pointer items-center">
                <input
                  type="radio"
                  name="level"
                  value={level.value}
                  checked={selectedLevel === level.value}
                  onChange={() => setSelectedLevel(level.value)}
                  className="mr-3 h-4 w-4 text-blue-600"
                />
                <div className="flex items-center">
                  <span className="mr-2 text-xl">{level.emoji}</span>
                  <div>
                    <div className="font-medium">{level.name}</div>
                    <div className="text-sm text-gray-600">{level.description}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">単語デッキ</h2>
          <select
            value={selectedDeck}
            onChange={e => setSelectedDeck(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {allDecks.map(deck => (
              <option key={deck.id} value={deck.id}>
                {deck.name} ({deck.cardCount} words)
              </option>
            ))}
          </select>

          {/* 選択されたデッキの詳細情報 */}
          {selectedDeckData && (
            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{selectedDeckData.name}</h3>
                {isUserDeck ? (
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600">
                    Custom
                  </span>
                ) : (
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
                    Preset
                  </span>
                )}
              </div>
              <div className="mb-2 text-sm text-gray-600">
                <span className="font-medium">{selectedDeckData.cardCount}</span>{' '}
                単語が含まれています
              </div>
              {selectedDeckData.description && (
                <p className="text-sm text-gray-600">{selectedDeckData.description}</p>
              )}
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">
            文法単元 <span className="text-sm font-normal text-gray-500">(任意)</span>
          </h2>
          <input
            type="text"
            value={grammarUnit}
            onChange={e => setGrammarUnit(e.target.value)}
            placeholder="例: 現在完了形、関係代名詞、仮定法など（空欄でも問題生成可能）"
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">問題数</h2>
          <select
            value={questionCount}
            onChange={e => setQuestionCount(Number(e.target.value))}
            className="rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>
                {num}問
              </option>
            ))}
          </select>
        </div>

        {state.error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {state.error}
          </div>
        )}

        <div className="pt-6">
          <Button
            type="submit"
            variant="primary"
            className="w-full py-4 text-lg font-semibold"
            disabled={isPending}
          >
            {isPending ? '問題を生成中...' : '問題を生成して開始'}
          </Button>
        </div>
      </form>
    </div>
  )
}
