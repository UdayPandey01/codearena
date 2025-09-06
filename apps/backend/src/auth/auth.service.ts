import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PrismaService} from "../core/database/prisma.service";
import {JwtService} from "@nestjs/jwt";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) {}

    async register(createUserDto: CreateUserDto) {
        const {email, username, password} = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                email,
                username,
                passwordHash: hashedPassword
            }
        })

        const { passwordHash, ...result } = user;

        return result;
    }


    async login(loginDto: LoginDto) {
        const {email, password} = loginDto;
        const user = await this.prisma.user.findUnique({
            where: {email}
        })

        if(!user || !(await bcrypt.compare(password, user.passwordHash))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {sub: user.id, email: user.email};
        return {
            access_token: await this.jwt.signAsync(payload)
        }
    }
}
