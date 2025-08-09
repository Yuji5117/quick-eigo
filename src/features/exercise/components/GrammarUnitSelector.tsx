import { getGrammarUnitsByLevel, ALL_GRAMMAR_UNIT } from '@/constants/grammarUnits'

type GrammarUnit = {
  id: string
  name: string
  englishName: string
  emoji: string
  description: string
  value: string
}

type Props = {
  selectedLevel: { id: string }
  selectedGrammarUnit: GrammarUnit
  onGrammarUnitChange: (unit: GrammarUnit) => void
}

export const GrammarUnitSelector = ({
  selectedLevel,
  selectedGrammarUnit,
  onGrammarUnitChange,
}: Props) => {
  const grammarUnits = getGrammarUnitsByLevel(selectedLevel.id)
  const allUnits = [...grammarUnits, ALL_GRAMMAR_UNIT]

  return (
    <div className="mb-6">
      <h3 className="mb-3 text-lg font-medium">文法単元を選択</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {allUnits.map(unit => (
          <button
            key={unit.id}
            onClick={() => onGrammarUnitChange(unit)}
            className={`rounded-lg border-2 p-4 transition-all hover:scale-105 ${
              selectedGrammarUnit.id === unit.id
                ? 'border-orange-500 bg-orange-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="mb-2 text-2xl">{unit.emoji}</div>
            <div className="text-sm leading-tight font-medium text-gray-900">{unit.name}</div>
            <div className="mt-1 font-mono text-xs text-gray-500">{unit.englishName}</div>
            <div className="mt-2 text-xs leading-relaxed text-gray-600">{unit.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
