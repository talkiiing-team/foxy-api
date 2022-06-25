import { Profile } from '@/domain/profile'
import { z } from 'zod'

const Card = Profile.omit({
  contacts: true,
})

export type Card = z.infer<typeof Card>
