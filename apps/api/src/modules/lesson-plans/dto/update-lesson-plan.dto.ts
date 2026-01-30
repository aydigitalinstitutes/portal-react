import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLessonPlanDto {
  @ApiProperty({
    example: 'Introduction to React Hooks',
    description: 'Title of the lesson plan',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'Updated description...',
    description: 'Description of the lesson plan',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '# Updated Content...',
    description: 'Content of the lesson plan',
    required: false,
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({
    example: 'Advanced Web Development',
    description: 'Subject of the lesson plan',
    required: false,
  })
  @IsString()
  @IsOptional()
  subject?: string;

  @ApiProperty({
    example: 'Intermediate',
    description: 'Grade level or difficulty',
    required: false,
  })
  @IsString()
  @IsOptional()
  gradeLevel?: string;
}
