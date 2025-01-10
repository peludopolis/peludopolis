import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleUser } from './google-user.entity';

@Injectable()
export class GoogleUsersService {
    constructor(
        @InjectRepository(GoogleUser)
        private readonly googleUserRepository: Repository<GoogleUser>,
    ) {}

    async findOrCreate(googleData: {
        email: string;
        name: string;
        picture?: string;
        googleId: string;
    }): Promise<GoogleUser> {
        let user = await this.googleUserRepository.findOne({
            where: { email: googleData.email },
        });

        if (!user) {
            user = this.googleUserRepository.create(googleData);
            await this.googleUserRepository.save(user);
        }

        return user;
    }
}
