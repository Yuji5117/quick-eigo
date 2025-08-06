import { Button, Spinner, QuestionCountSelector, TopicSelector, LevelSelector } from '@/components'
import { TOPICS, LEVELS } from '@/constants/exerciseOptions'

type Topic = (typeof TOPICS)[number]
type Level = (typeof LEVELS)[number]

type Props = {
  loading: boolean
  questionCount: number
  selectedTopic: Topic
  selectedLevel: Level
  onQuestionCountChange: (count: number) => void
  onTopicChange: (topic: Topic) => void
  onLevelChange: (level: Level) => void
  onGenerate: () => void
}

export const QuestionGenerator = ({
  loading,
  questionCount,
  selectedTopic,
  selectedLevel,
  onQuestionCountChange,
  onTopicChange,
  onLevelChange,
  onGenerate,
}: Props) => {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <TopicSelector selectedTopic={selectedTopic} onTopicChange={onTopicChange} />
      <LevelSelector selectedLevel={selectedLevel} onLevelChange={onLevelChange} />
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
