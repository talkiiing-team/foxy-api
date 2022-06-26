import { AbstractGraphqlError } from '@/common/errors/graphql.error'
import { ObjectType } from 'type-graphql'

@ObjectType({ implements: AbstractGraphqlError })
export class NotFoundError implements AbstractGraphqlError {
  code = 'NotFound'
  message = 'Given record not found'
}
