import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@InputType()
export class BiometricLoginInput {
  @Field(() => String)
  @IsNotEmpty()
  @Length(30, 100)
  biometricKey: string;
}
