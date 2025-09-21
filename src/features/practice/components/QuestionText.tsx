type QuestionTextProps = {
  text: string
}

export const QuestionText: React.FC<QuestionTextProps> = ({ text }) => {
  return (
    <div className="bg-secondary rounded-lg px-3 py-6">
      <p className="text-center text-lg font-semibold text-gray-800">{text}</p>
    </div>
  )
}
