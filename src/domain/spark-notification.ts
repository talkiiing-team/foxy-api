import { Spark } from '@/domain/spark'
import { Profile } from '@/domain/profile'
import { z } from 'zod'

const NotificationProfile = Profile.pick({
  age: true,
  name: true,
})

export type SparkNotification = {
  id: number
  sparkId: Spark['id']
  profile: z.infer<typeof NotificationProfile>
  isRead: boolean
}
