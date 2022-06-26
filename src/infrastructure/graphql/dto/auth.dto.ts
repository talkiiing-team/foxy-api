import { createUnionType, Field, ID, InputType, ObjectType } from 'type-graphql'
import { InvalidInputError } from '@/common/errors/invalid-input.error'
import { InvalidCredentialsError } from '@/common/errors/invalid-credentials.error'

@InputType()
export class AuthorizeByPasswordInput {
  @Field(() => String)
  email!: string

  @Field(() => String)
  password!: string
}

@ObjectType()
export class TokenPayloadAccount {
  @Field(() => ID)
  id!: number
}

@ObjectType()
export class TokenPayload {
  @Field(() => TokenPayloadAccount)
  account!: TokenPayloadAccount
}

@ObjectType()
export class TokenInfo {
  @Field(() => String)
  jwt!: string

  @Field(() => TokenPayload)
  payload!: TokenPayload
}

export const AuthorizeResult = createUnionType({
  name: 'AuthorizeResult',
  types: () => [TokenInfo, InvalidCredentialsError, InvalidInputError] as const,
  resolveType: val => {
    if (val instanceof InvalidInputError) {
      return InvalidInputError
    }

    if (val instanceof InvalidCredentialsError) {
      return InvalidCredentialsError
    }

    return TokenInfo
  },
})
export type AuthorizeResult = typeof AuthorizeResult
