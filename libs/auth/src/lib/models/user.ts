import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  email?: string

  passowrd?: string

  @Field({ nullable: true })
  address?: string
}
