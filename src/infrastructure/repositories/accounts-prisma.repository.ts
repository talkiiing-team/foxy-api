import { AccountsRepository } from '@/application/interfaces/accounts.repository'
import { Account } from '@/domain/account'
import { PrismaClient } from '@prisma/client'

export type AccountsPrismaRepositoryDeps = {
  prismaClient: PrismaClient
}

export class AccountsPrismaRepository implements AccountsRepository {
  private prismaClient: PrismaClient

  constructor({ prismaClient }: AccountsPrismaRepositoryDeps) {
    this.prismaClient = prismaClient
  }

  async getAccountByEmail(
    where: Pick<Account, 'email'>,
  ): Promise<Account | null> {
    const result = await this.prismaClient.account.findUnique({
      where,
    })

    return result
  }

  async checkAccountExists(
    account: Pick<Account, 'email'>,
  ): Promise<{ exists: boolean }> {
    const found = await this.prismaClient.account.findUnique({
      where: {
        email: account.email,
      },
    })

    return {
      exists: !!found,
    }
  }

  async insertAccount(
    account: Omit<Account, 'id'>,
  ): Promise<Omit<Account, 'password'>> {
    return this.prismaClient.account.create({
      select: {
        email: true,
        id: true,
      },
      data: account,
    })
  }

  async getCommonUserInfo(
    where: Pick<Account, 'id'>,
  ): Promise<Omit<Account, 'password'> | null> {
    const result = await this.prismaClient.account.findUnique({
      where,
      select: {
        id: true,
        email: true,
      },
    })

    return result
  }
}
