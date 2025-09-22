'use client'

import { useRouter } from 'next/navigation'

import { AnswerInput, PracticeFeedback, ProgressBar, QuestionText } from '@/features/practice/'
import { usePracticeSession } from '@/hooks/usePracticeSession'

import { Button } from '@/components/ui'

export default function PracticePlay() {
  const router = useRouter()
  const {
    currentQuestion,
    progress,
    isLoaded,
    hasQuestions,
    isCompleted,
    nextQuestion,
    skipQuestion,
  } = usePracticeSession()

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
        <Button variant="primary" onClick={() => router.push('/')}>
          新しい問題を作成する
        </Button>
      </div>
    )
  }

  const handleAnswerSubmit = (answer: string) => {
    console.log('Submitted answer:', answer)
    // 今後、添削機能などを実装予定
    nextQuestion()
  }

  return (
    <div className="flex flex-col gap-y-8 p-6">
      <ProgressBar total={progress.total} current={progress.current} />
      <QuestionText text={currentQuestion?.japanese || ''} />
      <AnswerInput onSubmit={handleAnswerSubmit} />
      <PracticeFeedback />
      <Button variant="primary" onClick={() => handleAnswerSubmit('')}>
        添削を依頼
      </Button>
      <Button variant="secondary" onClick={skipQuestion}>
        スキップする
      </Button>
    </div>
  )
}
