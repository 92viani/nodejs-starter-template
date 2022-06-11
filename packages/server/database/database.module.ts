import { Module } from '@nestjs/common';
import { SqlProvider } from './providers/sql.provider';

@Module({
  imports: [...SqlProvider],
})
export class DatabaseModule {}
