import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido. Use o formato: exemplo@email.com")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(100, "A senha deve ter no máximo 100 caracteres"),
})

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .trim()
    .refine((name) => name.split(" ").length >= 2, {
      message: "Por favor, informe seu nome completo",
    }),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido. Use o formato: exemplo@email.com")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(100, "A senha deve ter no máximo 100 caracteres")
    .refine((password) => /[A-Za-z]/.test(password) && /[0-9]/.test(password), {
      message: "A senha deve conter letras e números",
    }),
})

export type LoginInput = z.infer<typeof loginSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
