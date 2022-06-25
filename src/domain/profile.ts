import { z } from 'zod'
import { latinAndCyrillic } from '@/common/regex'
import { Sex } from '@/domain/enums/sex'
import { LookingFor } from '@/domain/enums/looking-for'
import { MaritalStatus } from '@/domain/enums/marital-status'
import { Frequency } from '@/domain/enums/frequency'
import { Personality } from '@/domain/enums/personality'
import { Interests } from '@/domain/enums/interests'
import { Account } from '@/domain/account'

const Age = z.number().int().min(18).max(80)

export const Profile = z.object({
  id: z.number().int(),
  accountId: Account.shape.id,

  name: z.string().regex(latinAndCyrillic),

  age: Age,
  searchAgeBoundaries: z.tuple([Age, Age]).optional(),

  sex: z.nativeEnum(Sex),
  height: z
    .number()
    .min(25, 'you so small lol')
    .max(250, 'you so big lol')
    .optional(),
  weight: z.number().min(25).max(500).optional(),
  lookingFor: z.nativeEnum(LookingFor).default(LookingFor.Love).optional(),
  maritalStatus: z.nativeEnum(MaritalStatus).optional(),
  smoking: z.nativeEnum(Frequency).optional(),
  alcohol: z.nativeEnum(Frequency).optional(),
  personality: z.nativeEnum(Personality).optional(),
  about: z.string().max(300).optional(),
  interests: z.array(z.nativeEnum(Interests)).min(3).max(10),

  work: z
    .object({
      place: z.string().max(50).optional(),
      position: z.string().max(25),
    })
    .optional(),
  graduate: z
    .object({
      place: z.string().max(50).optional(),
      speciality: z.string().max(25),
    })
    .optional(),

  contacts: z
    .object({
      instagram: z.string(),
      telegram: z.string(),
      twitter: z.string(),
      vk: z.string(),
    })
    .partial()
    .refine(obj => Object.keys(obj).length > 0),
})

export type Profile = z.infer<typeof Profile>

export const DEFAULT_AGE_DELTA = 3
