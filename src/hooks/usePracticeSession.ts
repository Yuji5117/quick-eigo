'use client'

import { useEffect, useState } from 'react'

export type Question = {
  id: number
  japanese: string
  type: string
}

export function usePracticeSession() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedQuestions = sessionStorage.getItem('practiceQuestions')

    if (savedQuestions) {
      try {
        const parsedQuestions = JSON.parse(savedQuestions)
        setQuestions(parsedQuestions)
      } catch (error) {
        console.error('Failed to parse session data:', error)
      }
    }
    setIsLoaded(true)
  }, [])

  const currentQuestion = questions[currentIndex] || null
  const progress = {
    current: currentIndex + 1,
    total: questions.length,
  }

  const nextQuestion = () => {
    if (currentIndex < questions.length) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const skipQuestion = () => {
    nextQuestion()
  }

  const hasQuestions = questions.length > 0
  const isLastQuestion = currentIndex === questions.length - 1

  return {
    questions,
    currentQuestion,
    currentIndex,
    isLoaded,
    progress,
    hasQuestions,
    isLastQuestion,
    nextQuestion,
    skipQuestion,
  }
}
