import { z } from 'zod'
import { AccountsRepository } from '@/application/interfaces/accounts.repository'
import { Account } from '@/domain/account'
import { AlreadyExistsError } from '@/common/errors/already-exists.error'
import { hashPassword } from '@/domain/password'
import { InvalidInputError } from '@/common/errors/invalid-input.error'
import { Context } from '../interfaces/context'

export type AccountsServiceDeps = {
  accountsRepository: AccountsRepository
}

const CreateAccountInput = Account.omit({
  id: true,
})

type CreateAccountInput = z.infer<typeof CreateAccountInput>

type CurrentAccountInfo = Pick<Account, 'id' | 'email'>

export class AccountsService {
  private accountsRepository: AccountsRepository

  constructor({ accountsRepository }: AccountsServiceDeps) {
    this.accountsRepository = accountsRepository
  }

  async createAccount(
    input: CreateAccountInput,
  ): Promise<
    AlreadyExistsError | InvalidInputError | Omit<Account, 'password'>
  > {
    const validated = await CreateAccountInput.safeParseAsync(input)

    if (!validated.success) {
      return InvalidInputError.ofZodError(validated.error)
    }

    const { exists } = await this.accountsRepository.checkAccountExists({
      email: validated.data.email,
    })

    if (exists) {
      return new AlreadyExistsError()
    }

    const password = await hashPassword(validated.data.password)

    return this.accountsRepository.insertAccount({
      ...input,
      password,
    })
  }

  async getCurrentAccountInfo(context: Context): Promise<CurrentAccountInfo> {
    return context.currentUser
  }
}
