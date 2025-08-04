import { openai } from '@/lib/openai'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  const { question, userAnswer } = await req.json()

  const systemPrompt = `
  あなたはプロの英語添削チューターです。
  以下の日本語文とユーザーの英作文をもとに、
  - 正解例
  - 文法ポイント
  - 別の自然な表現（あれば）
  の観点を考慮して、簡潔に出力してください。

  【日本語文】
  ${question.japanese}

  【ユーザーの回答】
  ${userAnswer}
  `.trim()

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
    ],
  })
  const feedback = completion.choices[0].message?.content ?? ''
  return NextResponse.json({
    feedback,
  })
}
