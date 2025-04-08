import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BiometricLoginInput {
  @Field(() => String)
  biometricKey: string;
}
