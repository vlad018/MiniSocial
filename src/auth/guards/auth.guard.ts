import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RedisService } from "../../redis/redis.service";
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,
       private redisService: RedisService,
    ){}
async canActivate(context: ExecutionContext){
    const request=context.switchToHttp().getRequest()



const token = request.cookies.token;

if (!token) {
  return false
}

try {
  const payload = this.jwtService.verify(token)


const isBlacklisted = await this.redisService.isBlacklisted(token)


if(isBlacklisted){
  return false
}
  request.user = payload;
}
catch{
    return false
}

  return true

  
}


}