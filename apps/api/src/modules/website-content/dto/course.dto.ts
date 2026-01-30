import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'Advanced Web Development', description: 'The title of the course' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Programming', description: 'The category of the course' })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({ example: 'FaCode', description: 'The icon identifier for the course' })
  @IsNotEmpty()
  @IsString()
  icon: string;

  @ApiProperty({ example: ['HTML', 'CSS', 'JavaScript'], description: 'List of topics covered' })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  topics: string[];

  @ApiProperty({ example: '12 Weeks', description: 'Duration of the course' })
  @IsNotEmpty()
  @IsString()
  duration: string;

  @ApiProperty({ example: 'Beginner', description: 'Difficulty level of the course' })
  @IsNotEmpty()
  @IsString()
  level: string;

  @ApiProperty({ example: 1, description: 'Display order', required: false })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiProperty({ example: true, description: 'Whether the course is active', required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateCourseDto extends CreateCourseDto {}
