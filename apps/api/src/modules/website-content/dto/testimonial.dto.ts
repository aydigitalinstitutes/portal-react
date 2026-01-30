import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTestimonialDto {
  @ApiProperty({ example: 'This course was amazing!', description: 'The testimonial text' })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({ example: 'John Doe', description: 'The author of the testimonial' })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({ example: 5, description: 'Rating given (1-5)' })
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty({ example: 1, description: 'Display order', required: false })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiProperty({ example: true, description: 'Whether the testimonial is active', required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateTestimonialDto extends CreateTestimonialDto {}
