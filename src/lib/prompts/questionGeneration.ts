type QuestionGenerationParams = {
  topic: string
  level: string
  grammarUnit?: string
  count: number
  deckName?: string
  deckWords?: string[]
}

export const createQuestionGenerationPrompt = ({
  topic,
  level,
  grammarUnit,
  count,
  deckName,
  deckWords,
}: QuestionGenerationParams) => {
  const grammarUnitSection = grammarUnit
    ? `・文法単元: ${grammarUnit}
・指定された文法単元を重点的に練習できる問題を作成`
    : '・様々な文法パターンを使った問題を作成'

  const deckSection =
    deckName && deckWords && deckWords.length > 0
      ? `・使用単語デッキ: ${deckName}
・優先使用単語: ${deckWords.join('、')}
・デッキの単語を優先的に使用して問題を作成`
      : ''

  return `
あなたはプロの英語問題作成チューターです。
以下の条件に従って、JSON 配列で瞬間英作文の問題を出力してください。

【条件】
・トピック: ${topic}
・レベル: ${level}
${grammarUnitSection}
${deckSection}
・問題数: ${count}
・30% は疑問文形式（残り70%は平叙文）
・日常会話でよく使う自然な表現を優先
・日本語で問題文のみ出力（英語の解答やヒントは含めない）

【出力形式】
JSON配列で、各問題は以下の形式:
{
  "id": 連番,
  "japanese": "日本語の問題文",
  "type": "affirmative" または "interrogative"
}

【出力例】
[
  { "id": 1, "japanese": "私は毎朝コーヒーを飲みます。", "type": "affirmative" },
  { "id": 2, "japanese": "あなたは何時に起きますか？", "type": "interrogative" },
  { "id": 3, "japanese": "彼は昨日映画を見ました。", "type": "affirmative" }
]

【重要】JSONのみを出力し、説明文は不要です。
`.trim()
}
