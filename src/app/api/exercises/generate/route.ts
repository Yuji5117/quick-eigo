// app/api/exercises/generate/route.ts
import { openai } from '@/lib/openai'
import { createExerciseGenerationPrompt } from '@/lib/prompts'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { topic, level, grammarUnit, count, previousQuestions } = await req.json()

  const systemPrompt = createExerciseGenerationPrompt({ topic, level, grammarUnit, count })

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
