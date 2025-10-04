import type { StructuredFeedback } from './feedback'

// 既存のQuestionをtypeで再定義
export type Question = {
  id: number
  japanese: string
  type: string
}

// 問題の回答結果
export type QuestionResult = {
  question: Question
  userAnswer: string
  feedback: StructuredFeedback
  otherExpressions: string[]
  answeredAt: Date
}

// セッション全体の結果
export type SessionResult = {
  questions: QuestionResult[]
  sessionId: string
  completedAt: Date
  totalQuestions: number
}

// セッション状態の管理用
export type SessionState = {
  currentResults: QuestionResult[]
  isSessionActive: boolean
}
