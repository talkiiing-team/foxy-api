import { z } from 'zod'
import { RawPassword } from '@/domain/password'

export const Account = z.object({
  id: z.number().int(),
  email: z.string().email(),
  password: RawPassword,
})

export type Account = z.infer<typeof Account>
