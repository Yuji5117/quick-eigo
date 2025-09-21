import { AnswerInput, PracticeFeedback, ProgressBar, QuestionText } from '@/features/practice/'

import { Button } from '@/components/ui'

export default function PracticePlay() {
  return (
    <div className="flex flex-col gap-y-8 p-6">
      <ProgressBar total={10} current={3} />
      <QuestionText text="日本語の問題" />
      <AnswerInput />
      <PracticeFeedback />
      <Button variant="primary">添削を依頼</Button>
      <Button variant="secondary">スキップする</Button>
    </div>
  )
}
