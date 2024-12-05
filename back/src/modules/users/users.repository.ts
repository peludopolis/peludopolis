import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(
    private users = [
      {
        id: 1,
        name: 'Pedro',
        email: 'pepe@gmail.com',
        password: '123456',
        phone: '123456789',
        address: 'Calle 1, 123',
        appointments: [],
        paymentDetails: [],
        posts: [],
        comments: [],
        isAdmin: false
      }
    ]
  ) {}
}
