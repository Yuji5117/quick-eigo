import { paths } from '@/constants/paths'
import { api } from '@/lib/client'
import { useState, useCallback } from 'react'

type Question = {
  id: number
  japanese: string
  type: 'affirmative' | 'interrogative'
}

export const useExercisePlayer = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [idx, setIdx] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)

  const [loadingQuestions, setLoadingQuestions] = useState(false)
  const [loadingFeedback, setLoadingFeedback] = useState(false)

  const generateQuestions = useCallback(async () => {
    setLoadingQuestions(true)
    try {
      const res = await api.post<{ questions: Question[] }>(paths.app.exercises.generate.path, {
        topic: '日常会話、ネイティブ表現',
        level: 'TOEIC600点',
        count: 5,
        previousQuestions: questions.map(q => q.japanese),
      })

      const { questions: qs } = res
      setQuestions(qs)
      setIdx(0)
      setAnswer('')
      setFeedback(null)
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingQuestions(false)
    }
  }, [questions])

  const sendAnswer = useCallback(async () => {
    setLoadingFeedback(true)
    try {
      const q = questions[idx]
      const res = await api.post<{ feedback: string }>(paths.app.exercises.feedback.path, {
        question: q,
        userAnswer: answer,
      })

      const { feedback } = res
      setFeedback(feedback)
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingFeedback(false)
    }
  }, [questions, idx, answer])

  const handleNextQuestion = useCallback(() => {
    setIdx(i => Math.min(i + 1, questions.length - 1))
    setAnswer('')
    setFeedback(null)
  }, [questions.length])

  return {
    questions,
    currentQuestion: questions[idx],
    currentQuestionNumber: idx + 1,
    totalQuestions: questions.length,
    answer,
    setAnswer,
    feedback,
    loadingQuestions,
    loadingFeedback,
    generateQuestions,
    sendAnswer,
    handleNextQuestion,
  }
}
