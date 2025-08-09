import { TOPICS } from '@/constants/exerciseOptions'

type Topic = (typeof TOPICS)[number]

type Props = {
  selectedTopic: Topic
  onTopicChange: (topic: Topic) => void
}

export const TopicSelector = ({ selectedTopic, onTopicChange }: Props) => {
  return (
    <div className="mb-6">
      <h3 className="mb-3 text-lg font-medium">トピックを選択</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {TOPICS.map(topic => (
          <button
            key={topic.id}
            onClick={() => onTopicChange(topic)}
            className={`rounded-lg border-2 p-4 transition-all hover:scale-105 ${
              selectedTopic.id === topic.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="mb-2 text-2xl">{topic.emoji}</div>
            <div className="font-medium text-gray-900">{topic.name}</div>
            <div className="mt-1 text-xs text-gray-600">{topic.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
