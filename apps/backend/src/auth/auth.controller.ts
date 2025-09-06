import { Controller, Post, Body, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService : AuthService
    ){}

    @Post('register')
    register(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    login(@Body(new ValidationPipe()) loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
    
}    