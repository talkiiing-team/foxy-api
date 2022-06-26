import { buildSchema, ResolverData } from 'type-graphql'
import { AccountsResolver } from '@/infrastructure/graphql/resolvers/accounts.resolver'
import { asClass, AwilixContainer, Lifetime } from 'awilix'
import { RecipesResolver } from '@/infrastructure/graphql/resolvers/profiles.resolver'
import { AuthResolver } from './resolvers/auth.resolver'

export const createTypeGraphqlSchema = async (container: AwilixContainer) => {
  return buildSchema({
    resolvers: [AccountsResolver, RecipesResolver, AuthResolver],
    authChecker: container.cradle.customAuthChecker,
    container: {
      get(constructor) {
        const resolver = asClass(constructor).setLifetime(Lifetime.SINGLETON)
        return container.build(resolver)
      },
    },
  })
}
