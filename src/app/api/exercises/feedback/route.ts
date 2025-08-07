import { openai } from '@/lib/openai'
import { createFeedbackPrompt } from '@/lib/prompts'
import { StructuredFeedback } from '@/types'
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

  const content = completion.choices[0].message?.content ?? '{}'
  let feedback: StructuredFeedback = {
    modelAnswer: '',
    advice: '',
  }

  try {
    feedback = JSON.parse(content)
  } catch (e) {
    console.error('Failed to parse feedback JSON:', e)
    feedback = {
      modelAnswer: '',
      advice: content,
    }
  }

  return NextResponse.json({ feedback })
}
