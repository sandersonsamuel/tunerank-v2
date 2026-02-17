import { z } from "zod"

export const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string("Senha inválida").min(8, "Senha deve ter pelo menos 8 caracteres"),
})

export type LoginSchemaType = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  username: z.string("Nome inválido").min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.email("Email inválido"),
  password: z.string("Senha inválida").min(8, "Senha deve ter pelo menos 8 caracteres"),
})

export type RegisterSchemaType = z.infer<typeof registerSchema>
