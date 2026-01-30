import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContentItemDto {
  @ApiProperty({
    example: 'hero_section',
    description: 'The section this item belongs to',
  })
  @IsNotEmpty()
  @IsString()
  section: string;

  @ApiProperty({
    example: 'title',
    description: 'A unique key for the item within the section',
    required: false,
  })
  @IsOptional()
  @IsString()
  key?: string;

  @ApiProperty({
    example: 'Welcome to our site',
    description: 'The title or main text',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'We offer great courses',
    description: 'The subtitle or description',
    required: false,
  })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiProperty({
    example: 'FaHome',
    description: 'Icon identifier',
    required: false,
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ example: '/home', description: 'Link URL', required: false })
  @IsOptional()
  @IsString()
  link?: string;

  @ApiProperty({ example: 1, description: 'Display order', required: false })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiProperty({
    example: true,
    description: 'Whether the item is active',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    example: { color: 'red' },
    description: 'Additional metadata',
    required: false,
  })
  @IsOptional()
  metadata?: any;
}

export class UpdateContentItemDto extends CreateContentItemDto {}
