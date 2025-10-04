'use client'

import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'

import { LEVELS, TOPICS } from '@/constants/exerciseOptions'

import { Button } from '@/components/ui'

import { generateQuestionAction, type GenerateQuestionState } from '../actions/generateQuestion'

export function QuestionSetupForm() {
  const router = useRouter()
  const [selectedTopic, setSelectedTopic] = useState<string>(TOPICS[0].value)
  const [selectedLevel, setSelectedLevel] = useState<string>(LEVELS[1].value)
  const [grammarUnit, setGrammarUnit] = useState('')
  const [questionCount, setQuestionCount] = useState(5)

  const initialState: GenerateQuestionState = {}
  const [state, formAction, isPending] = useActionState(generateQuestionAction, initialState)

  useEffect(() => {
    if (state.success && state.questions) {
      sessionStorage.setItem('practiceQuestions', JSON.stringify(state.questions))

      router.push('/practice/play')
    }
  }, [state, router])

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">問題作成設定</h1>
        <p className="text-gray-600">お好みの設定で英作文問題を生成します</p>
      </div>

      <form action={formAction} className="space-y-8">
        <input type="hidden" name="topic" value={selectedTopic} />
        <input type="hidden" name="level" value={selectedLevel} />
        <input type="hidden" name="grammarUnit" value={grammarUnit} />
        <input type="hidden" name="questionCount" value={questionCount} />

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
          <h2 className="mb-4 text-xl font-semibold">文法単元</h2>
          <input
            type="text"
            value={grammarUnit}
            onChange={e => setGrammarUnit(e.target.value)}
            placeholder="例: 現在完了形、関係代名詞、仮定法など"
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
