import type { Question, QuestionResult } from '@/types'

const STORAGE_KEY = 'quick-eigo-current-session'

type SessionData = {
  sessionId: string
  results: QuestionResult[]
  startedAt: string
}

const getSessionData = (): SessionData | null => {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY)
    if (!data) return null

    const parsed = JSON.parse(data)
    return {
      ...parsed,
      results: parsed.results.map((result: { answeredAt: string }) => ({
        ...result,
        answeredAt: new Date(result.answeredAt),
      })),
    }
  } catch (error) {
    console.error('Failed to parse session data:', error)
    sessionStorage.removeItem(STORAGE_KEY)
    return null
  }
}

const saveSessionData = (sessionData: SessionData): void => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData))
  } catch (error) {
    console.error('Failed to save session data:', error)
  }
}

export const sessionAnswers = {
  /**
   * 新しいセッションを開始
   */
  startNew(): void {
    const newSession: SessionData = {
      sessionId: crypto.randomUUID(),
      results: [],
      startedAt: new Date().toISOString(),
    }
    saveSessionData(newSession)
  },

  /**
   * 回答結果を保存
   */
  save(
    question: Question,
    userAnswer: string,
    feedback: { modelAnswer: string; advice: string },
    otherExpressions: string[] = [],
  ): void {
    let sessionData = getSessionData()

    // セッションが存在しない場合は新規作成
    if (!sessionData) {
      sessionData = {
        sessionId: crypto.randomUUID(),
        results: [],
        startedAt: new Date().toISOString(),
      }
    }

    // 既存の回答結果があるかチェック
    const existingIndex = sessionData.results.findIndex(r => r.question.id === question.id)

    const questionResult: QuestionResult = {
      question,
      userAnswer,
      feedback,
      otherExpressions,
      answeredAt: new Date(),
    }

    if (existingIndex >= 0) {
      // 既存の結果を更新
      sessionData.results[existingIndex] = questionResult
    } else {
      // 新しい結果を追加
      sessionData.results.push(questionResult)
    }

    saveSessionData(sessionData)
  },

  /**
   * 特定の問題の他の表現を更新
   */
  updateOtherExpressions(questionId: number, expressions: string[]): void {
    const sessionData = getSessionData()
    if (!sessionData) {
      console.warn('No active session to update other expressions')
      return
    }

    const resultIndex = sessionData.results.findIndex(r => r.question.id === questionId)
    if (resultIndex >= 0) {
      sessionData.results[resultIndex].otherExpressions = expressions
      saveSessionData(sessionData)
    } else {
      console.warn(`No result found for question ID: ${questionId}`)
    }
  },

  /**
   * 特定の問題の回答結果を取得
   */
  getQuestionResult(questionId: number): QuestionResult | null {
    const sessionData = getSessionData()
    if (!sessionData) return null

    return sessionData.results.find(r => r.question.id === questionId) || null
  },

  /**
   * 現在のセッションデータを取得
   */
  getCurrent(): SessionData | null {
    return getSessionData()
  },

  /**
   * セッションをクリア
   */
  clear(): void {
    sessionStorage.removeItem(STORAGE_KEY)
  },

  /**
   * セッションがアクティブかどうか
   */
  isActive(): boolean {
    return getSessionData() !== null
  },
}
