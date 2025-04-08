// src/user/dto/user.output.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ProfileOutput {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  biometricKey?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
