import type { StructuredFeedback } from './feedback'

export type Question = {
  id: number
  japanese: string
  type: string
}

export type QuestionResult = {
  question: Question
  userAnswer: string
  feedback: StructuredFeedback
  otherExpressions: string[]
  answeredAt: Date
}

export type SessionResult = {
  questions: QuestionResult[]
  sessionId: string
  completedAt: Date
  totalQuestions: number
}

export type SessionState = {
  currentResults: QuestionResult[]
  isSessionActive: boolean
}
