import { AbstractGraphqlError } from '@/common/errors/graphql.error'
import { ObjectType } from 'type-graphql'

@ObjectType({ implements: AbstractGraphqlError })
export class InvalidCredentialsError implements AbstractGraphqlError {
  code = 'InvalidCredentialsError'
  message = 'You provided invalid credentials'
}
