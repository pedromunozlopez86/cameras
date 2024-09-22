/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(body: LoginDto): Promise<{}> {
    const user = await this.userService.findOneByEmail(body.email);

    const compare = await bcrypt.compare(body.password, user.password);

    if (user && (await bcrypt.compare(body.password, user.password))) {
      const payload = { email: user.email, sub: user.id };
      const { password, ...userWithoutPassword } = user;
      return {
        ...userWithoutPassword,
        auth: {
          access_token: this.jwtService.sign(payload, {
            secret: process.env.SECRET_KEY,
            expiresIn: '1h',
          }),
        },
      };
    } else {
      return new BadRequestException('Usuario o contraseña incorrectos');
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
