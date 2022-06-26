import { asClass, asFunction, asValue, createContainer, Lifetime } from 'awilix'
import { AppContainer } from '@/infrastructure/deps'
import { AccountsResolver } from '@/infrastructure/graphql/resolvers/accounts.resolver'
import { AccountsService } from '@/application/services/accounts.service'
import { AccountsPrismaRepository } from './repositories/accounts-prisma.repository'
import { PrismaClient } from '@prisma/client'
import { AuthService } from '@/application/services/auth.service'
import { AuthResolver } from './graphql/resolvers/auth.resolver'
import { customAuthChecker } from '@/infrastructure/graphql/plugins/custom-auth-checker'

export const appContainer = createContainer<AppContainer>().register({
  accountsRepository: asClass(AccountsPrismaRepository).setLifetime(
    Lifetime.SINGLETON,
  ),
  accountsService: asClass(AccountsService).setLifetime(Lifetime.SINGLETON),
  accountsResolver: asClass(AccountsResolver).setLifetime(Lifetime.SINGLETON),

  authService: asClass(AuthService).setLifetime(Lifetime.SINGLETON),
  authResolver: asClass(AuthResolver).setLifetime(Lifetime.SINGLETON),

  customAuthChecker: asFunction(customAuthChecker as any),

  prismaClient: asValue(new PrismaClient()),

  jwtTokenSecret: asValue(
    process.env.JWT_TOKEN_SECRET ?? 'example_token_secret',
  ),
})
