'use server'

import { openai } from '@/lib/openai'
import { createAlternativeExpressionsPrompt } from '@/lib/prompts'

export type AlternativeExpressionsResult = {
  expressions: string[]
}

export type GenerateAlternativeExpressionsState = {
  success?: boolean
  error?: string
  result?: AlternativeExpressionsResult
}

export async function generateAlternativeExpressionsAction(
  question: string,
  userAnswer: string,
  modelAnswer: string,
): Promise<GenerateAlternativeExpressionsState> {
  try {
    if (!question || !userAnswer.trim() || !modelAnswer.trim()) {
      return { error: '必要な情報が不足しています' }
    }

    const alternativePrompt = createAlternativeExpressionsPrompt({
      question,
      userAnswer,
      modelAnswer,
    })

    const alternativeCompletion = await openai.chat.completions.create({
      model: 'gpt-5-nano',
      messages: [{ role: 'system', content: alternativePrompt }],
    })

    const alternativeText = alternativeCompletion.choices[0].message?.content ?? '[]'

    try {
      const alternatives = JSON.parse(alternativeText)
      const expressions = alternatives.map((alt: { expression: string }) => alt.expression)

      return {
        success: true,
        result: { expressions },
      }
    } catch (e) {
      console.error('Failed to parse alternative expressions JSON:', e)
      return { error: '他の表現の解析に失敗しました' }
    }
  } catch (error) {
    console.error('Error generating alternative expressions:', error)
    return { error: '他の表現の生成中にエラーが発生しました' }
  }
}
