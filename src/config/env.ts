import z from 'zod'

const EnvSchema = z.object({
  OPENAI_API_KEY: z.string().min(1, 'OPENAI_API_KEY is required'),
})

export const env = EnvSchema.parse(process.env)
