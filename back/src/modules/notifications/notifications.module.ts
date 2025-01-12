import { Module } from '@nestjs/common';
import { EmailService } from './notifications.service';

@Module({
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
