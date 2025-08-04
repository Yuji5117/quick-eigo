'use client'

import { useState } from 'react'

const sentences = [
  '私は昨日図書館に行きました。',
  '彼は毎朝ジョギングをします。',
  '彼女は英語を勉強しています。',
]

const answers = [
  'I went to the library yesterday.',
  'He goes jogging every morning.',
  'She is studying English.',
]

export default function Home() {
  const [idx, setIdx] = useState(0)
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)

  const checkAnswer = () => {
    if (input.trim() === answers[idx]) {
      setFeedback('✅ 正解です！')
    } else {
      setFeedback(`❌ 不正解です。正解例: "${answers[idx]}"`)
    }
  }

  const next = () => {
    setIdx(prev => (prev + 1) % sentences.length)
    setInput('')
    setFeedback(null)
  }

  return (
    <div>
      <main>
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
            <h1 className="mb-6 text-center text-2xl font-bold">瞬間英作文練習</h1>
            <p className="mb-4 text-gray-800">{sentences[idx]}</p>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="英語で入力..."
              className="mb-4 w-full rounded border px-3 py-2 focus:ring focus:outline-none"
            />
            <button
              onClick={checkAnswer}
              className="mb-4 w-full rounded bg-blue-500 py-2 text-white transition hover:bg-blue-600"
            >
              判定する
            </button>
            {feedback && <div className="mb-4 text-center text-sm">{feedback}</div>}
            <div className="flex items-center justify-between">
              <button onClick={next} className="text-blue-500 hover:underline">
                次へ
              </button>
              <div className="text-sm">
                {idx + 1} / {sentences.length}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  )
}
