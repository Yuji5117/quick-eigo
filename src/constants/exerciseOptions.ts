export const TOPICS = [
  {
    id: 'daily-conversation',
    name: '日常会話',
    description: 'ネイティブ表現',
    emoji: '💬',
    value: '日常会話、ネイティブ表現',
  },
  {
    id: 'business',
    name: 'ビジネス',
    description: '会議・メール・プレゼン',
    emoji: '💼',
    value: 'ビジネス英語、会議、メール、プレゼンテーション',
  },
  {
    id: 'travel',
    name: '旅行',
    description: '空港・ホテル・観光',
    emoji: '✈️',
    value: '旅行英語、空港、ホテル、観光、レストラン',
  },
  {
    id: 'academic',
    name: 'アカデミック',
    description: '論文・研究・学術',
    emoji: '📚',
    value: 'アカデミック英語、論文、研究、学術表現',
  },
] as const

export const LEVELS = [
  {
    id: 'beginner',
    name: '初級',
    description: 'TOEIC 400-500',
    emoji: '🌱',
    value: 'TOEIC400-500点レベル、初級者向け',
  },
  {
    id: 'intermediate',
    name: '中級',
    description: 'TOEIC 600-700',
    emoji: '🌿',
    value: 'TOEIC600-700点レベル、中級者向け',
  },
  {
    id: 'advanced',
    name: '上級',
    description: 'TOEIC 800+',
    emoji: '🌳',
    value: 'TOEIC800点以上レベル、上級者向け',
  },
] as const

export const DEFAULT_TOPIC = TOPICS[0]
export const DEFAULT_LEVEL = LEVELS[1]
