'use client'

import { QuestionGenerator, ExerciseSession, ExerciseComplete } from '@/components'
import { useExercisePlayer } from '@/hooks/useExercisePlayer'

export const ExercisePlayer = () => {
  const {
    questions,
    currentQuestion,
    currentQuestionNumber,
    totalQuestions,
    answer,
    setAnswer,
    feedback,
    questionCount,
    setQuestionCount,
    selectedTopic,
    setSelectedTopic,
    selectedLevel,
    setSelectedLevel,
    isCompleted,
    loadingQuestions,
    loadingFeedback,
    generateQuestions,
    sendAnswer,
    handleNextQuestion,
    restartExercise,
  } = useExercisePlayer()

  if (isCompleted) {
    return <ExerciseComplete totalQuestions={totalQuestions} onRestart={restartExercise} />
  }

  if (questions.length === 0) {
    return (
      <QuestionGenerator
        loading={loadingQuestions}
        questionCount={questionCount}
        selectedTopic={selectedTopic}
        selectedLevel={selectedLevel}
        onQuestionCountChange={setQuestionCount}
        onTopicChange={setSelectedTopic}
        onLevelChange={setSelectedLevel}
        onGenerate={generateQuestions}
      />
    )
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
