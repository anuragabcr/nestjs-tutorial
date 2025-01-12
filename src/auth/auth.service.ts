import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<Auth> {
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    return this.prisma.auth.create({
      data: {
        ...createAuthDto,
        password: hashedPassword,
      },
    });
  }

  async login(loginAuthDto: LoginAuthDto): Promise<any> {
    const { email, password } = loginAuthDto;

    const auth = await this.prisma.auth.findUnique({
      where: { email },
    });

    if (!auth) {
      throw new NotFoundException(`Auth with email ${email} not found`);
    }

    const isPasswordValid = await bcrypt.compare(password, auth.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: auth.email, sub: auth.id };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  async findAll(): Promise<Auth[]> {
    return this.prisma.auth.findMany();
  }

  async findOne(email: string): Promise<Auth> {
    const auth = await this.prisma.auth.findUnique({
      where: { email },
    });
    if (!auth) {
      throw new NotFoundException(`Auth with email ${email} not found`);
    }
    return auth;
  }

  async update(email: string, updateAuthDto: UpdateAuthDto): Promise<Auth> {
    const auth = await this.prisma.auth.findUnique({
      where: { email },
    });
    if (!auth) {
      throw new NotFoundException(`Auth with email ${email} not found`);
    }
    return this.prisma.auth.update({
      where: { email },
      data: updateAuthDto,
    });
  }
}
