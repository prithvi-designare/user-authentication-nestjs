import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { UpdateNameDto } from './user.dto';

@Injectable()
export class UserService {
    @InjectRepository(User)
    private readonly repository: Repository<User>;

    public async updateName(body: UpdateNameDto, req: Request): Promise<User> {
        const user: User = <User>req.user;

        user.name = body.name;

        return this.repository.save(user);
    }
}
