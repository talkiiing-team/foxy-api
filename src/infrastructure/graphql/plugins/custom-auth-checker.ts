import { AuthChecker, ResolverData } from 'type-graphql'
import { Context } from '@/application/interfaces/context'
import { AuthService } from '@/application/services/auth.service'
import { InvalidCredentialsError } from '@/common/errors/invalid-credentials.error'

export type CustomAuthCheckerDeps = {
  authService: AuthService
}

export const customAuthChecker =
  ({ authService }: CustomAuthCheckerDeps): AuthChecker<Context> =>
  async ({ context }: ResolverData<Context>) => {
    const { headers } = context

    console.log(headers)

    const authorization = (headers['authorization'] ?? '').split(' ')[1]

    if (!authorization) {
      return false
    }

    const authResult = await authService.getCommonUserInfoByToken(authorization)

    if (authResult instanceof InvalidCredentialsError) {
      return false
    }

    context.currentUser = authResult!

    return true
  }
