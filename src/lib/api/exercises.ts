import { paths } from '@/constants/paths'
import { Question } from '@/types'

import { api } from '../client'

export const generateQuestions = (
  topic: string,
  level: string,
  count: number,
  previousQuestions: string[],
) => {
  return api.post<{ questions: Question[] }>(paths.app.exercises.generate.path, {
    topic,
    level,
    count,
    previousQuestions,
  })
}

export const getFeedback = (question: Question, userAnswer: string) => {
  return api.post<{ feedback: string }>(paths.app.exercises.feedback.path, {
    question,
    userAnswer,
  })
}
