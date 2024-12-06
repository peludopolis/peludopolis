import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsUUID()
    @IsNotEmpty()
    serviceId: string;
}