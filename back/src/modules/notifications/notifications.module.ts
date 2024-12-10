import { Module } from '@nestjs/common';
import { EmailController } from './notifications.controller';
import { EmailService } from './notifications.service';

@Module({
    providers: [EmailService],
    controllers: [EmailController],
})
export class EmailModule {} 
