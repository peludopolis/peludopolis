import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from '../auth/guard/roles.guard';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Roles } from '../auth/guard/roles.decorator';
import { UserRole } from './user-role.enum';
import { ValidateIdDto } from './dtos/validateId.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @UseGuards(AuthGuard)
  async getUserById(@Param('id') id: string) {
    return await this.usersService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('profilePicture'))
  async updateUser(
    @Param() params: ValidateIdDto,
    @Body() UpdateUserDto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 200000 }),
          new FileTypeValidator({ fileType: /jpeg|jpg|png|webp/ })
        ]
      })
    )
    profilePicture?: Express.Multer.File
  ) {
    return await this.usersService.updateUser(
      params.id,
      UpdateUserDto,
      profilePicture
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param() params: ValidateIdDto) {
    return await this.usersService.deleteUser(params.id);
  }
}
