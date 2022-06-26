import { Account } from '@/domain/account'

export interface AccountsRepository {
  checkAccountExists(account: Pick<Account, 'email'>): Promise<{
    exists: boolean
  }>
  insertAccount(
    account: Omit<Account, 'id'>,
  ): Promise<Omit<Account, 'password'>>
  getAccountByEmail(account: Pick<Account, 'email'>): Promise<Account | null>
  getCommonUserInfo(
    account: Pick<Account, 'id'>,
  ): Promise<Omit<Account, 'password'> | null>
}
