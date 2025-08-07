export const GRAMMAR_UNITS = {
  beginner: [
    {
      id: 'present-past',
      name: '現在形・過去形',
      englishName: 'Present & Past Tense',
      emoji: '⏰',
      description: '基本的な時制の使い分け',
      value: '現在形・過去形の基本的な時制、動詞の活用',
    },
    {
      id: 'be-verb',
      name: 'be動詞',
      englishName: 'Be Verb',
      emoji: '🔤',
      description: 'am/is/are/was/were',
      value: 'be動詞(am/is/are/was/were)の使い分け、基本文型',
    },
    {
      id: 'questions-negatives',
      name: '疑問文・否定文',
      englishName: 'Questions & Negatives',
      emoji: '❓',
      description: '疑問文と否定文の作り方',
      value: '疑問文・否定文の基本構造、Do/Does/Did',
    },
    {
      id: 'adjectives-adverbs',
      name: '形容詞・副詞',
      englishName: 'Adjectives & Adverbs',
      emoji: '📝',
      description: '修飾語の基本的な使い方',
      value: '形容詞・副詞の基本的な使い方、位置関係',
    },
  ],
  intermediate: [
    {
      id: 'present-perfect',
      name: '現在完了形',
      englishName: 'Present Perfect',
      emoji: '✅',
      description: '経験・完了・継続を表す',
      value: '現在完了形(have/has + 過去分詞)、経験・完了・継続の用法',
    },
    {
      id: 'passive-voice',
      name: '受動態',
      englishName: 'Passive Voice',
      emoji: '🔄',
      description: '「〜される」の表現',
      value: '受動態(be + 過去分詞)、能動態から受動態への変換',
    },
    {
      id: 'relative-clauses',
      name: '関係詞',
      englishName: 'Relative Clauses',
      emoji: '🔗',
      description: 'who/which/thatの使い方',
      value: '関係代名詞(who/which/that)、関係副詞(when/where/why)',
    },
    {
      id: 'conditionals',
      name: '条件文',
      englishName: 'Conditionals',
      emoji: '🤔',
      description: 'if文の種類と使い方',
      value: '条件文(if文)、第1・2・3条件文の使い分け',
    },
    {
      id: 'comparatives',
      name: '比較級・最上級',
      englishName: 'Comparatives & Superlatives',
      emoji: '📊',
      description: 'より〜、最も〜の表現',
      value: '比較級・最上級、as...as構文、比較表現',
    },
  ],
  advanced: [
    {
      id: 'participle-constructions',
      name: '分詞構文',
      englishName: 'Participle Constructions',
      emoji: '🔧',
      description: '分詞を使った表現',
      value: '分詞構文、現在分詞・過去分詞を使った表現',
    },
    {
      id: 'subjunctive',
      name: '仮定法',
      englishName: 'Subjunctive',
      emoji: '💭',
      description: '仮定・願望の表現',
      value: '仮定法(would/could/should)、現在・過去の仮定法',
    },
    {
      id: 'inversion',
      name: '倒置構文',
      englishName: 'Inversion',
      emoji: '🔄',
      description: '語順を変えた強調表現',
      value: '倒置構文、否定語句による倒置、強調構文',
    },
    {
      id: 'emphasis',
      name: '強調構文',
      englishName: 'Emphasis',
      emoji: '⚡',
      description: 'It is...that構文など',
      value: '強調構文(It is...that)、cleft sentences',
    },
  ],
} as const

export const ALL_GRAMMAR_UNIT = {
  id: 'all',
  name: '全般練習',
  englishName: 'All Mixed',
  emoji: '🎯',
  description: '様々な文法をミックス',
  value: '様々な文法項目をバランスよく練習',
} as const

export const getGrammarUnitsByLevel = (levelId: string) => {
  return GRAMMAR_UNITS[levelId as keyof typeof GRAMMAR_UNITS] || []
}

export const DEFAULT_GRAMMAR_UNIT = ALL_GRAMMAR_UNIT
