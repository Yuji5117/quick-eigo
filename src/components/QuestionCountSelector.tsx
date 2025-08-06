type QuestionCountSelectorProps = {
  value: number
  onChange: (count: number) => void
}

export const QuestionCountSelector = ({ value, onChange }: QuestionCountSelectorProps) => {
  const options = [1, 3, 5, 7, 10]

  return (
    <div className="mb-4 flex flex-col items-center">
      <label htmlFor="question-count" className="mb-2 text-sm font-medium">
        問題数を選択
      </label>
      <select
        id="question-count"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {options.map(count => (
          <option key={count} value={count}>
            {count}問
          </option>
        ))}
      </select>
    </div>
  )
}
