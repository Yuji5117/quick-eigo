'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { sessionAnswers } from '@/utils/sessionAnswers'

import { generateAlternativeExpressionsAction } from '../actions/generateAlternativeExpressions'

type PracticeFeedbackProps = {
  userAnswer: string
  modelAnswer: string
  advice: string
  question: string
  questionId: number
}

export const PracticeFeedback: React.FC<PracticeFeedbackProps> = ({
  userAnswer,
  modelAnswer,
  advice,
  question,
  questionId,
}) => {
  const [showOtherExpression, setShowOtherExpression] = useState<boolean>(false)
  const [otherExpressions, setOtherExpressions] = useState<string[]>([])
  const [isGeneratingExpressions, setIsGeneratingExpressions] = useState<boolean>(false)
  const [expressionsError, setExpressionsError] = useState<string | null>(null)

  const handleShowOtherExpressions = async () => {
    if (showOtherExpression) {
      setShowOtherExpression(false)
      return
    }

    if (otherExpressions.length > 0) {
      setShowOtherExpression(true)
      return
    }

    setIsGeneratingExpressions(true)
    setExpressionsError(null)

    try {
      const result = await generateAlternativeExpressionsAction(question, userAnswer, modelAnswer)

      if (result.success && result.result) {
        setOtherExpressions(result.result.expressions)
        setShowOtherExpression(true)

        // セッションデータの他の表現を更新
        sessionAnswers.updateOtherExpressions(questionId, result.result.expressions)
      } else {
        setExpressionsError(result.error || '他の表現の生成に失敗しました')
      }
    } catch (error) {
      console.error('Error generating alternative expressions:', error)
      setExpressionsError('他の表現の生成中にエラーが発生しました')
    } finally {
      setIsGeneratingExpressions(false)
    }
  }

  return (
    <div className="bg-secondary flex flex-col gap-y-5 rounded-lg p-4">
      <div className="flex flex-col gap-y-3">
        <h3 className="text-lg font-semibold">あなたの解答</h3>
        <p className="border-l-primary rounded-lg border-l-6 bg-white p-3 text-lg">{userAnswer}</p>
      </div>
      <div className="flex flex-col gap-y-3">
        <h3 className="text-lg font-semibold">模範解答</h3>
        <p className="border-l-primary rounded-lg border-l-6 bg-white p-3 text-lg">{modelAnswer}</p>
      </div>
      <div className="flex flex-col gap-y-3">
        <h3 className="text-lg font-semibold">アドバイス</h3>
        <p className="rounded-lg bg-white p-3 text-lg">{advice}</p>
      </div>
      <div className="flex justify-center pt-2">
        <Button
          onClick={handleShowOtherExpressions}
          disabled={isGeneratingExpressions}
          className="w-fit px-6 py-3 text-sm font-medium bg-white !text-primary border border-primary hover:bg-primary hover:text-white transition-colors shadow-md"
        >
          {isGeneratingExpressions ? (
            <span className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
              他の表現を生成中...
            </span>
          ) : showOtherExpression ? (
            <span className="flex items-center gap-2">
              ▲ 他の表現を隠す
            </span>
          ) : (
            <span className="flex items-center gap-2">
              ▼ 他の表現を見る
            </span>
          )}
        </Button>
      </div>

      {expressionsError && (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">エラー: {expressionsError}</div>
      )}

      {showOtherExpression && otherExpressions.length > 0 && (
        <div className="flex flex-col gap-y-3">
          <h3 className="text-lg font-semibold">他の表現</h3>
          {otherExpressions.map((expression, index) => (
            <p key={index} className="rounded-lg bg-white px-4 py-3 text-lg">
              {expression}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
