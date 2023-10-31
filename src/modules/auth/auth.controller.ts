import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(201)
    @Post('/login')
    async login(@Body() body) {
        return await this.authService.loginService(body.email, body.password)
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Post('/check')
    check(@Req() request: Request) {
        return this.authService.checkUser(request)
    }
}
