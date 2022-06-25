import { z } from 'zod'

export const Account = z.object({
  id: z.number().int(),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(64)
    .regex(/^[\wа-яё\ \-+=*%#$^@()\[\]\\\/]*$/i),
})

export type Account = z.infer<typeof Account>
