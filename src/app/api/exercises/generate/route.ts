// app/api/exercises/generate/route.ts
import { openai } from '@/lib/openai'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { topic, level, count, previousQuestions } = await req.json()

  const systemPrompt = `
あなたはプロの英語問題作成チューターです。
以下の条件に従って、JSON 配列で瞬間英作文の問題を出力してください。
・トピック: ${topic}
・レベル: ${level}
・問題数: ${count}
・以前に出した問題は出さない（previousQuestions 配列を参照）
・30% は疑問文形式
・日常会話でよく使う構文を優先
・日本語で問題文のみ（ヒント・解答は含めない）
出力形式:
[
  { "id": 1, "japanese": "…", "type": "affirmative" },
  …
]
`.trim()

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: JSON.stringify({ previousQuestions }) },
    ],
  })

  const text = completion.choices[0].message?.content ?? '[]'
  let questions: { id: number; japanese: string; type: string }[] = []
  try {
    questions = JSON.parse(text)
  } catch (e) {
    console.error('Failed to parse questions JSON:', e)
  }

  return NextResponse.json({ questions })
}
