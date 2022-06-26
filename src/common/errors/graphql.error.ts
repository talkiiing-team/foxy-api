import { Field, InterfaceType } from 'type-graphql'

@InterfaceType()
export abstract class AbstractGraphqlError {
  @Field(() => String)
  abstract code: string

  @Field(() => String)
  abstract message: string
}
