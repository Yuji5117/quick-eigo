export interface AlternativeExpression {
  expression: string
  nuance: string
}

export interface StructuredFeedback {
  modelAnswer: string
  advice: string
}

export interface FeedbackResponse {
  feedback: StructuredFeedback
}

export interface AlternativeExpressionsResponse {
  alternativeExpressions: AlternativeExpression[]
}
