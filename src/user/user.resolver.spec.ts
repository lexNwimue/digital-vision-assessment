import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service'; // Import PrismaService
import { hashString } from 'src/common/utils'; // Assuming this is the hashing function used

jest.mock('src/common/utils'); // Mock the hashing function

describe('UserService', () => {
  let service: UserService;
  let mockPrismaService: PrismaService;

  beforeEach(async () => {
    // Create a mock of PrismaService
    mockPrismaService = {
      user: {
        findFirstOrThrow: jest.fn(),
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test for creating a user
  it('should create a user successfully', async () => {
    const createUserDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    // Hash the password in the mock function
    const hashedPassword = 'hashedPassword123'; // mock the hashed password

    // Mock the hashString function to return the mocked hashed password
    (hashString as jest.Mock).mockResolvedValue(hashedPassword);

    const mockUser = {
      id: 1,
      ...createUserDto,
      password: hashedPassword, // Use the hashed password
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (mockPrismaService.user.create as jest.Mock).mockResolvedValue(mockUser);

    const result = await service.createUser(createUserDto);

    // Compare the result, ignoring the actual hashed password
    const { password, ...expectedResult } = mockUser;

    expect(result).toEqual(expectedResult);
    expect(mockPrismaService.user.create).toHaveBeenCalledWith({
      data: { ...createUserDto, password: hashedPassword },
    });
  });
});
