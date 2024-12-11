import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/auth/auth0', 302)
  getHello(): string {
    return this.appService.getHello();
  }
}
