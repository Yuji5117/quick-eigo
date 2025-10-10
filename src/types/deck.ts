export type WordDeck = {
  id: string
  name: string
  description: string
  cardCount: number
  cards: DeckCard[]
}

export type DeckCard = {
  id: string
  japanese: string
  english: string
  tags?: string[]
  frequency?: number
}
