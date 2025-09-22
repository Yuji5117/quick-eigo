'use client'

import { useState } from 'react'

type PracticeFeedbackProps = {
  userAnswer: string
  modelAnswer: string
  advice: string
  otherExpressions?: string[]
}

export const PracticeFeedback: React.FC<PracticeFeedbackProps> = ({
  userAnswer,
  modelAnswer,
  advice,
  otherExpressions = [],
}) => {
  const [showOtherExpression, setShowOtherExpression] = useState<boolean>(false)

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
      {otherExpressions.length > 0 && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setShowOtherExpression(prev => !prev)}
            className="bg-primary text-md w-fit rounded-full px-4 py-2 text-white"
          >
            {showOtherExpression ? '他の表現を隠す' : '他の表現を見る'}
          </button>
        </div>
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
