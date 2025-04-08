import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { BiometricLoginInput } from './dto/biometric-input';
import { TokenOutput } from './dto/token.output';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => TokenOutput)
  async register(@Args('register') dto: RegisterInput) {
    return this.authService.register(dto);
  }

  @Mutation(() => TokenOutput)
  async login(@Args('login') dto: LoginInput) {
    return this.authService.login(dto);
  }

  @Mutation(() => TokenOutput)
  async biometricLogin(
    @Args('biometricLogin') { biometricKey }: BiometricLoginInput,
  ) {
    return this.authService.biometricLogin(biometricKey);
  }
}
