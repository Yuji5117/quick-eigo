import { Spinner } from './Spinner'
import { Button } from './ui/Button'

type Props = {
  loading: boolean
  onGenerate: () => void
}

export const QuestionGenerator = ({ loading, onGenerate }: Props) => {
  return (
    <div className="flex justify-center">
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
