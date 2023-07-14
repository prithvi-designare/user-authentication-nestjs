import { Trim } from "class-sanitizer";
import { IsEmail, isEmail, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @Trim()
    @IsEmail()
    public readonly email: string;

    @IsString()
    @MinLength(8)
    @IsOptional()
    public readonly password?: string;

    @IsString()
    @IsOptional()
    public readonly name?: string;
}

export class LoginDto {
    @Trim()
    @IsEmail()
    public readonly email: string;

    @IsString()
    public readonly password: string;
}

export class GoogleLoginFto {
    @Trim()
    @IsEmail()
    public readonly email: string;
}

