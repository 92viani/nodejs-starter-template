import { Module } from '@nestjs/common';
import { UserController } from '@/server/modules/user/user.controller';
import { UserService } from '@/server/modules/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, AccountEntity, SessionEntity, VerificationTokenEntity } from '@/database/entities/auth.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([
    // 	UserEntity,
    // 	AccountEntity,
    // 	SessionEntity,
    // 	VerificationTokenEntity,
    // ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
