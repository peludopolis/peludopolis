import { Controller, Post, Body } from '@nestjs/common';
import { GoogleUsersService } from './googleUsers.service';

@Controller('google-users')
export class GoogleUsersController {
    constructor(private readonly googleUsersService: GoogleUsersService) {}

    @Post('register')
    async registerGoogleUser(@Body() googleData: any) {
        const user = await this.googleUsersService.findOrCreate({
            email: googleData.email,
            name: googleData.name,
            picture: googleData.picture,
            googleId: googleData.googleId,
        });

        return {
            message: 'Usuario registrado o existente',
            user,
        };
    }
}
