'use server'

import { redirect } from 'next/navigation'

import { openai } from '@/lib/openai'
import { createQuestionGenerationPrompt } from '@/lib/prompts'
import { getNumber, getString } from '@/utils/formData'

export async function generateQuestionAction(formData: FormData) {
  const topic = getString(formData, 'topic')
  const level = getString(formData, 'level')
  const grammarUnit = getString(formData, 'grammarUnit')
  const questionCount = getNumber(formData, 'questionCount')

  if (!topic || !level || !grammarUnit || !questionCount) {
    throw new Error('必須項目が不足しています')
  }

  const systemPrompt = createQuestionGenerationPrompt({
    topic,
    level,
    grammarUnit,
    count: questionCount,
  })

  const completion = await openai.chat.completions.create({
    model: 'gpt-5-nano',
    messages: [{ role: 'system', content: systemPrompt }],
  })

  const text = completion.choices[0].message?.content ?? '[]'
  let questions: { id: number; japanese: string; type: string }[] = []
  try {
    questions = JSON.parse(text)
    console.log('Generated questions:', questions)
  } catch (e) {
    console.error('Failed to parse questions JSON:', e)
    throw new Error('問題の解析に失敗しました')
  }

  // 生成された問題をセッションストレージやクッキーに保存
  // TODO: 問題データの永続化実装（cookies、session、database等）

  redirect('/practice/play')
}
