// src/user/user.service.ts

import { Injectable, ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RegisterInput } from 'src/auth/dto/register.input';
import { hashString } from 'src/common/utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: RegisterInput) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { biometricKey: dto.biometricKey }],
      },
    });

    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    const hashedPassword = await hashString(dto.password);

    const user = await this.prisma.user.create({
      data: { ...dto, password: hashedPassword },
    });

    const { password, ...result } = user;
    return result;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByFilter(filter: Prisma.UserWhereInput) {
    return this.prisma.user.findFirst({ where: filter });
  }

  async findByIdOrThrow(id: number) {
    return this.prisma.user.findFirstOrThrow({ where: { id } });
  }

  async findByBiometricKey(biometricKey: string) {
    return this.prisma.user.findUnique({ where: { biometricKey } });
  }
}
