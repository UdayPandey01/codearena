import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8, {message: 'Password must be at least 8 characters long'})
    @IsNotEmpty()
    password: string;

}