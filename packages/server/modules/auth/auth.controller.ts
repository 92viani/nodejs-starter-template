import { Controller, Request, Post, UseGuards, Body, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UseRefreshGuard } from './guards';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SkipDefaultGuard } from './guards/skip-default.guard';
import { Response } from 'express';
import { ResponseModel } from '@/server/common/models/response.model';
import { HashingHelper } from '@/utils/hashing.helper';
import dayjs from 'dayjs';

@Controller('auth')
@SkipDefaultGuard()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.login(req.user);
    const profile = await Promise.resolve({ profileId: 123456 });

    res.cookie(AuthService.COOKIE_NAME, JSON.stringify(tokens), {
      secure: process.env.NODE_ENV !== 'development',
      encode: HashingHelper.encrypt,
      expires: dayjs().hour(1).toDate(),
      httpOnly: true,
      path: '/',
    });
    res.setHeader('Authorization', 'true');
    res.statusCode = 200;
    return new ResponseModel({ data: profile });
  }

  @Post('logoff')
  async logoff(@Res() res: Response) {
    res.clearCookie(AuthService.COOKIE_NAME);
    res.removeHeader('Authorization');
    res.end();
  }

  @Post('register')
  async register(@Body() data: any) {
    return this.authService.register(data);
  }

  @Get('refresh-tokens')
  @UseRefreshGuard()
  async regenerateTokens(@Req() req, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.login(req.user);
    res.cookie(AuthService.COOKIE_NAME, JSON.stringify(tokens), {
      secure: process.env.NODE_ENV !== 'development',
      encode: HashingHelper.encrypt,
      expires: dayjs().hour(1).toDate(),
      httpOnly: true,
      path: '/',
    });
    res.setHeader('Authorization', 'true');
    return new ResponseModel();
  }

  @Get('csrf-token')
  async csrfToken(@Req() req, @Res() res: Response) {
    //https://medium.com/@ryanchenkie_40935/react-authentication-how-to-store-jwt-in-a-cookie-346519310e81
    res.json({ csrfToken: req.csrfToken() });
  }
}
