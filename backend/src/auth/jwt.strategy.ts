import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from 'process';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          
          return req?.cookies?.token || null;
        }
      ]),
      ignoreExpiration: false,
      secretOrKey:  'secret123',
    });
  }

  async validate(payload: any) {
    console.log(' validated payload:', payload);
    return payload;
  }
}