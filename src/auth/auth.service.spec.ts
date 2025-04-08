import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

// Mock bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed-password'),
  compare: jest.fn().mockResolvedValue(true), // Mock bcrypt compare function
}));

describe('AuthService', () => {
  let service: AuthService;

  const mockUserService = {
    createUser: jest.fn(),
    findByFilter: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue('mocked-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user and return a token', async () => {
    mockUserService.createUser.mockResolvedValue({ id: 1 });

    const result = await service.register({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(result).toEqual({ accessToken: 'mocked-token' });
  });

  it('should login a user with email and password and return a token', async () => {
    const user = {
      id: 1,
      email: 'test@example.com',
      password: 'hashed-password',
    };

    mockUserService.findByFilter.mockResolvedValue(user);

    const result = await service.login({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(result).toEqual({ accessToken: 'mocked-token' });
  });

  it('should login a user with biometricKey and return a token', async () => {
    mockUserService.findByFilter.mockResolvedValue({ id: 2 });

    const result = await service.biometricLogin('bio-key-123');

    expect(result).toEqual({ accessToken: 'mocked-token' });
  });
});
