import { openai } from '@/lib/openai'
import { createAlternativeExpressionsPrompt } from '@/lib/prompts'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  const { question, userAnswer, modelAnswer } = await req.json()

  const systemPrompt = createAlternativeExpressionsPrompt({
    question,
    userAnswer,
    modelAnswer,
  })

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
    ],
  })

  const content = completion.choices[0].message?.content ?? '[]'
  let alternativeExpressions = []

  try {
    alternativeExpressions = JSON.parse(content)
  } catch (e) {
    console.error('Failed to parse alternatives JSON:', e)
    alternativeExpressions = []
  }

  return NextResponse.json({ alternativeExpressions })
}
