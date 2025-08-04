'use client'

import { useState } from 'react'
import { FeedbackDisplay } from './FeedbackDisplay'

type Question = {
  id: number
  japanese: string
  type: 'affirmative' | 'interrogative'
}

export default function ExercisePlayer() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [idx, setIdx] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)

  // 問題を生成して state にセット
  const generateQuestions = async () => {
    const res = await fetch('/api/exercises/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: '現在分詞、過去分詞',
        level: 'TOEIC900点',
        count: 10,
        previousQuestions: questions.map(q => q.japanese),
      }),
    })
    const { questions: qs } = await res.json()
    setQuestions(qs)
    setIdx(0)
    setAnswer('')
    setFeedback(null)
  }

  // 回答を送って添削フィードバックを取得
  const sendAnswer = async () => {
    const q = questions[idx]
    const res = await fetch('/api/exercises/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q, userAnswer: answer }),
    })
    const { feedback } = await res.json()
    setFeedback(feedback)
  }

  if (questions.length === 0) {
    return (
      <div className="flex justify-center">
        <button onClick={generateQuestions} className="rounded bg-blue-600 px-4 py-2 text-white">
          問題を生成する
        </button>
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
        <button onClick={sendAnswer} className="flex-1 rounded bg-green-500 py-2 text-white">
          添削を依頼
        </button>
        <button
          onClick={() => {
            setIdx(i => Math.min(i + 1, questions.length - 1))
            setAnswer('')
            setFeedback(null)
          }}
          className="flex-1 rounded bg-gray-200 py-2"
        >
          次へ
        </button>
      </div>
      {feedback && (
        <div className="mt-4">
          <FeedbackDisplay feedback={feedback} />
        </div>
      )}
    </div>
  )
}
