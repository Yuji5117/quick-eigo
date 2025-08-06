'use client'

import { useState } from 'react'
import { QuestionGenerator } from './QuestionGenerator'
import { ExerciseSession } from './ExerciseSession'

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

  const handleNextQuestion = () => {
    setIdx(i => Math.min(i + 1, questions.length - 1))
    setAnswer('')
    setFeedback(null)
  }

  if (questions.length === 0) {
    return <QuestionGenerator loading={loadingQuestions} onGenerate={generateQuestions} />
  }

  return (
    <ExerciseSession
      question={{
        data: questions[idx],
        number: idx + 1,
        total: questions.length,
      }}
      answer={{
        value: answer,
        onChange: setAnswer,
      }}
      feedback={{
        value: feedback,
        isLoading: loadingFeedback,
      }}
      actions={{
        onSendAnswer: sendAnswer,
        onNextQuestion: handleNextQuestion,
      }}
    />
  )
}
