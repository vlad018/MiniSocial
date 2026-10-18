
import { Body, Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service";
import { RedisService } from '../redis/redis.service';
@Injectable()
export class PostsService {

    constructor( private prisma:PrismaService,
          private readonly redisService: RedisService,
    ){}
       

    async testRedis() {
  await this.redisService.set('post:tet', 'Hello Redis!');

  const value = await this.redisService.get('post:tet');



  return value;
   
}

async deleteRedisTest() {
  return await this.redisService.del('post:test');
}
async findAll() {
  const cachedPosts = await this.redisService.get('posts:all');


  if (cachedPosts) {
    return JSON.parse(cachedPosts);
  }

  const posts= await this.prisma.post.findMany() 
  await this.redisService.set(
    'posts:all',
    JSON.stringify(posts),
    300,
  );

  return posts;
  
  
}

   async  create(body:any){
      const post= await this.prisma.post.create({
            data:{
        content: body.content,
authorId:1,
createdAt: new Date(),
            }

            
        })

       
  await this.redisService.del('posts:all');
        
  return post
     }

    async findOne(id:number){
      const cachedPost=await this.redisService.get(`post:${id}`)


  if (cachedPost) {
    return JSON.parse(cachedPost);
  }
const post=await this.prisma.post.findUnique({
  where:{
    id
  }
})
if(!post){
  return null
}


  await this.redisService.set(
    `post:${id}`,
    JSON.stringify(post),
    300,
  );

  return post;
  
    }

    async remove(id: number) {
  await this.prisma.post.delete({
    where: {
      id,
    },
  });

  await this.redisService.del(`post:${id}`);
  await this.redisService.del('posts:all');
}
async testHash(){
  await  this.redisService.hSet('user:1','name','vlad')

  return 'Hash saved!';
}
async getHashTest() {
  const name = await this.redisService.hGet('user:1', 'name');

  return name;
}
async getHashAllTest() {
  return await this.redisService.hGetAll('user:1');
}
async testUserHash(){
    await this.redisService.hSet('user:2', 'name', 'Alex');
  await this.redisService.hSet('user:2', 'age', '15');
  await this.redisService.hSet('user:2', 'city', 'Kyiv');

  return await this.redisService.hGetAll('user:2');
}
async addNotification(message: string) {
  return this.redisService.lpush('notifications', message);
}

async getNotifications() {
  return this.redisService.lrange('notifications');
}


async removeLastNotification() {
  return this.redisService.rpop('notifications');
}
async addOnlineUser(userId: string) {
  return this.redisService.sadd('online_users', userId);
}

async removeOnlineUser(userId: string) {
  return this.redisService.srem('online_users', userId);
}

async isUserOnline(userId: string) {
  return this.redisService.sismember('online_users', userId);
}
}

