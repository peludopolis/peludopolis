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
  Req,
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
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { SkipSensitiveFieldsInterceptor } from './interceptor/skipSensitiveFields.decorator';
import { GoogleAuthGuard } from '../auth/guard/googleAuth.guard';
import { Request } from 'express';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @SkipSensitiveFieldsInterceptor()
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

  @ApiBearerAuth()
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

  @UseGuards(GoogleAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener usuario por correo',
    description:
      'Este endpoint permite obtener la información de un usuario basado en su correo electrónico validado con Google. Requiere autenticación mediante token de Google.'
  })
  @ApiParam({
    name: 'email',
    description: 'Correo electrónico del usuario que se desea buscar.',
    type: String,
    required: true,
    example: 'usuario@ejemplo.com'
  })
  @ApiResponse({
    status: 200,
    description:
      'El usuario fue encontrado con éxito. Devuelve la información del usuario y un token de acceso.',
    schema: {
      example: {
        user: {
          email: 'usuario@ejemplo.com',
          name: 'Juan Pérez',
          picture: 'https://example.com/avatar.jpg'
        },
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      }
    }
  })
  @ApiResponse({
    status: 401,
    description:
      'No autorizado. Ocurre cuando el correo proporcionado no coincide con el token de Google o cuando el token no es válido.',
    schema: {
      example: {
        statusCode: 401,
        message: 'Correo no coincide con el token',
        error: 'Unauthorized'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description:
      'Usuario no encontrado. El correo electrónico no está registrado en la base de datos.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Usuario no encontrado',
        error: 'Not Found'
      }
    }
  })
  @ApiResponse({
    status: 400,
    description:
      'Error en la solicitud. Generalmente ocurre por problemas inesperados.',
    schema: {
      example: {
        statusCode: 400,
        message: 'Error al procesar el usuario de Google.',
        error: 'Bad Request'
      }
    }
  })
  @Get('findByEmail/:email')
  async getUserByEmail(@Param('email') email: string, @Req() request: Request) {
    const googleUser = request['googleUser'];
    console.log(googleUser);

    const { user, accessToken } =
      await this.usersService.validateGoogleUserAndGenerateToken(
        email,
        googleUser
      );
    return { user, accessToken };
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
