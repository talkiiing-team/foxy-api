import { createUnionType, Field, ID, InputType, ObjectType } from 'type-graphql'
import { InvalidInputError } from '@/common/errors/invalid-input.error'
import { AlreadyExistsError } from '@/common/errors/already-exists.error'

@InputType()
export class CreateAccountInput {
  @Field(() => String)
  email!: string

  @Field(() => String)
  password!: string
}

@ObjectType()
export class SafeAccount {
  @Field(() => ID)
  id!: number

  @Field(() => String)
  email!: string
}

export const CreateAccountResult = createUnionType({
  name: 'CreateAccountResult',
  types: () => [SafeAccount, AlreadyExistsError, InvalidInputError] as const,
  resolveType: val => {
    if (val instanceof InvalidInputError) {
      return InvalidInputError
    }

    if (val instanceof AlreadyExistsError) {
      return AlreadyExistsError
    }

    return SafeAccount
  },
})
export type CreateAccountResult = typeof CreateAccountResult
