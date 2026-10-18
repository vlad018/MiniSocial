import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { AuthModule } from "src/auth/auth.module";
import { RedisModule } from '../redis/redis.module';
@Module({
  imports: [PrismaModule,AuthModule,RedisModule],
  providers: [PostsService],
  controllers:[PostsController]
})
export class PostsModule {}