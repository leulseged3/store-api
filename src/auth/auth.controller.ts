import { Body, Controller, Get, Post, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post()
  async login(@Body() authLoginDto: AuthLoginDto, @Headers() header) {
    return this.authService.login(authLoginDto, header.body.usertype ? header.body.usertype : header.usertype)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return 'Success'
  }
}
