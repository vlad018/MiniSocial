import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class SessionService {

  constructor(
    private readonly redisService: RedisService,
  ) {}

  async createSession(userId: number) {
    const sessionId = randomUUID();

    await this.redisService.set(
`session:${sessionId}`,
      userId.toString(),
      3600,

    )
    return sessionId
  }
  async getSession(sessionId: string) {
  return await this.redisService.get(`session:${sessionId}`);
}
async deleteSession(sessionId: string) {
  return await this.redisService.del(`session:${sessionId}`);
}
}