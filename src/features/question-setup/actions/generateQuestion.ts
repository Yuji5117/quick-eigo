'use server'

import { WORD_DECKS } from '@/constants/wordDecks'
import { openai } from '@/lib/openai'
import { createQuestionGenerationPrompt } from '@/lib/prompts'
import { getNumber, getString } from '@/utils/formData'

export type GenerateQuestionState = {
  success?: boolean
  error?: string
  questions?: { id: number; japanese: string; type: string }[]
}

export async function generateQuestionAction(
  _prevState: GenerateQuestionState,
  formData: FormData,
): Promise<GenerateQuestionState> {
  try {
    const topic = getString(formData, 'topic')
    const level = getString(formData, 'level')
    const selectedDeck = getString(formData, 'selectedDeck')
    const grammarUnit = getString(formData, 'grammarUnit')
    const questionCount = getNumber(formData, 'questionCount')

    // ユーザーデッキの場合、フロントエンドから単語リストを受け取る
    const deckWords = getString(formData, 'deckWords')
    const deckName = getString(formData, 'deckName')

    if (!topic || !level || !questionCount) {
      return { error: '必須項目が不足しています' }
    }

    // プリセットデッキの処理
    const selectedDeckData = WORD_DECKS.find(deck => deck.id === selectedDeck)

    let finalDeckWords: string[] | undefined
    let finalDeckName: string | undefined

    if (selectedDeckData && selectedDeckData.id !== 'none') {
      // プリセットデッキの場合
      finalDeckWords = selectedDeckData.cards.map(card => card.japanese).slice(0, 10)
      finalDeckName = selectedDeckData.name
    } else if (deckWords && deckName) {
      // ユーザーデッキの場合
      try {
        finalDeckWords = JSON.parse(deckWords)
        finalDeckName = deckName
      } catch (e) {
        console.error('Failed to parse deck words:', e)
      }
    }

    const systemPrompt = createQuestionGenerationPrompt({
      topic,
      level,
      grammarUnit,
      count: questionCount,
      deckName: finalDeckName,
      deckWords: finalDeckWords,
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
      return { error: '問題の解析に失敗しました' }
    }

    return {
      success: true,
      questions,
    }
  } catch (error) {
    console.error('Error generating questions:', error)
    return { error: '問題の生成中にエラーが発生しました' }
  }
}
