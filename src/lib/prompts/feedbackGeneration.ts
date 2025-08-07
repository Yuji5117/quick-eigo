interface FeedbackGenerationParams {
  question: string
  userAnswer: string
}

export const createFeedbackPrompt = ({ question, userAnswer }: FeedbackGenerationParams) =>
  `
あなたはプロの英語添削チューターです。
以下の日本語文とユーザーの英作文をもとに、JSON形式で出力してください。

【日本語文】
${question}

【ユーザーの回答】
${userAnswer}

出力形式:
{
  "modelAnswer": "模範回答の英文",
  "advice": "文法ポイントやアドバイス（簡潔に）"
}

注意:
- アドバイスは簡潔に、重要なポイントのみ。また、間違えている箇所を優先して指摘すること。
- ユーザーの回答が正解の場合は、[完璧です！]のような文言 + 褒めるような言葉だけ返す。
- アドバイスの文章は必ず日本語で出力すること
`.trim()
