export const AnswerInput: React.FC = () => {
  return (
    <div>
      <textarea
        rows={4}
        placeholder="回答の英文を記入してください..."
        className="w-full rounded-lg border border-gray-200 p-4"
      />
    </div>
  )
}
