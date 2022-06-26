import { AccountsServiceDeps } from '@/application/services/accounts.service'
import { AuthServiceDeps } from '@/application/services/auth.service'
import {
  AccountsResolver,
  AccountsResolverDeps,
} from '@/infrastructure/graphql/resolvers/accounts.resolver'
import {
  AuthResolver,
  AuthResolverDeps,
} from './graphql/resolvers/auth.resolver'
import { AccountsPrismaRepositoryDeps } from './repositories/accounts-prisma.repository'
import { AuthChecker } from 'type-graphql'

export type AppContainer = AccountsServiceDeps &
  AccountsResolverDeps &
  AccountsPrismaRepositoryDeps &
  AuthServiceDeps &
  AuthResolverDeps & {
    accountsResolver: AccountsResolver
    authResolver: AuthResolver
    customAuthChecker: AuthChecker
  }
