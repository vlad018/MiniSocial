import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { RedisService } from './redis/redis.service';
import { SessionModule } from './session/session.module';
@Module({
  imports: [PostsModule, SessionModule],
  controllers: [AppController],
  providers: [AppService,RedisService],
  

})
export class AppModule {}
