import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashString } from 'src/common/utils'; // Import hashString to mock

jest.mock('src/common/utils'); // Mock hashString globally

describe('UserService', () => {
  let service: UserService;
  let mockPrismaService: PrismaService;

  beforeEach(async () => {
    // Create a mock for PrismaService
    mockPrismaService = {
      user: {
        findFirstOrThrow: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
      },
    } as any;

    // Mock hashString to return a predictable hashed password
    (hashString as jest.Mock).mockResolvedValue('hashedPassword123');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService, // Provide the mock PrismaService
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user successfully', async () => {
    const createUserDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword123', // This is the mocked hashed password
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Mock the PrismaService user.create method to return the mockUser
    (mockPrismaService.user.create as jest.Mock).mockResolvedValue(mockUser);

    const result = await service.createUser(createUserDto);

    // Since the result is expected to have the same password as the mock
    expect(result).toEqual({
      id: mockUser.id,
      email: mockUser.email,
      createdAt: mockUser.createdAt,
      updatedAt: mockUser.updatedAt,
    }); // Exclude the password for comparison
    expect(mockPrismaService.user.create).toHaveBeenCalledWith({
      data: { ...createUserDto, password: 'hashedPassword123' },
    }); // Verify the mock function was called with correct arguments
  });
});
