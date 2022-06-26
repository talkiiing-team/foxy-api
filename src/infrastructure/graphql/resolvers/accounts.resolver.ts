import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { AccountsService } from '@/application/services/accounts.service'
import {
  CreateAccountInput,
  CreateAccountResult,
  SafeAccount,
} from '@/infrastructure/graphql/dto/accounts.dto'
import { Context } from '@/application/interfaces/context'

export type AccountsResolverDeps = {
  accountsService: AccountsService
}

@Resolver()
export class AccountsResolver {
  private accountsService: AccountsService

  constructor({ accountsService }: AccountsResolverDeps) {
    this.accountsService = accountsService
  }

  @Mutation(() => CreateAccountResult)
  async createAccount(
    @Arg('input') account: CreateAccountInput,
  ): Promise<CreateAccountResult> {
    return this.accountsService.createAccount(account)
  }

  @Authorized()
  @Query(() => SafeAccount)
  async getOverallData(@Ctx() context: Context) {
    return this.accountsService.getCurrentAccountInfo(context)
  }
}
