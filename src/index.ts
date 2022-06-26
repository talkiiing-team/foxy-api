import 'reflect-metadata'
import { appContainer } from '@/infrastructure/container'
import { createExpressApp } from '@/infrastructure/express/app'
;(async () => {
  // TODO: wrap in fastify for REST manipulations
  // like image uploading
  const app = await createExpressApp(appContainer)

  app.listen(3030, () => {
    console.log('Listening on | http://localhost:3030')
    console.log('     Graphql | http://localhost:3030/gql')
  })
})()
