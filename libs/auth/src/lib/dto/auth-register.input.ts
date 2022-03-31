import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AuthRegisterInput {
  @Field()
  email: string

  @Field()
  password: string

  @Field({ nullable: true })
  address?: string
}
