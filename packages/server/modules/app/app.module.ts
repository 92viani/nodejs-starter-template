import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/server/database/database.module';
import { AppController } from '../app/app.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
	controllers: [AppController],
	imports: [DatabaseModule, AuthModule],
})
export class AppModule {}
