import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(
        private authService : AuthService
    ){}

    @Post('register')
    register(@Body() createUserDto: any) {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    login(@Body() loginDto: any) {
        return this.authService.login(loginDto);
    }
    
}    