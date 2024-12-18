import { IsNotEmpty, IsString, IsNumber, IsArray, ValidateNested, IsEnum, IsOptional } from 'class-validator';
import { AnimalType, ServiceCategory, Stage } from '../entities/services-catalog.entity';

export class CreateServicesCatalogDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string; 

  @IsNotEmpty()
  @IsNumber()
  price: number; 

  @IsOptional()
  @IsString()
  employeeName: string; 

  @IsNotEmpty()
  @IsEnum(ServiceCategory)
  category: ServiceCategory;  
  
  @IsNotEmpty()
  @IsEnum(AnimalType)
  type: AnimalType;

  @IsNotEmpty()
  @IsEnum(Stage) 
  stage: Stage;
  
  @IsNotEmpty()
  @IsNumber()
  duration: number; 
}
