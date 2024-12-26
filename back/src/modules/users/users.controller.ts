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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: 'Obtener todos los usuarios',
    description: 'Este endpoint solo es accesible para administradores.'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida con éxito.'
  })
  @ApiResponse({
    status: 403,
    description: 'Acción no permitida. Solo administradores pueden acceder.'
  })
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Obtener usuario por ID',
    description: 'Este endpoint obtiene la información de un usuario por su ID.'
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado con éxito.'
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.'
  })
  async getUserById(@Param() params: ValidateIdDto) {
    return await this.usersService.findById(params.id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('profilePicture'))
  @ApiOperation({
    summary: 'Actualizar un usuario',
    description:
      'Este endpoint permite actualizar la información de un usuario, incluyendo su imagen de perfil.'
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado con éxito.'
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o error al actualizar el usuario.'
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.'
  })
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
  @ApiOperation({
    summary: 'Eliminar un usuario',
    description:
      'Este endpoint permite eliminar un usuario de la base de datos. Solo accesible por administradores.'
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado con éxito.'
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.'
  })
  @ApiResponse({
    status: 403,
    description:
      'Acción no permitida. Solo administradores pueden eliminar usuarios.'
  })
  async deleteUser(@Param() params: ValidateIdDto) {
    return await this.usersService.deleteUser(params.id);
  }
}
