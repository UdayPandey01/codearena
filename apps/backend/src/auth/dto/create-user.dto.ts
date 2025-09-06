import {IsEmail, IsNotEmpty, IsString, Min, MinLength} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    username : string;

    @IsString()
    @MinLength(8, {message: 'Password must be at least 8 characters long'})
    @IsNotEmpty()
    password: string;
}