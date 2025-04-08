import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';

import { ProfileOutput } from 'src/auth/dto/profile.output';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUserId } from 'src/common/current-user.decorator';
import { ICurrentUser } from 'src/auth/interfaces/auth.interfaces';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => ProfileOutput)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUserId() user: ICurrentUser) {
    return this.userService.findByIdOrThrow(user.id);
  }
}
