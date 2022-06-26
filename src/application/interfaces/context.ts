import { Account } from '@/domain/account'

export type Context = {
  currentUser: Omit<Account, 'password'>

  headers: Record<string, string>
}
