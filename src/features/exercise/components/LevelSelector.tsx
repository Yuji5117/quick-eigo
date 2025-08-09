import { LEVELS } from '@/constants/exerciseOptions'

type Level = (typeof LEVELS)[number]

type Props = {
  selectedLevel: Level
  onLevelChange: (level: Level) => void
}

export const LevelSelector = ({ selectedLevel, onLevelChange }: Props) => {
  return (
    <div className="mb-6">
      <h3 className="mb-3 text-lg font-medium">レベルを選択</h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {LEVELS.map(level => (
          <button
            key={level.id}
            onClick={() => onLevelChange(level)}
            className={`rounded-lg border-2 p-4 transition-all hover:scale-105 ${
              selectedLevel.id === level.id
                ? 'border-green-500 bg-green-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="mb-2 text-2xl">{level.emoji}</div>
            <div className="font-medium text-gray-900">{level.name}</div>
            <div className="mt-1 text-xs text-gray-600">{level.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
