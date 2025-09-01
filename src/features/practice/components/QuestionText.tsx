type QuestionTextProps = {
  text: string
}

export const QuestionText: React.FC<QuestionTextProps> = ({ text }) => {
  return (
    <div className="rounded-lg bg-gray-100 p-3">
      <p className="text-center font-semibold">{text}</p>
    </div>
  )
}
