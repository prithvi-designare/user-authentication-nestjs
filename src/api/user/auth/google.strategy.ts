import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { User } from "@/api/user/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    @InjectRepository(User)
    private readonly repository: Repository<User>;
    constructor(@Inject(ConfigService) config: ConfigService) {
        super({
            clientID: config.get('GOOGLE_CLIENT_ID'),
            clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: 'http://localhost:7001/auth/google-redirect',
            scope: ['email','profile']
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const { name, emails, photos} = profile;
        const email = emails[0].value;
        let user: User = await this.repository.findOne({ where: {email: email}});
        console.log(user);
        if (user!=null) {
            throw new HttpException('Conflict', HttpStatus.CONFLICT);
        }
        user = new User();
        user.name = name;
        user.email = email;
        console.log(user);
        this.repository.save(user);
        done(null, user);
    }
}