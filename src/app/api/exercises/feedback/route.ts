import { openai } from '@/lib/openai'
import { createFeedbackPrompt } from '@/lib/prompts'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  const { question, userAnswer } = await req.json()

  const systemPrompt = createFeedbackPrompt({
    question: question.japanese,
    userAnswer,
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
  const feedback = completion.choices[0].message?.content ?? ''
  return NextResponse.json({
    feedback,
  })
}
