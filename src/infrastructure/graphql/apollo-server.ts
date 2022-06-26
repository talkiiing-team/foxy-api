import { ApolloServer } from 'apollo-server-express'
import { createTypeGraphqlSchema } from '@/infrastructure/graphql/type-graphql'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { AwilixContainer } from 'awilix'
import { Context } from '@/application/interfaces/context'

export const createApolloServer = async (container: AwilixContainer) => {
  const schema = await createTypeGraphqlSchema(container)

  return new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req }): Context => {
      const headers = req.headers

      return {
        headers: headers as Record<string, string>,
      } as Context
    },
  })
}
