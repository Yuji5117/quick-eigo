'use client'

import { useState } from 'react'

import { sessionAnswers } from '@/utils/sessionAnswers'

import { Button } from '@/components/ui/Button'

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
    <div className="bg-secondary flex flex-col gap-y-6 rounded-lg p-6 shadow-lg">
      <div className="flex flex-col gap-y-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-700">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          あなたの解答
        </h3>
        <p className="rounded-lg border-l-6 border-l-blue-400 bg-blue-50 p-4 text-lg shadow-sm">
          {userAnswer}
        </p>
      </div>
      <div className="flex flex-col gap-y-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-green-700">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          模範解答
        </h3>
        <p className="rounded-lg border-l-6 border-l-green-400 bg-green-50 p-4 text-lg shadow-sm">
          {modelAnswer}
        </p>
      </div>
      <div className="flex flex-col gap-y-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-yellow-700">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          アドバイス
        </h3>
        <p className="rounded-lg border-l-4 border-l-yellow-400 bg-yellow-50 p-4 text-lg shadow-sm">
          {advice}
        </p>
      </div>
      <div className="flex justify-center pt-2">
        <Button
          onClick={handleShowOtherExpressions}
          disabled={isGeneratingExpressions}
          className="!text-primary border-primary hover:bg-primary w-fit border bg-white px-6 py-3 text-sm font-medium shadow-md transition-colors hover:text-white"
        >
          {isGeneratingExpressions ? (
            <span className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
              他の表現を生成中...
            </span>
          ) : showOtherExpression ? (
            <span className="flex items-center gap-2">▲ 他の表現を隠す</span>
          ) : (
            <span className="flex items-center gap-2">▼ 他の表現を見る</span>
          )}
        </Button>
      </div>

      {expressionsError && (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">エラー: {expressionsError}</div>
      )}

      {showOtherExpression && otherExpressions.length > 0 && (
        <div className="flex flex-col gap-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-purple-700">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            他の表現
          </h3>
          {otherExpressions.map((expression, index) => (
            <p
              key={index}
              className="rounded-lg border-l-4 border-l-purple-400 bg-purple-50 px-4 py-3 text-lg shadow-sm"
            >
              {expression}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
