'use client'

import { ExercisePlayer } from '@/features/exercise'

export default function Home() {
  return (
    <div>
      <main className="px-4 py-8">
        <ExercisePlayer />
      </main>
      <footer></footer>
    </div>
  )
}
