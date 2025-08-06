'use client'

import { ExercisePlayer } from '@/components'

export default function Home() {
  return (
    <div>
      <main>
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
          <ExercisePlayer />
        </div>
      </main>
      <footer></footer>
    </div>
  )
}
