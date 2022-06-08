import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserModule } from '../user/user.module';
import { RefreshStrategy } from './strategy/refresh.strategy';

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.AUTH_SECRET_KEY,
			signOptions: {
				expiresIn: process.env.TOKEN_EXPIRES_TIME || '60s',
				algorithm: 'HS256',
			},
		}),
	],
	providers: [
		AuthService,
		LocalStrategy,
		JwtStrategy,
		RefreshStrategy,
		{
			// APP_GUARD register guard to all routes
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
