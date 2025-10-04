'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  AnswerInput,
  PracticeFeedback,
  ProgressBar,
  QuestionText,
  generateFeedbackAction,
  type FeedbackResult,
} from '@/features/practice/'
import { usePracticeSession } from '@/hooks/usePracticeSession'
import { sessionAnswers } from '@/utils/sessionAnswers'

import { Button } from '@/components/ui'

export default function PracticePlay() {
  const router = useRouter()
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null)
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false)
  const [feedbackError, setFeedbackError] = useState<string | null>(null)

  const {
    currentQuestion,
    progress,
    isLoaded,
    hasQuestions,
    isCompleted,
    nextQuestion,
    skipQuestion,
  } = usePracticeSession()

  // セッション開始（練習開始時に一度だけ実行）
  useEffect(() => {
    if (isLoaded && hasQuestions && !sessionAnswers.isActive()) {
      sessionAnswers.startNew()
    }
  }, [isLoaded, hasQuestions])

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">問題を読み込み中...</div>
      </div>
    )
  }

  if (!hasQuestions) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="text-lg text-gray-600">問題が見つかりません</div>
        <Button variant="primary" onClick={() => router.push('/')}>
          問題を作成する
        </Button>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="text-xl font-semibold">お疲れ様でした！</div>
        <div className="text-gray-600">すべての問題が完了しました</div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="primary" onClick={() => router.push('/practice/review')}>
            結果を振り返る
          </Button>
          <Button variant="secondary" onClick={() => router.push('/')}>
            新しい問題を作成する
          </Button>
        </div>
      </div>
    )
  }

  const handleAnswerSubmit = async (answer: string) => {
    if (!answer.trim()) {
      return
    }

    setFeedback(null)
    setFeedbackError(null)
    setIsGeneratingFeedback(true)

    try {
      const result = await generateFeedbackAction(currentQuestion?.japanese || '', answer)

      if (result.success && result.feedback) {
        setFeedback(result.feedback)

        // セッション回答結果を保存
        if (currentQuestion) {
          sessionAnswers.save(currentQuestion, answer, result.feedback)
        }
      } else {
        setFeedbackError(result.error || 'フィードバックの生成に失敗しました')
      }
    } catch (error) {
      console.error('Error generating feedback:', error)
      setFeedbackError('フィードバックの生成中にエラーが発生しました')
    } finally {
      setIsGeneratingFeedback(false)
    }
  }

  const handleNextQuestion = () => {
    setCurrentAnswer('')
    setFeedback(null)
    setFeedbackError(null)
    nextQuestion()
  }

  return (
    <div className="flex flex-col gap-y-8 p-6">
      <ProgressBar total={progress.total} current={progress.current} />
      <QuestionText text={currentQuestion?.japanese || ''} />
      <AnswerInput
        value={currentAnswer}
        onChange={setCurrentAnswer}
        onSubmit={handleAnswerSubmit}
      />

      {isGeneratingFeedback && (
        <div className="flex items-center justify-center p-8">
          <div className="text-lg">フィードバックを生成中...</div>
        </div>
      )}

      {feedbackError && (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">エラー: {feedbackError}</div>
      )}

      {feedback && (
        <PracticeFeedback
          userAnswer={currentAnswer}
          modelAnswer={feedback.modelAnswer}
          advice={feedback.advice}
          question={currentQuestion?.japanese || ''}
          questionId={currentQuestion?.id || 0}
        />
      )}

      {feedback ? (
        <Button variant="primary" onClick={handleNextQuestion}>
          次の問題へ
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={() => handleAnswerSubmit(currentAnswer)}
          disabled={!currentAnswer.trim() || isGeneratingFeedback}
        >
          添削を依頼
        </Button>
      )}

      <Button variant="secondary" onClick={skipQuestion}>
        スキップする
      </Button>
    </div>
  )
}
