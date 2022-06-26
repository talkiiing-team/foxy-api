import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { AuthService } from '@/application/services/auth.service'
import { AuthorizeByPasswordInput, AuthorizeResult } from '../dto/auth.dto'
import { SafeAccount } from '@/infrastructure/graphql/dto/accounts.dto'
import { Context } from '@/application/interfaces/context'

export type AuthResolverDeps = {
  authService: AuthService
}

@Resolver()
export class AuthResolver {
  private authService: AuthService

  constructor({ authService }: AuthResolverDeps) {
    this.authService = authService
  }

  @Mutation(() => AuthorizeResult)
  async authorizeByPassword(
    @Arg('input') credentials: AuthorizeByPasswordInput,
  ): Promise<AuthorizeResult> {
    return this.authService.byPassword(credentials)
  }
}
