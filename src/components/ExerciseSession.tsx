import { StructuredFeedback } from '@/types'
import { FeedbackDisplay } from './FeedbackDisplay'
import { Button, Spinner } from '@/components'

type Question = {
  id: number
  japanese: string
  type: 'affirmative' | 'interrogative'
}

type Props = {
  question: {
    data: Question
    number: number
    total: number
  }
  answer: {
    value: string
    onChange: (value: string) => void
  }
  feedback: {
    value: StructuredFeedback | null
    isLoading: boolean
  }
  actions: {
    onSendAnswer: () => void
    onNextQuestion: () => void
  }
}

export const ExerciseSession = ({ question, answer, feedback, actions }: Props) => {
  return (
    <div className="mx-auto max-w-md space-y-4">
      <div className="text-gray-800">
        <strong>
          {question.number}/{question.total}
        </strong>{' '}
        {question.data.japanese}
      </div>
      <input
        type="text"
        value={answer.value}
        onChange={e => answer.onChange(e.target.value)}
        className="w-full rounded border px-3 py-2"
        placeholder="英語で入力…"
      />
      <div className="flex space-x-2">
        <Button
          onClick={actions.onSendAnswer}
          className="flex-1 bg-green-500"
          disabled={feedback.isLoading}
        >
          {feedback.isLoading ? <Spinner /> : '添削を依頼'}
        </Button>
        <Button onClick={actions.onNextQuestion} className="flex-1 bg-gray-200 text-black">
          次へ
        </Button>
      </div>
      {feedback.value && (
        <div className="mt-4">
          <FeedbackDisplay
            feedback={feedback.value}
            question={question.data}
            userAnswer={answer.value}
          />
        </div>
      )}
    </div>
  )
}
