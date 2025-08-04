const OPENAI_API_KEY = process.env.OPENAI_API_KEY
if (!OPENAI_API_KEY) {
  throw new Error('Missing required env: OPENAI_API_KEY')
}

export const config = {
  OPENAI_API_KEY,
} as const
