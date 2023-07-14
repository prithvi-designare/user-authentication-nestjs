import { Body, ClassSerializerInterceptor, Controller, Inject, Put, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from './auth/auth.guard';
import { Request } from 'express';
import { User } from './user.entity';
import { UpdateNameDto } from './user.dto';

@Controller('user')
export class UserController {
    @Inject(UserService)
    private readonly service: UserService;

    @Put('name')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    private updateName(@Body() body: UpdateNameDto, @Req() req: Request): Promise<User> {
        return this.service.updateName(body, req);
    }
}
