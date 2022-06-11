import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import crypto from 'crypto';
import dayjs from 'dayjs';
import { MoreThanOrEqual } from 'typeorm';
import { CurrentUser } from './models/current-user';
import { Request } from 'express';
import { HashingHelper } from '@/utils/hashing.helper';

@Injectable()
export class AuthService {
  static readonly COOKIE_NAME = process.env.AUTH_COOKIE_NAME || 'auth-cookie';
  static getAuthCookie(request: Request): any {
    const encryptCookie = request?.cookies[AuthService.COOKIE_NAME];
    if (!encryptCookie) return null;
    const decryptedCookie = HashingHelper.decrypt(encryptCookie);
    return decryptedCookie ? JSON.parse(decryptedCookie) : null;
  }

  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.fackUser(username);
    if (user && user.password === password) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: CurrentUser) {
    const payload = {
      username: user.username,
      sub: user.userId,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.getRefreshToken(payload.sub),
    };
  }

  async register(createUserModel: any) {
    return await this.userService.create(createUserModel);
  }

  async getRefreshToken(userId: string): Promise<string> {
    const userDataToUpdate = {
      refreshToken: crypto.randomBytes(16).toString('hex'),
      refreshTokenExp: dayjs().day(1).format('YYYY/MM/DD'),
    };

    //await this.userService.update(userId, userDataToUpdate);
    return userDataToUpdate.refreshToken;
  }

  async validRefreshToken(userId: number, refreshToken: string) {
    const currentDate = dayjs().day(1).format('YYYY/MM/DD');
    const user = await this.userService.findOne({
      where: {
        userId: userId,
        refreshToken: refreshToken,
        refreshTokenExp: MoreThanOrEqual(currentDate),
      },
    });

    if (!user) {
      return null;
    }

    const currentUser = new CurrentUser();
    currentUser.userId = user.id;
    currentUser.fullName = user.name;
    currentUser.email = user.email;
    currentUser.username = user.username;

    return currentUser;
  }
}
