import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { RedisModule } from '../redis/redis.module';
import { SessionController } from './session.controller';

@Module({
  imports: [RedisModule],
  providers: [SessionService],
  exports: [SessionService],
  controllers: [SessionController]
})
export class SessionModule {}