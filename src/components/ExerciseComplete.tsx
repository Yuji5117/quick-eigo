import { Button } from '@/components'

type Props = {
  totalQuestions: number
  onRestart: () => void
}

export const ExerciseComplete = ({ totalQuestions, onRestart }: Props) => {
  const encouragementMessages = [
    'よくできました！',
    'お疲れ様でした！',
    '素晴らしい頑張りです！',
    '完璧な取り組みでした！',
    'とても良い調子です！',
  ]

  const randomMessage =
    encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]

  return (
    <div className="flex flex-col items-center space-y-6 p-8 text-center">
      <div className="text-6xl">🎉</div>
      <h2 className="text-2xl font-bold text-green-600">{randomMessage}</h2>
      <p className="text-lg text-gray-700">{totalQuestions}問の問題をすべて完了しました。</p>
      <Button onClick={onRestart} className="bg-blue-600 px-8 py-3 text-lg hover:bg-blue-700">
        新しい問題を始める
      </Button>
    </div>
  )
}
