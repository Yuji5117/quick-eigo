'use client'

import { useState } from 'react'

export const PracticeFeedback: React.FC = () => {
  const [showOtherExpression, setShowOtherExpression] = useState<boolean>(false)

  return (
    <div className="bg-secondary flex flex-col gap-y-5 rounded-lg p-4">
      <div className="flex flex-col gap-y-3">
        <h3 className="text-lg font-semibold">あなたの解答</h3>
        <p className="border-l-primary rounded-lg border-l-6 bg-white p-3 text-lg">
          Where did you buy the book?
        </p>
      </div>
      <div className="flex flex-col gap-y-3">
        <h3 className="text-lg font-semibold">模範解答</h3>
        <p className="border-l-primary rounded-lg border-l-6 bg-white p-3 text-lg">
          Where did you buy this book?
        </p>
      </div>
      <div className="flex flex-col gap-y-3">
        <h3 className="text-lg font-semibold">アドバイス</h3>
        <p className="rounded-lg bg-white p-3 text-lg">
          全文が英文として成立していません。Where did you buy this book?
          という形になるべきです。また、「Where」は「どこで」という場所を問うための疑問詞なので、「Where」から始めることを覚えてください。
        </p>
      </div>
      <div className="flex justify-center pt-2">
        <button
          onClick={() => setShowOtherExpression(prev => !prev)}
          className="bg-primary text-md w-fit rounded-full px-4 py-2 text-white"
        >
          {showOtherExpression ? '他の表現を隠す' : '他の表現を見る'}
        </button>
      </div>
      {showOtherExpression && (
        <div className="flex flex-col gap-y-3">
          <h3 className="text-lg font-semibold">他の表現</h3>
          <p className="rounded-lg bg-white px-4 py-3 text-lg">Where did you get this book?</p>
          <p className="rounded-lg bg-white px-4 py-3 text-lg">Where did you get this book?</p>
        </div>
      )}
    </div>
  )
}
