export const paths = {
  app: {
    exercises: {
      generate: {
        path: '/api/exercises/generate',
      },
      feedback: {
        path: '/api/exercises/feedback',
      },
      alternatives: {
        path: '/api/exercises/alternatives',
      },
    },
  },
  pages: {
    home: '/',
    practice: {
      play: '/practice/play',
      summary: '/practice/summary',
    },
  },
} as const
