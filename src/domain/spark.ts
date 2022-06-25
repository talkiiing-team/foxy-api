import { z } from 'zod'
import { Profile } from '@/domain/profile'
import { SparkType } from '@/domain/enums/spark-type'

export const Spark = z.object({
  id: z.number().int(),
  initiator: Profile.shape.id,
  recipient: Profile.shape.id,
  submitted: z.boolean().default(false),
  createdAt: z.date(),
  submittedAt: z.date().optional(),
  type: z.nativeEnum(SparkType),
})

export type Spark = z.infer<typeof Spark>
