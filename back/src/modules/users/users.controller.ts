import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from '../auth/guard/roles.guard';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Roles } from '../auth/guard/roles.decorator';
import { UserRole } from './user-role.enum';
import { ValidateIdDto } from './dtos/validateId.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  async getUserById(@Param('id') id: string) {
    return await this.usersService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateUser(
    @Param() params: ValidateIdDto,
    @Body() UpdateUserDto: UpdateUserDto
  ) {
    return await this.usersService.updateUser(params.id, UpdateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param() params: ValidateIdDto) {
    return await this.usersService.deleteUser(params.id);
  }
}
