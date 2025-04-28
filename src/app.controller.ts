import { Controller, Get, Post, Header} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('planer')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @Header('Cache-Control', 'no-store')
  create(): string {
    return 'This action adds a new planer';
  }

  @Get('abcd/*')
  getHello(): string {
    return this.appService.getHello();
  }
}
