export type WordDeck = {
  id: string
  name: string
  description: string
  emoji: string
  cardCount: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  cards: DeckCard[]
}

export type DeckCard = {
  id: string
  japanese: string
  english: string
  tags?: string[]
  frequency?: number
}
