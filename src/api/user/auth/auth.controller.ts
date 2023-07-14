import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { User } from '@/api/user/user.entity';
import { JwtAuthGuard } from './auth.guard';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOAuthGuard } from './google-oauth-guard';

@Controller('auth')
export class AuthController {
    @Inject(AuthService)
    private readonly service: AuthService;

    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    private register(@Body() body: RegisterDto): Promise<User | never> {
        return this.service.register(body);
    }

    @Post('login')
    private login(@Body() body: LoginDto): Promise<string | never> {
        return this.service.login(body);
    }

    @Post('refresh')
    @UseGuards(AuthGuard('jwt'))
    private refresh(@Req() { user }: Request): Promise<string | never> {
        return this.service.refresh(<User>user);
    }

    @Get()
    @UseGuards(GoogleOAuthGuard)
    async googleAuth(req: Request) {}

    @Get('google-redirect')
    @UseGuards(GoogleOAuthGuard)
    googleAuthRedirect(@Req() {user}: Request)
    {
        return this.service.googleLogin(<User>user);
    }
}
