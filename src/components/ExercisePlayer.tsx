'use client'

import { QuestionGenerator, ExerciseSession } from '@/components'
import { useExercisePlayer } from '@/hooks/useExercisePlayer'

export const ExercisePlayer = () => {
  const {
    questions,
    currentQuestion,
    currentQuestionNumber,
    answer,
    setAnswer,
    feedback,
    loadingQuestions,
    loadingFeedback,
    generateQuestions,
    sendAnswer,
    handleNextQuestion,
  } = useExercisePlayer()

  if (questions.length === 0) {
    return <QuestionGenerator loading={loadingQuestions} onGenerate={generateQuestions} />
  }

  return (
    <ExerciseSession
      question={{
        data: currentQuestion,
        number: currentQuestionNumber,
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
