'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { QuestionResult } from '@/types'
import { sessionAnswers } from '@/utils/sessionAnswers'

import { Button } from '@/components/ui'

type SessionData = {
  sessionId: string
  results: QuestionResult[]
  startedAt: string
}

export default function PracticeReview() {
  const router = useRouter()
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // セッションデータを取得
    const currentSession = sessionAnswers.getCurrent()
    setSessionData(currentSession)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">データを読み込み中...</div>
      </div>
    )
  }

  if (!sessionData || sessionData.results.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="text-xl font-semibold text-gray-800">振り返るデータがありません</div>
        <div className="text-gray-600">まずは問題を解いてみましょう</div>
        <Button variant="primary" onClick={() => router.push('/')}>
          問題を作成する
        </Button>
      </div>
    )
  }

  const startedAt = new Date(sessionData.startedAt)
  const duration = Math.round((Date.now() - startedAt.getTime()) / 1000 / 60) // 分

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        {/* ヘッダー */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">セッション振り返り</h1>
          <p className="text-gray-600">今回のセッションの結果を確認しましょう</p>
        </div>

        {/* セッション概要 */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">セッション概要</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{sessionData.results.length}</div>
              <div className="text-sm text-gray-600">問題数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{duration}</div>
              <div className="text-sm text-gray-600">分</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {startedAt.toLocaleTimeString('ja-JP', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <div className="text-sm text-gray-600">開始時刻</div>
            </div>
          </div>
        </div>

        {/* 問題一覧 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">問題詳細</h2>
          {sessionData.results.map((result, index) => (
            <div key={result.question.id} className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                  {index + 1}
                </div>
                <h3 className="text-lg font-medium text-gray-800">問題 {index + 1}</h3>
              </div>

              <div className="space-y-4">
                {/* 問題文 */}
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-700">問題文</h4>
                  <p className="rounded-lg bg-gray-50 p-3 text-lg">{result.question.japanese}</p>
                </div>

                {/* あなたの回答 */}
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-700">あなたの回答</h4>
                  <p className="border-l-primary rounded-lg border-l-4 bg-blue-50 p-3 text-lg">
                    {result.userAnswer}
                  </p>
                </div>

                {/* 模範解答 */}
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-700">模範解答</h4>
                  <p className="border-l-primary rounded-lg border-l-4 bg-green-50 p-3 text-lg">
                    {result.feedback.modelAnswer}
                  </p>
                </div>

                {/* アドバイス */}
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-700">アドバイス</h4>
                  <p className="rounded-lg bg-yellow-50 p-3 text-lg">{result.feedback.advice}</p>
                </div>

                {/* 他の表現 */}
                {result.otherExpressions.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-gray-700">他の表現</h4>
                    <div className="space-y-2">
                      {result.otherExpressions.map((expression, i) => (
                        <p key={i} className="rounded-lg bg-purple-50 p-3 text-lg">
                          {expression}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* 回答時刻 */}
                <div className="text-right text-sm text-gray-500">
                  回答時刻: {result.answeredAt.toLocaleString('ja-JP')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* アクション */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button variant="primary" onClick={() => router.push('/')}>
            新しい問題を作成する
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              sessionAnswers.clear()
              router.push('/')
            }}
          >
            セッションをクリアして戻る
          </Button>
        </div>
      </div>
    </div>
  )
}