import { ZodError } from 'zod'
import { Field, ObjectType } from 'type-graphql'
import { AbstractGraphqlError } from '@/common/errors/graphql.error'

@ObjectType()
export class InvalidInputProblem {
  @Field(() => String)
  field!: string

  @Field(() => String)
  error!: string

  @Field(() => String)
  message!: string
}

@ObjectType({ implements: AbstractGraphqlError })
export class InvalidInputError implements AbstractGraphqlError {
  code = 'InvalidInput'
  message = 'You provided invalid input'

  @Field(() => [InvalidInputProblem])
  problems: InvalidInputProblem[]

  constructor(problems: InvalidInputProblem[]) {
    this.problems = problems
  }

  static ofZodError(zodErrors: ZodError) {
    return new InvalidInputError(
      zodErrors.errors.map(err => ({
        field: err.path.join('.'),
        error: err.code,
        message: err.message,
      })),
    )
  }
}
