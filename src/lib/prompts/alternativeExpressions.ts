interface AlternativeExpressionsParams {
  question: string
  userAnswer: string
  modelAnswer: string
}

export const createAlternativeExpressionsPrompt = ({
  question,
  userAnswer,
  modelAnswer,
}: AlternativeExpressionsParams) =>
  `
あなたはプロの英語表現バリエーション専門家です。
以下の情報をもとに、他の自然な英語表現を最大2個まで、JSON形式で出力してください。

【日本語文】
${question}

【ユーザーの回答】
${userAnswer}

【模範回答】
${modelAnswer}

出力形式:
[
  {
    "expression": "別の表現1",
    "nuance": "ニュアンスの説明（1文で簡潔に、専門用語は使わない）"
  },
  {
    "expression": "別の表現2", 
    "nuance": "ニュアンスの説明（1文で簡潔に、専門用語は使わない）"
  }
]

注意:
- 最大2個まで、適切な別表現がない場合は1個でも可
- 模範回答とは異なる自然な表現を提案
- nuanceは専門用語を避け、1文で簡潔に日本語で説明
- 表現は英語、説明は日本語で出力
`.trim()
