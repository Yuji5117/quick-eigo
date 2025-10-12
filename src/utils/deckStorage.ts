import { storageUtils } from './storage'

import type { DeckCard, WordDeck } from '@/types/deck'

const STORAGE_KEY = 'quick-eigo-user-decks'

type UserDeckData = {
  decks: WordDeck[]
  lastUpdated: string
}

const getUserDeckData = (): UserDeckData | null => {
  return storageUtils.get<UserDeckData>(STORAGE_KEY)
}

const saveUserDeckData = (deckData: UserDeckData): boolean => {
  return storageUtils.set(STORAGE_KEY, deckData)
}

export const deckStorage = {
  getAllDecks(): WordDeck[] {
    const data = getUserDeckData()
    return data?.decks || []
  },

  getDeck(deckId: string): WordDeck | null {
    const decks = this.getAllDecks()
    return decks.find(deck => deck.id === deckId) || null
  },

  createDeck(name: string, description: string = ''): WordDeck {
    const newDeck: WordDeck = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      cardCount: 0,
      cards: [],
    }

    const existingData = getUserDeckData()
    const deckData: UserDeckData = {
      decks: existingData ? [...existingData.decks, newDeck] : [newDeck],
      lastUpdated: new Date().toISOString(),
    }

    saveUserDeckData(deckData)
    return newDeck
  },

  updateDeck(deckId: string, updates: Partial<Omit<WordDeck, 'id'>>): boolean {
    const data = getUserDeckData()
    if (!data) return false

    const deckIndex = data.decks.findIndex(deck => deck.id === deckId)
    if (deckIndex === -1) return false

    data.decks[deckIndex] = {
      ...data.decks[deckIndex],
      ...updates,
    }

    data.lastUpdated = new Date().toISOString()
    return saveUserDeckData(data)
  },

  deleteDeck(deckId: string): boolean {
    const data = getUserDeckData()
    if (!data) return false

    const filteredDecks = data.decks.filter(deck => deck.id !== deckId)
    if (filteredDecks.length === data.decks.length) return false

    const updatedData: UserDeckData = {
      decks: filteredDecks,
      lastUpdated: new Date().toISOString(),
    }

    return saveUserDeckData(updatedData)
  },

  addCardToDeck(
    deckId: string,
    japanese: string,
    english: string,
    tags?: string[],
  ): DeckCard | null {
    const data = getUserDeckData()
    if (!data) return null

    const deckIndex = data.decks.findIndex(deck => deck.id === deckId)
    if (deckIndex === -1) return null

    const newCard: DeckCard = {
      id: Date.now().toString(),
      japanese: japanese.trim(),
      english: english.trim(),
      tags,
    }

    data.decks[deckIndex].cards.push(newCard)
    data.decks[deckIndex].cardCount = data.decks[deckIndex].cards.length
    data.lastUpdated = new Date().toISOString()

    const success = saveUserDeckData(data)
    return success ? newCard : null
  },

  removeCardFromDeck(deckId: string, cardId: string): boolean {
    const data = getUserDeckData()
    if (!data) return false

    const deckIndex = data.decks.findIndex(deck => deck.id === deckId)
    if (deckIndex === -1) return false

    const deck = data.decks[deckIndex]
    const filteredCards = deck.cards.filter(card => card.id !== cardId)

    if (filteredCards.length === deck.cards.length) return false

    data.decks[deckIndex].cards = filteredCards
    data.decks[deckIndex].cardCount = filteredCards.length
    data.lastUpdated = new Date().toISOString()

    return saveUserDeckData(data)
  },

  updateCard(deckId: string, cardId: string, updates: Partial<Omit<DeckCard, 'id'>>): boolean {
    const data = getUserDeckData()
    if (!data) return false

    const deckIndex = data.decks.findIndex(deck => deck.id === deckId)
    if (deckIndex === -1) return false

    const cardIndex = data.decks[deckIndex].cards.findIndex(card => card.id === cardId)
    if (cardIndex === -1) return false

    data.decks[deckIndex].cards[cardIndex] = {
      ...data.decks[deckIndex].cards[cardIndex],
      ...updates,
    }

    data.lastUpdated = new Date().toISOString()
    return saveUserDeckData(data)
  },

  clearAll(): boolean {
    storageUtils.remove(STORAGE_KEY)
    return true
  },

  exists(deckId: string): boolean {
    return this.getDeck(deckId) !== null
  },
}
