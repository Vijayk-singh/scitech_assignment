import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    if (username === 'admin@example.com' && password === 'password123') {
      return { id: 1, username };
    }
    return null;
  }

  async login(username: string) {
    const payload = { sub: 1, username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}