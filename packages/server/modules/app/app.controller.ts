import { Controller, Get, UseGuards } from '@nestjs/common';
import { SkipDefaultGuard, LocalAuthGuard, UseLocalGuard } from '../auth/guards';

@Controller('app')
@SkipDefaultGuard()
export class AppController {
  @Get('/hello')
  helloWorld() {
    return 'Hello, world!';
  }

  @Get('/protected')
  //@UseGuards(LocalAuthGuard)
  @UseLocalGuard()
  protected() {
    return 'I am protected!';
  }
}
