import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() createAuthDto: LoginAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.authService.findOne(email);
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(email, updateAuthDto);
  }
}
