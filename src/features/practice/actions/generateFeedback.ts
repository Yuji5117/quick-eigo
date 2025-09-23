'use server'

import { openai } from '@/lib/openai'
import { createFeedbackPrompt } from '@/lib/prompts'

export type FeedbackResult = {
  modelAnswer: string
  advice: string
}

export type GenerateFeedbackState = {
  success?: boolean
  error?: string
  feedback?: FeedbackResult
}

export async function generateFeedbackAction(
  question: string,
  userAnswer: string,
): Promise<GenerateFeedbackState> {
  try {
    if (!question || !userAnswer.trim()) {
      return { error: '質問と回答が必要です' }
    }

    const feedbackPrompt = createFeedbackPrompt({
      question,
      userAnswer,
    })

    const feedbackCompletion = await openai.chat.completions.create({
      model: 'gpt-5-nano',
      messages: [{ role: 'system', content: feedbackPrompt }],
    })

    const feedbackText = feedbackCompletion.choices[0].message?.content ?? '{}'
    let feedbackData: { modelAnswer: string; advice: string }

    try {
      feedbackData = JSON.parse(feedbackText)
    } catch (e) {
      console.error('Failed to parse feedback JSON:', e)
      return { error: 'フィードバックの解析に失敗しました' }
    }

    const feedback: FeedbackResult = {
      modelAnswer: feedbackData.modelAnswer,
      advice: feedbackData.advice,
    }

    return {
      success: true,
      feedback,
    }
  } catch (error) {
    console.error('Error generating feedback:', error)
    return { error: 'フィードバックの生成中にエラーが発生しました' }
  }
}
