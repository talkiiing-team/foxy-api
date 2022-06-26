import express from 'express'
import { AwilixContainer } from 'awilix'
import { createApolloServer } from '@/infrastructure/graphql/apollo-server'

export const createExpressApp = async (container: AwilixContainer) => {
  const app = express()

  const apolloServer = await createApolloServer(container)

  await apolloServer.start()

  apolloServer.applyMiddleware({
    app,
    path: '/gql',
  })

  return app
}
