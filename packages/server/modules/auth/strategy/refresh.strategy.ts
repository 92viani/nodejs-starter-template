//https://www.learmoreseekmore.com/2021/05/nestjs-jwt-auth-cookie-series-part3-refresh-token.html
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private authService: AuthService) {
    super({
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: process.env.AUTH_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          try {
            const authCookie = AuthService.getAuthCookie(request);
            if (!authCookie) return null;
            return authCookie.accessToken;
          } catch (error) {
            return null;
          }
        },
      ]),
    });
  }

  async validate(request: Request, payload: any) {
    if (!payload) {
      throw new UnauthorizedException();
    }

    const authCookie = AuthService.getAuthCookie(request);
    if (!authCookie) {
      throw new BadRequestException('invalid authorized cookie');
    }
    if (!authCookie?.refreshToken) {
      throw new BadRequestException('invalid refresh token');
    }
    const user = await this.authService.validRefreshToken(payload.sub, authCookie.refreshToken);
    if (!user) {
      throw new BadRequestException('token expired');
    }

    return user;
  }
}
