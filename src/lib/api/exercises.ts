import { paths } from '@/constants/paths'
import { Question } from '../../types/exercise'
import { api } from '../client'

export const generateQuestions = (
  topic: string,
  level: string,
  count: number,
  previousQuestions: string[],
) => {
  return api.post<{ questions: Question[] }>(paths.app.exercise.generate.path, {
    topic,
    level,
    count,
    previousQuestions,
  })
}

export const getFeedback = (question: Question, userAnswer: string) => {
  return api.post<{ feedback: string }>(paths.app.exercise.feedback.path, {
    question,
    userAnswer,
  })
}
