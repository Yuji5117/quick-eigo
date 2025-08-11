'use client'

import React, { useState } from 'react'

import { paths } from '@/constants/paths'
import { api } from '@/lib/client'
import { AlternativeExpression, StructuredFeedback } from '@/types'

import { Button, Spinner } from '@/components/ui'

interface FeedbackDisplayProps {
  feedback: StructuredFeedback
  question: { japanese: string }
  userAnswer: string
}

export const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({
  feedback,
  question,
  userAnswer,
}) => {
  const [showAlternatives, setShowAlternatives] = useState(false)
  const [alternatives, setAlternatives] = useState<AlternativeExpression[]>([])
  const [loading, setLoading] = useState(false)
  const [fetched, setFetched] = useState(false)

  const fetchAlternatives = async () => {
    if (fetched) {
      setShowAlternatives(!showAlternatives)
      return
    }

    setLoading(true)
    try {
      const response = await api.post<{ alternativeExpressions: AlternativeExpression[] }>(
        paths.app.exercises.alternatives.path,
        {
          question: question.japanese,
          userAnswer,
          modelAnswer: feedback.modelAnswer,
        },
      )

      setAlternatives(response.alternativeExpressions)
      setFetched(true)
      setShowAlternatives(true)
    } catch (error) {
      console.error('Failed to fetch alternatives:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
        {feedback.modelAnswer && (
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">【模範回答】</h3>
            <p className="rounded border-l-4 border-blue-500 bg-white p-3 font-medium text-gray-800">
              {feedback.modelAnswer}
            </p>
          </div>
        )}

        {feedback.advice && (
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">【アドバイス】</h3>
            <p className="leading-relaxed text-gray-700">{feedback.advice}</p>
          </div>
        )}
      </div>

      <div className="text-center">
        <Button
          onClick={fetchAlternatives}
          disabled={loading}
          className="bg-purple-600 px-6 py-2 text-sm text-white hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Spinner /> 取得中...
            </>
          ) : (
            `📝 他の表現${showAlternatives ? 'を隠す' : 'を見る'}`
          )}
        </Button>
      </div>

      {showAlternatives && alternatives.length > 0 && (
        <div className="rounded-lg border-l-4 border-purple-500 bg-purple-50 p-6 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-purple-900">【他の表現】</h3>
          <div className="space-y-3">
            {alternatives.map((alt, index) => (
              <div key={index} className="rounded-lg bg-white p-3">
                <p className="mb-1 font-medium text-gray-800">• {alt.expression}</p>
                <p className="ml-4 text-sm text-gray-600">→ {alt.nuance}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
