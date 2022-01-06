import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dtos/auth-login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { }

  async login(authLoginDto: AuthLoginDto, userType: string) {
    const user = await this.validateUser(authLoginDto, userType);

    const payload = {
      userId: user.id
    }

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      access_token: this.jwtService.sign(payload)
    }
  }

  async validateUser(authLoginDto: AuthLoginDto, userType: string) {
    const { email, password } = authLoginDto;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.userType !== userType) {
      throw new UnauthorizedException();
    }

    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException()
    }

    return user
  }
}
