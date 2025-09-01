type ProgressBarProps = {
  total: number
  current: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ total, current }) => {
  const percentage = (current / total) * 100

  return (
    <div>
      <p className="pb-2 text-center">
        {current} / {total}
      </p>
      <div className="border-secondary h-3 w-full overflow-hidden rounded-full border">
        <div className="bg-primary h-full rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}
