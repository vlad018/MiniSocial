import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';

import { AuthGuard } from './guards/auth.guard';

import { PrismaModule } from 'src/prisma/prisma.module';

import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [
    PrismaModule,

    JwtModule.register({
      secret: 'SECRET',
    }),

    RedisModule,
  ],

  exports: [JwtModule],

  controllers: [AuthController],

  providers: [
    AuthService,
    AuthGuard,
  ],
})
export class AuthModule {}