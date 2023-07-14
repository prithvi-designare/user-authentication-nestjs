import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/api/user/user.entity';
import { Repository } from 'typeorm';
import { AuthHelper } from './auth.helper';
import { GoogleLoginFto, LoginDto, RegisterDto } from './auth.dto';


@Injectable()
export class AuthService {
    @InjectRepository(User)
    private readonly repository: Repository<User>;

    @Inject(AuthHelper)
    private readonly helper: AuthHelper;

    public async register(body: RegisterDto): Promise<User | never> {
        const { name, email, password }: RegisterDto = body;

    let user: User = await this.repository.findOne({ where: {email}});

    if (user) {
        throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    user = new User();
    user.name = name;
    user.email = email;
    user.password = this.helper.encodePassword(password);

    return this.repository.save(user);
    }

    public async login(body: LoginDto): Promise<string | never> {
        const {email, password}: LoginDto = body;
        const user: User = await this.repository.findOne({ where: {email}});

        if(!user) {
            throw new HttpException('No user found', HttpStatus.NOT_FOUND);
        }

        const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

        if(!isPasswordValid) {
            throw new HttpException('Incorrect password', HttpStatus.NOT_FOUND);
        }

        this.repository.update(user.id, { lastloginAt: new Date()});

        return this.helper.generateToken(user);
    }

    public async refresh(user: User): Promise<string> {
        this.repository.update(user.id, { lastloginAt: new Date() });

        return this.helper.generateToken(user);
    }

    public async googleLogin(body: GoogleLoginFto)
    {
        if(!body.email) {
            throw new HttpException('No user found from google', HttpStatus.NOT_FOUND);
        }

        return {
            message: 'User information from google',
            user: body.email,
        }
    }

}
