'use client'

import { useExercisePlayer } from '@/hooks/useExercisePlayer'

import { ExerciseComplete } from './ExerciseComplete'
import { ExerciseSession } from './ExerciseSession'
import { QuestionGenerator } from './QuestionGenerator'

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
    selectedGrammarUnit,
    setSelectedGrammarUnit,
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
        selectedGrammarUnit={selectedGrammarUnit}
        onQuestionCountChange={setQuestionCount}
        onTopicChange={setSelectedTopic}
        onLevelChange={setSelectedLevel}
        onGrammarUnitChange={setSelectedGrammarUnit}
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

export const ExercisePlayerComponent = 'test'
