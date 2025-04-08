// src/auth/decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ICurrentUser } from 'src/auth/interfaces/auth.interfaces';

export interface CustomRequest extends Request {
  user: ICurrentUser;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return (ctx.getContext().req as CustomRequest).user;
  },
);

export const CurrentUserId = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return (ctx.getContext().req as CustomRequest).user.id;
  },
);
