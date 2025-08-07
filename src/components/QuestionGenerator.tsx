import {
  Button,
  Spinner,
  QuestionCountSelector,
  TopicSelector,
  LevelSelector,
  GrammarUnitSelector,
} from '@/components'
import { TOPICS, LEVELS } from '@/constants/exerciseOptions'

type Topic = (typeof TOPICS)[number]
type Level = (typeof LEVELS)[number]
type GrammarUnit = {
  id: string
  name: string
  englishName: string
  emoji: string
  description: string
  value: string
}

type Props = {
  loading: boolean
  questionCount: number
  selectedTopic: Topic
  selectedLevel: Level
  selectedGrammarUnit: GrammarUnit
  onQuestionCountChange: (count: number) => void
  onTopicChange: (topic: Topic) => void
  onLevelChange: (level: Level) => void
  onGrammarUnitChange: (unit: GrammarUnit) => void
  onGenerate: () => void
}

export const QuestionGenerator = ({
  loading,
  questionCount,
  selectedTopic,
  selectedLevel,
  selectedGrammarUnit,
  onQuestionCountChange,
  onTopicChange,
  onLevelChange,
  onGrammarUnitChange,
  onGenerate,
}: Props) => {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <TopicSelector selectedTopic={selectedTopic} onTopicChange={onTopicChange} />
      <LevelSelector selectedLevel={selectedLevel} onLevelChange={onLevelChange} />
      <GrammarUnitSelector
        selectedLevel={selectedLevel}
        selectedGrammarUnit={selectedGrammarUnit}
        onGrammarUnitChange={onGrammarUnitChange}
      />
      <QuestionCountSelector value={questionCount} onChange={onQuestionCountChange} />
      <div className="mt-6 flex justify-center">
        {loading ? (
          <Spinner />
        ) : (
          <Button onClick={onGenerate} className="bg-blue-600 px-8 py-3 text-lg">
            問題を生成する
          </Button>
        )}
      </div>
    </div>
  )
}
