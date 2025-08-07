interface FeedbackGenerationParams {
  question: string
  userAnswer: string
}

export const createFeedbackPrompt = ({ question, userAnswer }: FeedbackGenerationParams) => `
あなたはプロの英語添削チューターです。
以下の日本語文とユーザーの英作文をもとに、
- 正解例
- 文法ポイント
- 別の自然な表現（あれば）
の観点を考慮して、簡潔に出力してください。

【日本語文】
${question}

【ユーザーの回答】
${userAnswer}
`.trim()