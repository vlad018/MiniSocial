import { Body, Controller } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Get,Post,Delete} from "@nestjs/common";
import { Param, ParseIntPipe } from '@nestjs/common';
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/guards/auth.guard";
@Controller("posts")
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    findAll(){
        return this.postsService.findAll()
    }
@UseGuards(AuthGuard)
    @Post('postd')
    create(@Body()body:any){
        return this.postsService.create(body)
    
    }


@Delete(':id')
remove(@Param('id', ParseIntPipe) id: number) {
  return this.postsService.remove(id);
}
@Get('redis-test')
testRedis() {
  return this.postsService.testRedis();
}

@Get('redis-delete-test')
deleteRedisTest() {
  return this.postsService.deleteRedisTest();
}

@Get('hash-test')
getHashTest() {
  return this.postsService.getHashTest();
}

@Get('hash-all-test')
getHashAllTest() {
  return this.postsService.getHashAllTest();
}

@Get('user-hash-test')
testUserHash() {
  return this.postsService.testUserHash();
}

@Get('notifications')
getNotifications() {
  return this.postsService.getNotifications();
}

@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  return this.postsService.findOne(id);
}
@Post('notifications')
addNotification(@Body('message') message: string) {
  return this.postsService.addNotification(message);
}
@Post('online/:id')
addOnlineUser(@Param('id') id: string) {
  return this.postsService.addOnlineUser(id);
}

@Delete('online/:id')
removeOnlineUser(@Param('id') id: string) {
  return this.postsService.removeOnlineUser(id);
}

@Get('online/:id')
isUserOnline(@Param('id') id: string) {
  return this.postsService.isUserOnline(id);
}


@Delete('notifications/last')
removeLastNotification() {
  return this.postsService.removeLastNotification();
}
}
