import { Body, Controller, Post, Res, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import type { Response, Request } from 'express';

class LoginDto {
  username: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // LOGIN
  @Public()
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const isValid = await this.authService.validateUser(
      body.username,
      body.password
    );

    if (!isValid) {
      return { ok: false, message: 'Invalid credentials' };
    }

    const { access_token } = await this.authService.login(body.username);

    // Set cookie
    res.cookie('token', access_token, {
      httpOnly: true,
      secure: false, // 🔥 true in production
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      ok: true,
      message: 'Login successful',
    };
  }

  // LOGOUT
  @Public()
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { ok: true, message: 'Logged out' };
  }

  // CHECK AUTH (PROTECTED ROUTE)
  @Get('me')
  getMe(@Req() req: Request) {
    return {
      authenticated: true,
      user: (req as any).user, // comes from JwtStrategy
    };
  }
}