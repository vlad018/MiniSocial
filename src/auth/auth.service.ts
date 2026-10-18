import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { threadId } from "worker_threads";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class AuthService {
   constructor(private prisma: PrismaService,
      private jwtService: JwtService,
        private redisService: RedisService,
   ) {}
    
    async register(body) {
  const hashedPassword = await bcrypt.hash(body.password, 10)
       return this.prisma.user.create({
data:{

        username:body.username,
        email:body.email,
        password:hashedPassword
        


}


       }) 
       
    }

   async login(body:any){
const user= await  this.prisma.user.findUnique({
   where:{
    email:body.email
   }
   
   
   
})

if (!user) {
  throw new Error("Пользователь не найден");
}

const isPasswordValid = await bcrypt.compare(body.password, user.password);

if(isPasswordValid === false){
    return({
        message:"ОШИБКА"
})


}


 return this.jwtService.sign({
    id:user.id
    
 })
    }

    async logout(token: string) {
  const payload= await this.jwtService.decode(token)

  const ttl=
  payload.exp- Math.floor(Date.now() / 1000)

    await this.redisService.set(
    `blacklist:${token}`,
    '1',
    ttl,
  );
   }
}

