import { Button, Spinner, QuestionCountSelector } from '@/components'

type Props = {
  loading: boolean
  questionCount: number
  onQuestionCountChange: (count: number) => void
  onGenerate: () => void
}

export const QuestionGenerator = ({
  loading,
  questionCount,
  onQuestionCountChange,
  onGenerate,
}: Props) => {
  return (
    <div className="flex flex-col items-center">
      <QuestionCountSelector value={questionCount} onChange={onQuestionCountChange} />
      {loading ? (
        <Spinner />
      ) : (
        <Button onClick={onGenerate} className="bg-blue-600">
          問題を生成する
        </Button>
      )}
    </div>
  )
}
