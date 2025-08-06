'use client'

import { useState } from 'react'
import { Button, FeedbackDisplay, Spinner } from '@/components'

type Question = {
  id: number
  japanese: string
  type: 'affirmative' | 'interrogative'
}

export const ExercisePlayer = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [idx, setIdx] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)

  const [loadingQuestions, setLoadingQuestions] = useState(false)
  const [loadingFeedback, setLoadingFeedback] = useState(false)

  const generateQuestions = async () => {
    setLoadingQuestions(true)
    try {
      const res = await fetch('/api/exercises/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: '日常会話、ネイティブ表現',
          level: 'TOEIC600点',
          count: 5,
          previousQuestions: questions.map(q => q.japanese),
        }),
      })
      const { questions: qs } = await res.json()
      setQuestions(qs)
      setIdx(0)
      setAnswer('')
      setFeedback(null)
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingQuestions(false)
    }
  }

  const sendAnswer = async () => {
    setLoadingFeedback(true)
    try {
      const q = questions[idx]
      const res = await fetch('/api/exercises/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, userAnswer: answer }),
      })
      const { feedback } = await res.json()
      setFeedback(feedback)
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingFeedback(false)
    }
  }

  if (questions.length === 0) {
    return (
      <div className="flex justify-center">
        {loadingQuestions ? (
          <Spinner />
        ) : (
          <Button onClick={generateQuestions} className="bg-blue-600">
            問題を生成する
          </Button>
        )}
      </div>
    )
  }

  const q = questions[idx]
  return (
    <div className="mx-auto max-w-md space-y-4">
      <div className="text-gray-800">
        <strong>
          {idx + 1}/{questions.length}
        </strong>{' '}
        {q.japanese}
      </div>
      <input
        type="text"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        className="w-full rounded border px-3 py-2"
        placeholder="英語で入力…"
      />
      <div className="flex space-x-2">
        <Button onClick={sendAnswer} className="flex-1 bg-green-500">
          {loadingFeedback ? <Spinner /> : '添削を依頼'}
        </Button>
        <Button
          onClick={() => {
            setIdx(i => Math.min(i + 1, questions.length - 1))
            setAnswer('')
            setFeedback(null)
          }}
          className="flex-1 bg-gray-200 text-black"
        >
          次へ
        </Button>
      </div>
      {feedback && (
        <div className="mt-4">
          <FeedbackDisplay feedback={feedback} />
        </div>
      )}
    </div>
  )
}
