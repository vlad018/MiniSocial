import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client = createClient({
    url: process.env.REDIS_URL
  });

  constructor() {
    this.client.on('error', (err: Error) => {
      console.error('Redis Client Error:', err);
    });
  }

async onModuleInit() {
  await this.client.connect();

  console.log('Redis connected!');

  await this.set('test', 'hello');

  const value = await this.get('test');

  console.log('Redis value:', value);
}

  async se(key: string, value: string) {
  await this.client.set(key, value);
}

async get(key: string) {
  return await this.client.get(key);
}
async del(key: string) {
  return await this.client.del(key);
}

    async set(key: string, value: string, ttl?: number) {

    if(ttl){
      await this.client.set(key,value,{
        EX:ttl,
      })
      return 
    }
    await this.client.set(key,value)
     }
     async hSet(key: string, field: string, value: string) {
  await this.client.hSet(key, field, value);
}
async hGet(key: string, field: string) {
  return await this.client.hGet(key, field);

}

async hGetAll(key: string) {
  return await this.client.hGetAll(key);
}
async isBlacklisted(token: string) {
  const result = await this.client.exists(`blacklist:${token}`);

  return result === 1;
}
async lpush(key:string,value: string){
  return await this.client.lPush(key,value)
}
async rpush(key: string, value: string) {
  return this.client.rPush(key, value);
}
async rpop(key: string) {
  return this.client.rPop(key);
}
async lrange(key: string) {
  return this.client.lRange(key, 0, -1);
}
async sadd(key: string, value: string) {
  return this.client.sAdd(key, value);
}

async srem(key: string, value: string) {
  return this.client.sRem(key, value);
}

async sismember(key: string, value: string) {
  return this.client.sIsMember(key, value);
}
}
