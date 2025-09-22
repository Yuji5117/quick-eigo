'use client'

import { QuestionSetupForm } from '@/features/question-setup'

export default function Home() {
  return (
    <div>
      <main className="px-4 py-8">
        <QuestionSetupForm />
      </main>
      <footer></footer>
    </div>
  )
}
