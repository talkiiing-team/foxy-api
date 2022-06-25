import { Account } from '@/domain/account'
import { Profile } from '@/domain/profile'

export type Context = {
  currentUser: {
    profileId: Profile['id']
  } & Omit<Account, 'password'>
}
