import { paths } from '@/constants/paths'
import { DEFAULT_QUESTION_COUNT } from '@/constants/questionCounts'
import { DEFAULT_TOPIC, DEFAULT_LEVEL, TOPICS, LEVELS } from '@/constants/exerciseOptions'
import { DEFAULT_GRAMMAR_UNIT } from '@/constants/grammarUnits'
import { api } from '@/lib/client'
import { Question, StructuredFeedback } from '@/types'
import { useState, useCallback } from 'react'

type Topic = (typeof TOPICS)[number]
type Level = (typeof LEVELS)[number]
type GrammarUnit = {
  id: string
  name: string
  englishName: string
  emoji: string
  description: string
  value: string
}

export const useExercisePlayer = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [idx, setIdx] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<StructuredFeedback | null>(null)
  const [questionCount, setQuestionCount] = useState(DEFAULT_QUESTION_COUNT)
  const [selectedTopic, setSelectedTopic] = useState<Topic>(DEFAULT_TOPIC)
  const [selectedLevel, setSelectedLevel] = useState<Level>(DEFAULT_LEVEL)
  const [selectedGrammarUnit, setSelectedGrammarUnit] = useState<GrammarUnit>(DEFAULT_GRAMMAR_UNIT)
  const [isCompleted, setIsCompleted] = useState(false)

  const [loadingQuestions, setLoadingQuestions] = useState(false)
  const [loadingFeedback, setLoadingFeedback] = useState(false)

  const generateQuestions = useCallback(async () => {
    setLoadingQuestions(true)
    try {
      const res = await api.post<{ questions: Question[] }>(paths.app.exercises.generate.path, {
        topic: selectedTopic.value,
        level: selectedLevel.value,
        grammarUnit: selectedGrammarUnit.value,
        count: questionCount,
        previousQuestions: questions.map(q => q.japanese),
      })

      const { questions: qs } = res
      setQuestions(qs)
      setIdx(0)
      setAnswer('')
      setFeedback(null)
      setIsCompleted(false)
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingQuestions(false)
    }
  }, [
    questions,
    questionCount,
    selectedTopic.value,
    selectedLevel.value,
    selectedGrammarUnit.value,
  ])

  const sendAnswer = useCallback(async () => {
    setLoadingFeedback(true)
    try {
      const q = questions[idx]
      const res = await api.post<{ feedback: StructuredFeedback }>(
        paths.app.exercises.feedback.path,
        {
          question: q,
          userAnswer: answer,
        },
      )

      const { feedback } = res
      setFeedback(feedback)
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingFeedback(false)
    }
  }, [questions, idx, answer])

  const handleNextQuestion = useCallback(() => {
    if (idx >= questions.length - 1) {
      setIsCompleted(true)
    } else {
      setIdx(i => i + 1)
    }
    setAnswer('')
    setFeedback(null)
  }, [idx, questions.length])

  const restartExercise = useCallback(() => {
    setQuestions([])
    setIdx(0)
    setAnswer('')
    setFeedback(null)
    setIsCompleted(false)
  }, [])

  return {
    questions,
    currentQuestion: questions[idx],
    currentQuestionNumber: idx + 1,
    totalQuestions: questions.length,
    answer,
    setAnswer,
    feedback,
    questionCount,
    setQuestionCount,
    selectedTopic,
    setSelectedTopic,
    selectedLevel,
    setSelectedLevel,
    selectedGrammarUnit,
    setSelectedGrammarUnit,
    isCompleted,
    loadingQuestions,
    loadingFeedback,
    generateQuestions,
    sendAnswer,
    handleNextQuestion,
    restartExercise,
  }
}
