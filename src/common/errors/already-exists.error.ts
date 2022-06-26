import { AbstractGraphqlError } from '@/common/errors/graphql.error'
import { ObjectType } from 'type-graphql'

@ObjectType({ implements: AbstractGraphqlError })
export class AlreadyExistsError implements AbstractGraphqlError {
  code = 'AlreadyExists'
  message = 'Given record already exists'
}
