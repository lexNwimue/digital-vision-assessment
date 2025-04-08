// src/auth/auth.resolver.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { TokenOutput } from './dto/token.output';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: AuthService;

  const mockAuthService = {
    register: jest
      .fn()
      .mockResolvedValue({ accessToken: 'mock-token' } as TokenOutput),
    login: jest
      .fn()
      .mockResolvedValue({ accessToken: 'mock-token' } as TokenOutput),
    biometricLogin: jest
      .fn()
      .mockResolvedValue({ accessToken: 'mock-token' } as TokenOutput),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: {} },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should register a user and return a token', async () => {
    const result = await resolver.register({
      email: 'test@mail.com',
      password: 'password',
    });
    expect(result).toEqual({ accessToken: 'mock-token' });
    expect(authService.register).toHaveBeenCalled();
  });

  it('should login a user and return a token', async () => {
    const result = await resolver.login({
      email: 'test@mail.com',
      password: 'password',
    });
    expect(result).toEqual({ accessToken: 'mock-token' });
    expect(authService.login).toHaveBeenCalled();
  });

  it('should login with biometric key and return a token', async () => {
    const result = await resolver.biometricLogin({ biometricKey: 'mock-key' });
    expect(result).toEqual({ accessToken: 'mock-token' });
    expect(authService.biometricLogin).toHaveBeenCalledWith('mock-key');
  });
});
