import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { UserService } from 'src/user/user.service';
import { compareHash } from 'src/common/utils';
import { JwtService } from '@nestjs/jwt';
import { TokenOutput } from './dto/token.output';
import { BiometricLoginInput } from './dto/biometric-input';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async register(dto: RegisterInput) {
    const user = await this.userService.createUser(dto);
    return this._generateAndReturnToken(user.id);
  }

  async login(dto: LoginInput): Promise<TokenOutput> {
    return this._handleLogin(dto);
  }

  async biometricLogin(biometricKey: string) {
    return this._handleLogin({ biometricKey });
  }

  private async _generateAndReturnToken(userId: number): Promise<TokenOutput> {
    const jwtToken = await this.jwtService.signAsync({ id: userId });
    return { accessToken: jwtToken };
  }

  private async _handleLogin(dto: LoginInput | BiometricLoginInput) {
    const filter: Prisma.UserWhereInput = {
      ...((dto as LoginInput).email && { email: (dto as LoginInput).email }),
      ...((dto as BiometricLoginInput).biometricKey && {
        email: (dto as BiometricLoginInput).biometricKey,
      }),
    };

    const user = await this.userService.findByFilter(filter);

    if (!user)
      throw new NotFoundException(null, 'Invalid password or user not found ');

    if ((dto as BiometricLoginInput).biometricKey) {
      return this._generateAndReturnToken(user.id);
    }
    {
      const isPasswordValid = await compareHash(
        (dto as LoginInput).password,
        user.password,
      );

      if (!isPasswordValid)
        throw new NotFoundException(null, 'Invalid password or user not found');
      return this._generateAndReturnToken(user.id);
    }
  }
}
