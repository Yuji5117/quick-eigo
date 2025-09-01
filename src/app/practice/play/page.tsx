import { AnswerInput, QuestionText } from '@/features/practice/'

export default function PracticePlay() {
  return (
    <div className="flex flex-col gap-y-8 p-6">
      <QuestionText text="日本語の問題" />
      <AnswerInput />
    </div>
  )
}
