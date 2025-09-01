type QuestionTextProps = {
  text: string
}

export const QuestionText: React.FC<QuestionTextProps> = ({ text }) => {
  return (
    <div className="rounded-lg bg-gray-100 px-3 py-6">
      <p className="text-center text-lg font-semibold">{text}</p>
    </div>
  )
}
