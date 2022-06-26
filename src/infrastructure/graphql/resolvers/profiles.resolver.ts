import { Field, ID, ObjectType, Query, Resolver } from 'type-graphql'

@ObjectType()
class Recipe {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  title!: string
}

@Resolver()
export class RecipesResolver {
  private recipesCollection: Recipe[] = [
    { id: '0', title: 'hello' },
    { id: '1', title: 'world' },
  ]

  @Query(() => [Recipe])
  async recipes() {
    return this.recipesCollection
  }
}
