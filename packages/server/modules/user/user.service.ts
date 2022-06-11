import { UserEntity } from '@/server/database/entities/auth.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends Repository<UserEntity> {
  async updateCurrentUser(data: UserEntity | any, email: string): Promise<any> {
    return await this.update({}, data);
  }

  async fackUser(username: string) {
    return await Promise.resolve({
      username: 'm.viani',
      password: '123456',
      id: Date.now(),
      fullName: 'Mohammad Viani',
      email: 'viani@outlook.com',
    });
  }
}
