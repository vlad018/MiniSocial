import { Body, Controller, Res, Get, Req, UseGuards } from "@nestjs/common";
import { PostsService } from "src/posts/posts.service";
import { Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./guards/auth.guard";
import type  { Response } from "express";

@Controller("auth")

export class AuthController {
constructor(private AuthService: AuthService) {}

    @Post('register')
    register(@Body() body:any){
        return this.AuthService.register(body)
    }


    @Post('login')
   async login(@Body() Body:any,
        @Res({ passthrough: true }) res: Response){
        const token= await this.AuthService.login(Body)


        res.cookie("token",token,{
              httpOnly: true

        })
        return {message:"все норм"}
    }
      @UseGuards(AuthGuard)
  @Get("me")
me(@Req() req: any) {
  return req.user;
}





    






@Post('logout')
async logout(@Req() request) {
  const token = request.cookies.token;

  if (!token) {
    return { message: 'Already logged out' };
  }

  await this.AuthService.logout(token);

  return { message: 'Logged out' };
}

}
