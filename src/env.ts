import z from 'zod'

const envSchema = z.object({
  DATABASEURL: z.string().url(),
})

//valida de dentro do process.env segue o formato do schema
export const env = envSchema.parse(process.env)
